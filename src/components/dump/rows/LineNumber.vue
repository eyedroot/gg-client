<template>
  <div class="flex w-full flex-row items-center justify-center">
    <span class="flex rounded-full w-1.5 h-1.5 mr-1.5" :class="circleColor"></span>
    <span class="flex text-gray-500">{{ getLineNumber }}</span>
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
      this.circleColor = 'bg-white'
    }, 1000 * 60)
  }
}
</script>
