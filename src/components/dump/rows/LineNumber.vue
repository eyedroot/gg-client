<template>
  <div class="flex flex-row items-center justify-center">
    <span class="flex rounded-full w-1.5 h-1.5" :class="circleColor"></span>
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
  },
  data() {
    return {
      circleColor: 'bg-blue-500',
    }
  },
  computed: {
    getLineNumber() {
      return this.line + 1
    },
  },
  mounted() {
    setTimeout(() => {
      this.circleColor = 'bg-gray-200'
    }, 1000 * 60)
  }
}
</script>
