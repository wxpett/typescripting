<script setup lang="ts">
import { Keyboard, Sparkles } from 'lucide-vue-next';
</script>

<template>
  <footer class="w-full max-w-5xl mx-auto mt-auto py-8 px-4 border-t border-cyber-border/40 text-xs text-cyber-muted font-mono flex flex-col sm:flex-row items-center justify-between gap-4">
    <div class="flex items-center gap-2">
      <Keyboard class="w-4 h-4 text-neon-cyan" />
      <span>TypeScripting &bull; Engine de Digitação Rápida para Desenvolvedores</span>
    </div>

    <div class="flex items-center gap-4 text-[11px]">
      <span class="flex items-center gap-1.5">
        <Sparkles class="w-3.5 h-3.5 text-neon-green" />
        <span>VUE 3 + VITE + TAILWIND</span>
      </span>
      <span class="text-cyber-border">&bull;</span>
      <span class="text-neon-cyan/80">THEME: JARVIS / CYBERPUNK</span>
    </div>
  </footer>
</template>
