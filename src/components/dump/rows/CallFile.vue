<template>
  <div class="flex flex-row space-x-1.5 items-center">
    <fa-icon icon="code" class="text-gray-600" title="backtrace"></fa-icon>
    <span class="tracking-tight text-gray-600 underline">{{ getCalledFile }}</span>
  </div>
</template>

<script>
export default {
  name: 'BackTrace',
  props: {
    backtrace: {
      type: Array,
      required: true
    }
  },
  computed: {
    getCalledFile() {
      let fileAndLine = '';

      for (let row of this.backtrace) {
        if ('class' in row && row.class.includes('Beaverlabs\\GG')) {
          continue
        }

        const split = row.file.split('/')

        fileAndLine = split[split.length - 1] + ':' + row.line
        break
      }

      return fileAndLine
    }
  }
}
</script>
