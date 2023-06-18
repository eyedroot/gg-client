<template>
  <span class="--value" :class="textColor">{{ printScalarType }}</span>
</template>

<script>
export default {
  name: 'ScalarValue',
  props: {
    capsuleDto: {
      type: Object,
      required: true
    }
  },
  computed: {
    textColor() {
      return typeof this.capsuleDto.value
    },
    printScalarType() {
      if (this.capsuleDto.value === null) {
        return 'null'
      }

      return this.capsuleDto.value
    }
  }
}
</script>

<style lang="scss">
.--value {
  @apply font-medium;
  &.number {
    @apply text-blue-700;
  }
  &.string {
    @apply text-red-950;
    &::before {
      content: '"';
      @apply text-gray-500;
    }
    &::after {
      content: '"';
      @apply text-gray-500;
    }
  }
  &.boolean {
    @apply text-green-600;
  }
  &.object {
    @apply text-gray-400;
  }
}
</style>
