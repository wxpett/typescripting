<script setup lang="ts">
import { Volume2, VolumeX, Terminal, Cpu } from 'lucide-vue-next';
import type { LanguageType, GameStatus } from '../types/game';

defineProps<{
  selectedLanguage: LanguageType | 'all';
  timerDuration: number;
  soundEnabled: boolean;
  status: GameStatus;
}>();

const emit = defineEmits<{
  (e: 'update:language', lang: LanguageType | 'all'): void;
  (e: 'update:duration', seconds: number): void;
  (e: 'toggle:sound'): void;
}>();

const languages: { label: string; value: LanguageType | 'all' }[] = [
  { label: 'ALL', value: 'all' },
  { label: 'Java', value: 'java' },
  { label: 'Python', value: 'python' },
  { label: 'SQL', value: 'sql' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Rust', value: 'rust' },
];

const durations = [15, 30, 60];
</script>

<template>
  <header class="w-full max-w-5xl mx-auto pt-8 pb-4 px-4 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-cyber-border/40">
    <!-- Brand / Title -->
    <div class="flex items-center gap-3">
      <div class="relative flex items-center justify-center w-10 h-10 rounded-lg bg-cyber-dark border border-neon-cyan/40 shadow-glow-cyan">
        <Terminal class="w-5 h-5 text-neon-cyan animate-pulse" />
      </div>
      <div>
        <div class="flex items-center gap-2">
          <h1 class="text-xl md:text-2xl font-bold tracking-wider text-white">
            <span class="text-neon-cyan glow-cyan-text">Type</span><span class="text-neon-green glow-green-text">Scripting</span>
          </h1>
          <span class="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan font-semibold">
            v1.0
          </span>
        </div>
        <p class="text-xs text-cyber-muted tracking-tight flex items-center gap-1.5 mt-0.5">
          <Cpu class="w-3 h-3 text-neon-green" />
          <span>CYBERPUNK NEURAL CODE TYPING</span>
        </p>
      </div>
    </div>

    <!-- Mode Configuration Bar -->
    <div class="flex flex-wrap items-center justify-center gap-3 bg-cyber-dark/80 backdrop-blur-md px-4 py-2 rounded-xl border border-cyber-border shadow-inner-cyber">
      <!-- Language Filter -->
      <div class="flex items-center gap-1 border-r border-cyber-border/60 pr-3">
        <button
          v-for="lang in languages"
          :key="lang.value"
          @click="emit('update:language', lang.value)"
          class="px-2.5 py-1 text-xs rounded transition-all font-medium"
          :class="[
            selectedLanguage === lang.value
              ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50 shadow-glow-cyan'
              : 'text-gray-400 hover:text-white hover:bg-cyber-card/60'
          ]"
        >
          {{ lang.label }}
        </button>
      </div>

      <!-- Duration Options -->
      <div class="flex items-center gap-1 border-r border-cyber-border/60 pr-3">
        <button
          v-for="d in durations"
          :key="d"
          @click="emit('update:duration', d)"
          class="px-2 py-1 text-xs rounded transition-all font-medium"
          :class="[
            timerDuration === d
              ? 'bg-neon-green/20 text-neon-green border border-neon-green/50 shadow-glow-green'
              : 'text-gray-400 hover:text-white hover:bg-cyber-card/60'
          ]"
        >
          {{ d }}s
        </button>
      </div>

      <!-- Sound Toggle -->
      <button
        @click="emit('toggle:sound')"
        :title="soundEnabled ? 'Silenciar Áudio' : 'Ativar Feedback Sonoro'"
        class="p-1.5 rounded transition-all text-xs flex items-center gap-1"
        :class="[
          soundEnabled
            ? 'text-neon-cyan hover:bg-neon-cyan/10'
            : 'text-gray-500 hover:text-gray-300'
        ]"
      >
        <Volume2 v-if="soundEnabled" class="w-4 h-4" />
        <VolumeX v-else class="w-4 h-4" />
      </button>
    </div>
  </header>
</template>
