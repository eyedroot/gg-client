<template>
  <div class="text-green-700 mb-0.5">/** #{{ id }} {{ printFocusFile }} */</div>
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
}
</script>
