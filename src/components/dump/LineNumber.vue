<template>
  <div class="flex flex-row items-center">
    <span class="flex-1 rounded-full bg-blue-500 w-1.5 h-1.5 mr-1.5"></span>
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
    }
  },
  computed: {
    getLineNumber() {
      return this.line + 1
    }
  }
}
</script>
