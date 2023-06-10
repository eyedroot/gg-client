<template>
  <div class="flex flex-row items-center">
    <span class="flex-1 rounded-full w-1.5 h-1.5 mr-1.5" :class="circleColor"></span>
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
