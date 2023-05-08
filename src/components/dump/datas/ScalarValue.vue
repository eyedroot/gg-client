<template>
  <span class="--value" :class="textColor">{{ printScalarType }}</span>
</template>

<script>
export default {
  name: 'ScalarValue',
  props: {
    value: {
      type: [String, Boolean, Number, null],
      required: true
    }
  },
  computed: {
    textColor() {
      return typeof this.value
    },
    printScalarType() {
      if (this.value === null) {
        return 'null'
      }

      return this.value
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
    &::before {
      content: '"';
      @apply text-gray-500;
    }
    &::after {
      content: '"';
      @apply text-gray-500;
    }
    @apply text-black;
  }
  &.boolean {
    @apply text-green-600;
  }
  &.object {
    @apply text-gray-400;
  }
}
</style>
