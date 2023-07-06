<template>
  <div class="flex justify-start items-center">
    <span class="text-gray-500 text-[80%] mr-3">
      <slot name="languageVersion"></slot>
    </span>

    <button v-if="false" class="--backtrace-button button transparent inline-flex items-center justify-center"
            @click="this.$emit('copyImage')">
      <fa-icon icon="image" class="mr-1"></fa-icon>
      <span class="text-gray-500">png</span>
    </button>

    <button v-if="isLocalData === false"
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

<script>
import {ref} from "vue";

export default {
  props: {
    isLocalData: {
      type: Boolean,
      required: true
    },
  },
  setup() {
    const saved = ref(false)

    return {
      saved
    }
  }
}
</script>
