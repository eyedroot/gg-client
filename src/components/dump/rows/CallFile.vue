<template>
  <div class="text-gray-500 tracking-tighter text-[11px] mb-2.5">
    <div>// #{{ id }} {{ getCalledFile }} -- {{ getCurrentTime() }}</div>
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
      const hours = ("0" + date.getHours()).slice(-2);
      const minutes = ("0" + date.getMinutes()).slice(-2);
      const seconds = ("0" + date.getSeconds()).slice(-2);

      return `${hours}:${minutes}:${seconds}`;
    },
  },
  mounted() {
  },
}
</script>
