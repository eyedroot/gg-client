<script setup>
import { defineProps, ref } from 'vue';
import { ipcRenderer } from 'electron';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
});

const isChecked = ref(false);

const callAlwaysOnTop = () => {
  ipcRenderer.invoke('handleAlwaysOnTop', isChecked.value);
  isChecked.value = !isChecked.value;
};
</script>

<template>
  <label
    class="flex items-center justify-center rounded-full text-xs tracking-tighter bg-gray-300 cursor-pointer transition-colors duration-200 px-1.5 font-semibold text-gray-400 border-2 border-gray-400"
    :class="{
      'bg-gray-400 text-gray-800 border-gray-800': isChecked,
    }"
    @click.prevent="callAlwaysOnTop"
  >
    {{ props.label }}
    <input type="checkbox" class="hidden" v-model="isChecked" />
  </label>
</template>

<style scoped lang="scss"></style>
