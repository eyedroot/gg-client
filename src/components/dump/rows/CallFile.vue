<template>
  <div class="flex flex-row space-x-1.5 items-center">
    <span class="text-gray-700 text-[11px]">{{ getCalledFile }}</span>
  </div>
</template>

<script>
export default {
  name: 'CallFile',
  props: {
    backtrace: {
      type: Object,
      required: true
    }
  },
  computed: {
    getCalledFile() {
      let fileName = `${this.backtrace.file}:${this.backtrace.line}`;

      if ('code' in this.backtrace) {
        fileName += ` (CODE: ${this.backtrace.code})`
      }

      return fileName
    }
  },
  mounted() {
  },
}
</script>
