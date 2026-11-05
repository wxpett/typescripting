<script setup lang="ts">
import { Code2, Terminal, RefreshCw } from 'lucide-vue-next';
import type { Snippet } from '../types/game';

defineProps<{
  snippet: Snippet;
  characters: Array<{
    char: string;
    isTyped: boolean;
    isCurrent: boolean;
    isCorrect: boolean;
    isIncorrect: boolean;
    isWhitespace: boolean;
    isNewline: boolean;
  }>;
  status: 'idle' | 'running' | 'finished';
}>();

const emit = defineEmits<{
  (e: 'restart'): void;
}>();
</script>

<template>
  <div class="w-full max-w-5xl mx-auto px-4 my-2">
    <!-- Code Terminal Frame -->
    <div class="relative rounded-2xl bg-cyber-black/90 border border-cyber-border shadow-2xl backdrop-blur-xl overflow-hidden group">
      <!-- Terminal Header / Titlebar -->
      <div class="flex items-center justify-between px-5 py-3 border-b border-cyber-border/70 bg-cyber-dark/90 select-none">
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-1.5">
            <span class="w-3 h-3 rounded-full bg-neon-red/70 border border-neon-red shadow-glow-red inline-block"></span>
            <span class="w-3 h-3 rounded-full bg-neon-amber/70 border border-neon-amber inline-block"></span>
            <span class="w-3 h-3 rounded-full bg-neon-green/70 border border-neon-green shadow-glow-green inline-block"></span>
          </div>
          <div class="h-4 w-[1px] bg-cyber-border mx-1"></div>
          <div class="flex items-center gap-2 text-xs font-mono">
            <Code2 class="w-3.5 h-3.5 text-neon-cyan" />
            <span class="font-bold text-gray-200 tracking-wide">{{ snippet.title }}</span>
            <span class="text-cyber-muted text-[11px]">({{ snippet.description }})</span>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <span class="px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded bg-neon-cyan/10 border border-neon-cyan/40 text-neon-cyan">
            {{ snippet.language }}
          </span>
          <button
            @click="emit('restart')"
            title="Reiniciar Snippet (Tab)"
            class="p-1 rounded text-gray-400 hover:text-neon-cyan hover:bg-cyber-card transition-all"
          >
            <RefreshCw class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Main Code Typing Area -->
      <div class="relative p-6 sm:p-8 min-h-[220px] font-mono text-base sm:text-lg lg:text-xl leading-relaxed tracking-normal select-none overflow-x-auto">
        <div class="whitespace-pre flex flex-wrap items-baseline">
          <template v-for="(item, index) in characters" :key="index">
            <!-- Custom Caret Cursor for Current Character -->
            <span
              v-if="item.isCurrent"
              class="inline-block w-[3px] h-[1.3em] bg-neon-cyan shadow-glow-cyan animate-caret-blink -mr-[3px] z-20 align-text-bottom rounded-full"
            ></span>

            <!-- Newline representation -->
            <template v-if="item.isNewline">
              <span
                class="inline-block text-xs font-sans px-1 select-none"
                :class="[
                  item.isCorrect ? 'text-neon-green/60' : item.isIncorrect ? 'text-neon-red glow-red-text' : 'text-cyber-muted/30'
                ]"
              >↵</span>
              <!-- Force genuine line break in wrapped container -->
              <span class="basis-full h-0"></span>
            </template>

            <!-- Regular character or whitespace -->
            <span
              v-else
              class="relative transition-colors duration-75 inline-block"
              :class="[
                item.isCorrect
                  ? 'text-neon-green glow-green-text font-semibold'
                  : item.isIncorrect
                  ? 'text-neon-red glow-red-text bg-neon-red/20 rounded px-0.5'
                  : 'text-cyber-muted/80'
              ]"
            >
              <!-- Space indicator if mistyped -->
              <template v-if="item.isWhitespace && item.isIncorrect">
                <span class="border-b-2 border-neon-red px-1">&middot;</span>
              </template>
              <template v-else>
                {{ item.char }}
              </template>
            </span>
          </template>
        </div>

        <!-- Floating Hint when Idle -->
        <div
          v-if="status === 'idle'"
          class="pointer-events-none absolute inset-0 flex items-center justify-center bg-cyber-black/40 backdrop-blur-[1px] transition-opacity"
        >
          <div class="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-cyber-dark/90 border border-neon-cyan/40 shadow-glow-cyan text-xs text-neon-cyan font-mono animate-pulse">
            <Terminal class="w-4 h-4 text-neon-cyan" />
            <span>PRESSIONE QUALQUER TECLA PARA INICIAR A SESSÃO // TAB PARA NOVO CÓDIGO</span>
          </div>
        </div>
      </div>

      <!-- Status Footer Bar inside Terminal -->
      <div class="flex items-center justify-between px-5 py-2.5 bg-cyber-dark/40 border-t border-cyber-border/40 text-[11px] text-cyber-muted">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full" :class="status === 'running' ? 'bg-neon-green animate-ping' : 'bg-neon-cyan'"></span>
          <span>ESTADO: {{ status === 'running' ? 'COMPILANDO DIGITAÇÃO' : status === 'finished' ? 'FINALIZADO' : 'AGUARDANDO INPUT' }}</span>
        </div>
        <div class="hidden sm:flex items-center gap-4">
          <span>ATALHO: <kbd class="px-1.5 py-0.5 rounded bg-cyber-card border border-cyber-border text-gray-300">Tab</kbd> NOVO SNIPPET</span>
          <span><kbd class="px-1.5 py-0.5 rounded bg-cyber-card border border-cyber-border text-gray-300">Esc</kbd> REINICIAR</span>
        </div>
      </div>
    </div>
  </div>
</template>
