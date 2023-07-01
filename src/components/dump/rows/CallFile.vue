<template>
  <div class="text-green-700 mb-0.5">/** #{{ id }} {{ getCalledFile }} -- {{ getCurrentTime() }} */</div>
</template>

<script>
export default {
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
