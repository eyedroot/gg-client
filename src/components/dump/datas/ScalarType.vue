<template>
  <span class="--value" :class="textColor">{{ printScalarType }}</span>
</template>

<script>
export default {
  name: 'ScalarType',
  props: {
    data: {
      type: [String, Boolean, Number, null],
      required: true
    }
  },
  computed: {
    textColor() {
      return typeof this.data
    },
    printScalarType() {
      if (this.data === null) {
        return 'NULL'
      }

      return this.data
    }
  }
}
</script>

<style lang="scss">
.--value {
  @apply font-medium text-[13px];
  &.number {
    @apply text-blue-700;
  }
  &.string {
    @apply text-black underline;
  }
  &.boolean {
    @apply text-green-600 italic;
  }
  &.object {
    @apply text-gray-400 italic;
  }
}
</style>
