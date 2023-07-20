<template>
  <div class="flex flex-row space-x-2.5 justify-start items-center">
    <div class="flex items-center space-x-1">
      <span class="rounded-full bg-blue-600 w-2 h-2 fade-out"></span>
      <span class="text-gray-500 tracking-tight">{{ currentDateTime }}</span>
    </div>

    <span class="text-gray-500 text-[80%]">
      <slot name="languageVersion"></slot>
    </span>

    <button v-if="false" class="--backtrace-button button transparent inline-flex items-center justify-center"
            @click="this.$emit('copyImage')">
      <fa-icon icon="image" class="mr-1"></fa-icon>
      <span class="text-gray-500">png</span>
    </button>

    <button v-if="props.isLocalData === false"
            class="--backtrace-button button transparent inline-flex items-center justify-center"
            @click="this.$emit('saveToLocalStorage'); this.saved = true">
      <fa-icon icon="floppy-disk" class="mr-1"></fa-icon>
      <span class="text-gray-500">{{ saved ? 'saved!' : 'save' }}</span>
    </button>

    <button class="--backtrace-button button transparent items-center justify-center"
            @click="this.$emit('toggleBacktrace')">
      <fa-icon icon="code" class="mr-1"></fa-icon>
      <span class="text-gray-500">backtrace</span>
    </button>
  </div>
</template>

<script setup>
import {computed, ref} from "vue"

const props = defineProps({
  isLocalData: {
    type: Boolean,
    required: true,
  },
})

const saved = ref(false)

const currentDateTime = computed(() => {
  const date = new Date()

  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + (date.getDate())).slice(-2)

  const hour = ('0' + (date.getHours())).slice(-2)
  const minute = ('0' + (date.getMinutes())).slice(-2)
  const second = ('0' + (date.getSeconds())).slice(-2)

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
})
</script>

<style lang="scss">
@keyframes fadeOut {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.fade-out {
  animation: fadeOut 30s forwards;
}
</style>
