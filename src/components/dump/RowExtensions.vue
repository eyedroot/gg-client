<template>
  <div class="flex flex-row space-x-2.5 justify-start items-center">
    <div class="flex items-center space-x-1.5">
      <span v-if="props.isLocalData === false"
        class="rounded-full bg-pink-600 w-2 h-2 animate-pulse transition-opacity"
        :class="{ 'invisible': noticeCircle === false }">
      </span>

      <span class="text-gray-500 tracking-tight dark:text-gray-300">{{ currentDateTime }}</span>
    </div>

    <span class="text-gray-500 text-[90%] dark:text-gray-300">
      <slot name="languageVersion"></slot>
    </span>

    <button
        v-if="false" class="--backtrace-button button transparent inline-flex items-center justify-center"
        @click="this.$emit('copyImage')">
      <fa-icon icon="image" class="mr-1"></fa-icon>
      <span class="text-gray-500 dark:text-gray-300">png</span>
    </button>

    <button
        v-if="props.isLocalData === false"
        class="--backtrace-button button transparent inline-flex items-center justify-center"
        @click="this.$emit('saveToLocalStorage'); saved = true">
      <fa-icon icon="floppy-disk" class="mr-1"></fa-icon>
      <span class="text-gray-500 dark:text-gray-300">{{ saved ? 'saved!' : 'save' }}</span>
    </button>

    <button
        class="--backtrace-button button transparent items-center justify-center"
        @click="this.$emit('toggleBacktrace')">
      <fa-icon icon="code" class="mr-1"></fa-icon>
      <span class="text-gray-500 dark:text-gray-300">backtrace</span>
    </button>
  </div>
</template>

<script setup>
import {computed, onMounted, onUnmounted, ref} from "vue"

const props = defineProps({
  isLocalData: {
    type: Boolean,
    required: true,
  },
})

const saved = ref(false)

const noticeCircle = ref(true)
let timerId = undefined

const currentDateTime = computed(() => {
  const date = new Date()

  const hour = ('0' + (date.getHours())).slice(-2)
  const minute = ('0' + (date.getMinutes())).slice(-2)
  const second = ('0' + (date.getSeconds())).slice(-2)

  return `${hour}:${minute}:${second}`
})

onMounted(() => {
  timerId = setTimeout(() => noticeCircle.value = false, 1000 * 15)
})

onUnmounted(() => {
  if (timerId !== undefined) {
    clearTimeout(timerId)
  }
})
</script>
