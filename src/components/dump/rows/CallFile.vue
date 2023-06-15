<template>
  <div class="text-gray-500 tracking-tighter text-[11px] mb-2.5">{{ getCalledFile }}</div>
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
