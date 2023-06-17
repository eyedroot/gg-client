<template>
  <div class="text-gray-500 tracking-tighter text-[11px] mb-2.5">
    <span>// [{{ getCurrentTime() }}] #{{ id }}</span> <span>{{ getCalledFile }}</span>
  </div>
</template>

<script>
export default {
  name: 'CallFile',
  props: {
    backtrace: {
      type: Object,
      required: true
    },
    id: {
      type: Number,
      default: 1,
      required: true
    },
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
  methods: {
    getCurrentTime() {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();

      return `${hours}:${minutes}:${seconds}`;
    },
  },
  mounted() {
  },
}
</script>
