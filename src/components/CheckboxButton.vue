<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <label
    class="flex items-center justify-center rounded-full text-xs tracking-tighter bg-gray-300 cursor-pointer transition-colors duration-200 px-1.5 font-semibold text-gray-400 border-2 border-gray-500"
  >
    {{ props.label }}
    <input type="checkbox" class="hidden" />
  </label>
</template>

<style scoped lang="scss"></style>
