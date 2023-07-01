<template>
  <div class="text-green-700 mb-0.5">/** #{{ id }} {{ printFocusFile }} -- {{ getCurrentTime() }} */</div>
</template>

<script>
export default {
  props: {
    focusFile: {
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
    printFocusFile() {
      let fileName = `${this.focusFile.file}:${this.focusFile.line}`;

      if ('code' in this.focusFile) {
        fileName += ` (CODE: ${this.focusFile.code})`
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
