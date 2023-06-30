<template>
  <div class="flex absolute right-1.5 bottom-0 space-x-1.5">
    <button class="--backtrace-button button transparent inline-flex items-center justify-center"
            @click="this.$emit('copyImage')">
      <fa-icon icon="image" class="mr-1"></fa-icon>
      <span class="text-gray-800 uppercase">png</span>
    </button>

    <button v-if="isTrunk === false"
            class="--backtrace-button button transparent inline-flex items-center justify-center"
            @click="this.$emit('saveToLocalStorage'); this.saved = true">
      <fa-icon icon="floppy-disk" class="mr-1"></fa-icon>
      <span class="text-gray-800 uppercase">{{ saved ? 'saved!' : 'save' }}</span>
    </button>

    <button class="--backtrace-button button transparent items-center justify-center"
            @click="this.$emit('toggleBacktrace')">
      <fa-icon icon="code" class="mr-1"></fa-icon>
      <span class="text-gray-800 uppercase">backtrace_<slot name="languageVersion"></slot></span>
    </button>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  props: {
    isTrunk: {
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
