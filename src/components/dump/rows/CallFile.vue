<template>
  <div class="text-green-700 dark:text-teal-400 mb-1.5">/** #{{ id }} {{ printFocusFile }} */</div>
</template>

<script>
export default {
  props: {
    focusFile: {
      type: Object,
      required: true,
    },
    id: {
      type: Number,
      default: 1,
      required: true,
    },
  },
  computed: {
    printFocusFile() {
      if (!this.focusFile.file || !this.focusFile.line) {
        return '';
      }

      let fileName = `${this.focusFile.file}:${this.focusFile.line}`;

      if ('code' in this.focusFile) {
        fileName += ` (CODE: ${this.focusFile.code})`;
      }

      return fileName;
    },
  },
};
</script>
