<template>
  <div class="flex flex-row space-x-1.5 items-center">
    <fa-icon icon="file-lines" class="text-gray-300" title="backtrace"></fa-icon>
    <span class="tracking-tight text-gray-600 underline">{{ getCalledFile }}</span>
  </div>
</template>

<script>
export default {
  name: 'BackTrace',
  props: {
    backtrace: {
      type: Object,
      required: true
    }
  },
  computed: {
    getCalledFile() {
      const split = this.backtrace.file.split('/')

      return split[split.length - 1] + ':' + this.backtrace.line
    }
  }
}
</script>
