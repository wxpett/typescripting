import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { CODE_SNIPPETS } from '../data/snippets';
import type { Snippet, LanguageType, GameStatus, TypingStats } from '../types/game';

export function useTypingGame() {
  // State
  const selectedLanguage = ref<LanguageType | 'all'>('all');
  const timerDuration = ref<number>(30); // in seconds
  const timeLeft = ref<number>(30);
  const status = ref<GameStatus>('idle');
  
  const currentSnippetIndex = ref<number>(0);
  const typedHistory = ref<string>('');
  const totalKeystrokes = ref<number>(0);
  const correctKeystrokes = ref<number>(0);
  const errorCount = ref<number>(0);
  const soundEnabled = ref<boolean>(true);

  let timerInterval: number | null = null;
  let startTime = ref<number | null>(null);
  let audioCtx: AudioContext | null = null;

  // Sound generator using Web Audio API (Cyberpunk tactile mechanical & error clicks)
  const initAudio = () => {
    if (!audioCtx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
  };

  const playClickSound = (isCorrect: boolean) => {
    if (!soundEnabled.value) return;
    try {
      initAudio();
      if (!audioCtx || audioCtx.state === 'suspended') {
        audioCtx?.resume();
      }
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      const now = audioCtx.currentTime;

      if (isCorrect) {
        // High-tech crisp mechanical blip
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(1760, now + 0.04);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      } else {
        // Low distorted buzz for mistake
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(70, now + 0.09);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
        osc.start(now);
        osc.stop(now + 0.09);
      }
    } catch {
      // Audio might be blocked until user gesture, safely ignore
    }
  };

  // Filtered snippets
  const availableSnippets = computed(() => {
    if (selectedLanguage.value === 'all') {
      return CODE_SNIPPETS;
    }
    return CODE_SNIPPETS.filter(s => s.language === selectedLanguage.value);
  });

  const currentSnippet = computed<Snippet>(() => {
    const list = availableSnippets.value;
    if (list.length === 0) return CODE_SNIPPETS[0];
    return list[currentSnippetIndex.value % list.length];
  });

  const targetCode = computed(() => currentSnippet.value.code);

  // Characters inspection
  const characters = computed(() => {
    const code = targetCode.value;
    const typed = typedHistory.value;
    
    return code.split('').map((char, index) => {
      const isTyped = index < typed.length;
      const isCurrent = index === typed.length;
      const typedChar = typed[index];
      const isCorrect = isTyped && typedChar === char;
      const isIncorrect = isTyped && typedChar !== char;

      return {
        char,
        isTyped,
        isCurrent,
        isCorrect,
        isIncorrect,
        isWhitespace: char === ' ',
        isNewline: char === '\n',
      };
    });
  });

  // Calculate live statistics
  const stats = computed<TypingStats>(() => {
    const elapsedSeconds = timerDuration.value - timeLeft.value;
    const elapsedMinutes = Math.max(elapsedSeconds / 60, 0.0166); // avoid zero div (min 1 sec)

    // Standard formula: 5 characters count as 1 word
    const netWords = correctKeystrokes.value / 5;
    const grossWords = totalKeystrokes.value / 5;

    const wpm = Math.max(0, Math.round(netWords / elapsedMinutes));
    const rawWpm = Math.max(0, Math.round(grossWords / elapsedMinutes));

    const accuracy = totalKeystrokes.value > 0
      ? Math.max(0, Math.min(100, Math.round((correctKeystrokes.value / totalKeystrokes.value) * 100)))
      : 100;

    return {
      wpm,
      rawWpm,
      accuracy,
      errors: errorCount.value,
      correctChars: correctKeystrokes.value,
      totalTyped: totalKeystrokes.value,
      elapsedTime: elapsedSeconds,
    };
  });

  // Progression %
  const progressPercent = computed(() => {
    if (!targetCode.value.length) return 0;
    return Math.min(100, Math.round((typedHistory.value.length / targetCode.value.length) * 100));
  });

  // Timer controls
  const startTimer = () => {
    if (timerInterval) clearInterval(timerInterval);
    startTime.value = Date.now();
    status.value = 'running';

    timerInterval = window.setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value -= 1;
      } else {
        finishGame();
      }
    }, 1000);
  };

  const finishGame = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    status.value = 'finished';
  };

  const resetGame = (newSnippet = false) => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }

    if (newSnippet) {
      const count = availableSnippets.value.length;
      if (count > 1) {
        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * count);
        } while (nextIndex === currentSnippetIndex.value && count > 1);
        currentSnippetIndex.value = nextIndex;
      }
    }

    typedHistory.value = '';
    totalKeystrokes.value = 0;
    correctKeystrokes.value = 0;
    errorCount.value = 0;
    timeLeft.value = timerDuration.value;
    status.value = 'idle';
  };

  const changeDuration = (seconds: number) => {
    timerDuration.value = seconds;
    resetGame(false);
  };

  const setLanguage = (lang: LanguageType | 'all') => {
    selectedLanguage.value = lang;
    currentSnippetIndex.value = 0;
    resetGame(false);
  };

  // Keyboard handler
  const handleKeydown = (e: KeyboardEvent) => {
    // Restart shortcut: Tab + Enter or Alt + r
    if (e.key === 'Tab') {
      e.preventDefault();
      resetGame(true);
      return;
    }

    // Escape to reset/pause
    if (e.key === 'Escape') {
      e.preventDefault();
      resetGame(false);
      return;
    }

    // Ignore if game is finished
    if (status.value === 'finished') return;

    // Ignore special functional keys
    if (
      e.ctrlKey || 
      e.altKey || 
      e.metaKey || 
      ['Shift', 'CapsLock', 'Control', 'Alt', 'Meta', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)
    ) {
      return;
    }

    // Initialize audio context on first user keydown gesture
    initAudio();

    // Start timer on first valid keypress
    if (status.value === 'idle') {
      startTimer();
    }

    const currentIndex = typedHistory.value.length;
    const expectedChar = targetCode.value[currentIndex];

    // Handle Backspace
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (typedHistory.value.length > 0) {
        // Rollback one character
        typedHistory.value = typedHistory.value.slice(0, -1);
      }
      return;
    }

    // Prevent default scrolling for Space & default newline jumps
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
    }

    // Determine incoming character
    let typedChar = e.key;
    if (typedChar === 'Enter') {
      typedChar = '\n';
    }

    // If we've reached the end of the snippet
    if (currentIndex >= targetCode.value.length) {
      finishGame();
      return;
    }

    totalKeystrokes.value++;

    // Comparison
    if (typedChar === expectedChar) {
      correctKeystrokes.value++;
      typedHistory.value += typedChar;
      playClickSound(true);

      // Auto-indentation assistance: If the next characters are spaces due to indentation on a new line,
      // we can comfortably advance through matching indentation spaces if user just pressed Enter
      if (typedChar === '\n') {
        let lookahead = typedHistory.value.length;
        let autoSpaces = '';
        while (targetCode.value[lookahead] === ' ') {
          autoSpaces += ' ';
          lookahead++;
        }
        if (autoSpaces.length > 0) {
          typedHistory.value += autoSpaces;
          correctKeystrokes.value += autoSpaces.length;
          totalKeystrokes.value += autoSpaces.length;
        }
      }

      // Check if finished
      if (typedHistory.value.length >= targetCode.value.length) {
        finishGame();
      }
    } else {
      // Wrong character typed!
      errorCount.value++;
      playClickSound(false);
      
      // Interrupt advancement subtly: Record the wrong character to show visual red feedback
      // Monkeytype allows typing up to a limit or highlighting the wrong character in red
      typedHistory.value += typedChar;
    }
  };

  // Mount native keyboard listeners globally
  onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
    if (timerInterval) clearInterval(timerInterval);
    if (audioCtx) {
      audioCtx.close();
    }
  });

  // Watch duration change
  watch(timerDuration, () => {
    resetGame(false);
  });

  return {
    // State
    status,
    selectedLanguage,
    timerDuration,
    timeLeft,
    currentSnippet,
    typedHistory,
    soundEnabled,
    progressPercent,
    
    // Computed
    characters,
    stats,
    
    // Actions
    startTimer,
    finishGame,
    resetGame,
    changeDuration,
    setLanguage,
  };
}
