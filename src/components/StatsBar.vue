<script setup lang="ts">
import { Clock, Gauge, Target, AlertTriangle } from 'lucide-vue-next';
import type { TypingStats, GameStatus } from '../types/game';

defineProps<{
  stats: TypingStats;
  timeLeft: number;
  timerDuration: number;
  status: GameStatus;
  language: string;
  progressPercent: number;
}>();
</script>

<template>
  <div class="w-full max-w-5xl mx-auto my-6 px-4">
    <!-- Live telemetry HUD -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-cyber-dark/60 backdrop-blur-md p-4 rounded-xl border border-cyber-border shadow-inner-cyber">
      <!-- Time Countdown -->
      <div class="flex items-center gap-3 p-2 rounded-lg bg-cyber-card/40 border border-cyber-border/40">
        <div class="p-2 rounded bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan">
          <Clock class="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <span class="text-[10px] uppercase font-bold tracking-wider text-cyber-muted">Tempo</span>
          <div class="text-2xl font-bold font-mono tracking-tight" :class="[timeLeft <= 5 ? 'text-neon-red glow-red-text animate-pulse-fast' : 'text-neon-cyan glow-cyan-text']">
            {{ timeLeft }}<span class="text-xs ml-0.5 opacity-60">s</span>
          </div>
        </div>
      </div>

      <!-- WPM -->
      <div class="flex items-center gap-3 p-2 rounded-lg bg-cyber-card/40 border border-cyber-border/40">
        <div class="p-2 rounded bg-neon-green/10 border border-neon-green/30 text-neon-green">
          <Gauge class="w-5 h-5" />
        </div>
        <div>
          <span class="text-[10px] uppercase font-bold tracking-wider text-cyber-muted">WPM (Velocidade)</span>
          <div class="text-2xl font-bold font-mono tracking-tight text-neon-green glow-green-text">
            {{ stats.wpm }}
          </div>
        </div>
      </div>

      <!-- Accuracy % -->
      <div class="flex items-center gap-3 p-2 rounded-lg bg-cyber-card/40 border border-cyber-border/40">
        <div class="p-2 rounded bg-jarvis-blue/10 border border-jarvis-blue/30 text-neon-cyan">
          <Target class="w-5 h-5" />
        </div>
        <div>
          <span class="text-[10px] uppercase font-bold tracking-wider text-cyber-muted">Precisão</span>
          <div class="text-2xl font-bold font-mono tracking-tight text-white">
            {{ stats.accuracy }}<span class="text-xs ml-0.5 text-cyber-muted">%</span>
          </div>
        </div>
      </div>

      <!-- Errors -->
      <div class="flex items-center gap-3 p-2 rounded-lg bg-cyber-card/40 border border-cyber-border/40">
        <div class="p-2 rounded bg-neon-red/10 border border-neon-red/30 text-neon-red">
          <AlertTriangle class="w-5 h-5" />
        </div>
        <div>
          <span class="text-[10px] uppercase font-bold tracking-wider text-cyber-muted">Falhas</span>
          <div class="text-2xl font-bold font-mono tracking-tight" :class="[stats.errors > 0 ? 'text-neon-red' : 'text-gray-400']">
            {{ stats.errors }}
          </div>
        </div>
      </div>
    </div>

    <!-- Live progress track -->
    <div class="w-full bg-cyber-dark/80 h-1.5 rounded-full mt-3 overflow-hidden border border-cyber-border/50">
      <div
        class="h-full bg-gradient-to-r from-neon-cyan via-jarvis-blue to-neon-green transition-all duration-150 ease-out shadow-glow-cyan"
        :style="{ width: `${progressPercent}%` }"
      ></div>
    </div>
  </div>
</template>
