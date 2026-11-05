<script setup lang="ts">
import { onMounted } from 'vue';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, ArrowRight, Zap, CheckCircle2 } from 'lucide-vue-next';
import type { TypingStats } from '../types/game';

const props = defineProps<{
  stats: TypingStats;
  language: string;
}>();

const emit = defineEmits<{
  (e: 'restart', newSnippet: boolean): void;
}>();

onMounted(() => {
  if (props.stats.wpm > 30 || props.stats.accuracy > 85) {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f0ff', '#00ff88', '#38bdf8', '#ff3366'],
    });
  }
});
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
    <!-- Modal Card -->
    <div class="relative w-full max-w-xl p-8 rounded-2xl bg-cyber-dark border border-neon-cyan/50 shadow-glow-cyan text-center font-mono overflow-hidden">
      <!-- Decorative background grid -->
      <div class="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-neon-cyan/10 blur-3xl pointer-events-none"></div>
      <div class="absolute -left-16 -bottom-16 w-48 h-48 rounded-full bg-neon-green/10 blur-3xl pointer-events-none"></div>

      <!-- Icon & Status -->
      <div class="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-cyber-card border border-neon-green/50 shadow-glow-green">
        <Trophy class="w-8 h-8 text-neon-green animate-bounce" />
      </div>

      <h2 class="text-2xl font-bold tracking-wider text-white">
        EXECUÇÃO <span class="text-neon-cyan glow-cyan-text">CONCLUÍDA</span>
      </h2>
      <p class="text-xs text-cyber-muted mt-1 uppercase tracking-widest">
        Telemetria de Digitação // Protocolo {{ language }}
      </p>

      <!-- Big Highlight Stats -->
      <div class="grid grid-cols-2 gap-4 my-6">
        <div class="p-4 rounded-xl bg-cyber-card/60 border border-cyber-border/70 flex flex-col items-center">
          <span class="text-xs text-cyber-muted uppercase tracking-wider flex items-center gap-1.5 mb-1">
            <Zap class="w-3.5 h-3.5 text-neon-green" /> Velocidade Real (WPM)
          </span>
          <span class="text-4xl font-extrabold text-neon-green glow-green-text">
            {{ stats.wpm }}
          </span>
          <span class="text-[11px] text-gray-400 mt-1">Palavras / Minuto</span>
        </div>

        <div class="p-4 rounded-xl bg-cyber-card/60 border border-cyber-border/70 flex flex-col items-center">
          <span class="text-xs text-cyber-muted uppercase tracking-wider flex items-center gap-1.5 mb-1">
            <CheckCircle2 class="w-3.5 h-3.5 text-neon-cyan" /> Precisão do Código
          </span>
          <span class="text-4xl font-extrabold text-neon-cyan glow-cyan-text">
            {{ stats.accuracy }}%
          </span>
          <span class="text-[11px] text-gray-400 mt-1">
            {{ stats.errors === 0 ? 'Sem nenhum erro!' : `${stats.errors} falhas computadas` }}
          </span>
        </div>
      </div>

      <!-- Secondary Telemetry Details -->
      <div class="grid grid-cols-3 gap-3 p-3 rounded-xl bg-cyber-black/70 border border-cyber-border/40 text-xs text-gray-300 mb-6">
        <div class="flex flex-col items-center">
          <span class="text-[10px] text-cyber-muted uppercase">WPM Bruto</span>
          <span class="font-bold text-white text-sm">{{ stats.rawWpm }}</span>
        </div>
        <div class="flex flex-col items-center border-x border-cyber-border/40">
          <span class="text-[10px] text-cyber-muted uppercase">Caracteres</span>
          <span class="font-bold text-white text-sm">{{ stats.correctChars }} / {{ stats.totalTyped }}</span>
        </div>
        <div class="flex flex-col items-center">
          <span class="text-[10px] text-cyber-muted uppercase">Tempo Decorrido</span>
          <span class="font-bold text-white text-sm">{{ stats.elapsedTime }}s</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center justify-center gap-4">
        <button
          @click="emit('restart', false)"
          class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyber-card hover:bg-cyber-card/80 border border-cyber-border text-gray-200 text-xs font-semibold transition-all hover:scale-105"
        >
          <RotateCcw class="w-4 h-4" />
          <span>Repetir Snippet</span>
        </button>

        <button
          @click="emit('restart', true)"
          class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-neon-cyan/20 hover:bg-neon-cyan/30 border border-neon-cyan text-neon-cyan shadow-glow-cyan text-xs font-bold transition-all hover:scale-105"
        >
          <span>Próximo Código</span>
          <ArrowRight class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>
