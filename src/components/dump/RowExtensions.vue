<template>
  <div class="flex flex-row space-x-2.5 justify-start items-center">
    <div class="flex items-center space-x-1.5">
      <span v-if="props.isLocalData === false"
        class="rounded-full w-2 h-2 transition-opacity"
        :class="{
          'bg-gray-200 dark:bg-gray-900': noticeCircle === false,
          'bg-purple-600 animate-pulse': noticeCircle === true,
        }">
      </span>

      <span class="text-gray-500 tracking-tight dark:text-gray-300">{{ currentDateTime }}</span>
    </div>

    <span class="text-gray-500 text-[90%] dark:text-gray-300">
      <slot name="languageVersion"></slot>
    </span>

    <button
        v-if="false" class="--backtrace --button --transparent"
        @click="emit('copyImage')">
      <fa-icon icon="image" class="mr-1"></fa-icon>
      <span class="text-gray-500 dark:text-gray-300">png</span>
    </button>

    <button
        v-if="props.isLocalData === false"
        class="--backtrace --button --transparent"
        @click="emit('saveToLocalStorage'); saved = true">
      <fa-icon icon="floppy-disk" class="mr-1"></fa-icon>
      <span class="text-gray-500 dark:text-gray-300">{{ saved ? 'saved!' : 'save' }}</span>
    </button>

    <button
        class="--backtrace --button --transparent"
        @click="emit('toggleBacktrace')">
      <fa-icon icon="code" class="mr-1"></fa-icon>
      <span class="text-gray-500 dark:text-gray-300">backtrace</span>
    </button>

    <button
      class="--backtrace --button --transparent"
      @click="emit('copyJson')">
      <fa-icon icon="copy" class="mr-1"></fa-icon>
      <span class="text-gray-500 dark:text-gray-300">Copy Json</span>
    </button>

    <button
      class="--backtrace --button --transparent"
      @click="emit('copyAssocArray')">
      <fa-icon icon="copy" class="mr-1"></fa-icon>
      <span class="text-gray-500 dark:text-gray-300">Copy Assoc</span>
    </button>
  </div>
</template>

<script setup>
import {computed, onMounted, onUnmounted, ref} from "vue"

const emit = defineEmits(['toggleBacktrace', 'saveToLocalStorage', 'copyImage', 'copyJson', 'copyAssocArray'])

const props = defineProps({
  isLocalData: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    required: false,
  }
})

const saved = ref(false)

const noticeCircle = ref(true)
let timerId = undefined

const currentDateTime = computed(() => {
  const date = props.createdAt ? new Date(props.createdAt) : new Date()

  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + (date.getDate())).slice(-2)

  const hour = ('0' + (date.getHours())).slice(-2)
  const minute = ('0' + (date.getMinutes())).slice(-2)
  const second = ('0' + (date.getSeconds())).slice(-2)

  return (! props.isLocalData) ? `${hour}:${minute}:${second}` : `${year}-${month}-${day} ${hour}:${minute}:${second}`
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
