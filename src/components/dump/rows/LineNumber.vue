<template>
  <div class="flex flex-row items-center">
    <span class="flex-1 rounded-full w-1.5 h-1.5 mr-1.5" :class="getCircleColor"></span>
    <span class="flex-1 italic text-gray-500">{{ getLineNumber }}</span>
  </div>
</template>

<script>
export default {
  name: 'LineNumber',
  props: {
    line: {
      type: Number,
      default: 0,
      required: true
    },
    now: {
      type: Date,
      default: () => new Date(),
      required: false
    }
  },
  computed: {
    getLineNumber() {
      return this.line + 1
    },
    getCircleColor() {
      const FIVE_MINUTES = 5 * 60 * 1000
      const diff = new Date() - this.now

      return diff < FIVE_MINUTES ? 'bg-blue-500' : 'bg-white'
    }
  }
}
</script>
