<template>
  <div class="flex absolute right-1.5 bottom-0 space-x-1.5">
    <button v-if="loadFromLocalStorage === false"
            class="--backtrace-button button transparent inline-flex items-center justify-center"
            @click="this.$emit('saveToLocalStorage'); this.saved = true">
      <fa-icon icon="floppy-disk" class="mr-1.5"></fa-icon>
      <span class="text-gray-800">{{ saved ? 'saved!' : 'save' }}</span>
    </button>

    <button class="--backtrace-button button transparent items-center justify-center"
            @click="this.$emit('toggleBacktrace')">
      <fa-icon icon="code" class="mr-1.5"></fa-icon>
      <span class="text-gray-800">backtrace_<slot name="languageVersion"></slot></span>
    </button>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  props: {
    loadFromLocalStorage: {
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
