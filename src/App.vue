<script setup lang="ts">
import { useTypingGame } from './composables/useTypingGame';
import CyberHeader from './components/CyberHeader.vue';
import StatsBar from './components/StatsBar.vue';
import CodeDisplay from './components/CodeDisplay.vue';
import StatsModal from './components/StatsModal.vue';
import CyberFooter from './components/CyberFooter.vue';

const {
  status,
  selectedLanguage,
  timerDuration,
  timeLeft,
  currentSnippet,
  soundEnabled,
  characters,
  stats,
  progressPercent,
  resetGame,
  changeDuration,
  setLanguage,
} = useTypingGame();

const toggleSound = () => {
  soundEnabled.value = !soundEnabled.value;
};
</script>

<template>
  <div class="min-h-screen flex flex-col justify-between scanlines relative selection:bg-neon-cyan/20 selection:text-neon-cyan">
    <!-- Cyberpunk ambient glow particles -->
    <div class="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-neon-cyan/5 via-neon-green/5 to-transparent blur-3xl pointer-events-none -z-10"></div>

    <!-- Header Navigation -->
    <CyberHeader
      :selected-language="selectedLanguage"
      :timer-duration="timerDuration"
      :sound-enabled="soundEnabled"
      :status="status"
      @update:language="setLanguage"
      @update:duration="changeDuration"
      @toggle:sound="toggleSound"
    />

    <!-- Main Content Area -->
    <main class="flex-1 flex flex-col items-center justify-center w-full py-4">
      <!-- Real-time HUD -->
      <StatsBar
        :stats="stats"
        :time-left="timeLeft"
        :timer-duration="timerDuration"
        :status="status"
        :language="currentSnippet.language"
        :progress-percent="progressPercent"
      />

      <!-- Interactive Typing Terminal -->
      <CodeDisplay
        :snippet="currentSnippet"
        :characters="characters"
        :status="status"
        @restart="resetGame(true)"
      />

      <!-- Post-game Evaluation Modal -->
      <StatsModal
        v-if="status === 'finished'"
        :stats="stats"
        :language="currentSnippet.language.toUpperCase()"
        @restart="resetGame"
      />
    </main>

    <!-- Footer -->
    <CyberFooter />
  </div>
</template>
