<template>
  <span class="--value" :class="textColor">
    <span>{{ printScalarType }}</span>
    <span
      v-if="! isPropertyOrKey && ['float', 'integer', 'double', 'boolean'].includes(capsuleDto.type)"
      class="ml-1.5 text-[9px] tracking-tighter text-gray-400 italic select-none">// {{ getShortType }}</span>
  </span>
</template>

<script>
export default {
  name: 'ScalarValue',
  props: {
    capsuleDto: {
      type: Object,
      required: true
    },
    isPropertyOrKey: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  computed: {
    textColor() {
      return {
        property: this.isPropertyOrKey === true,
        [typeof this.capsuleDto.value]: this.isPropertyOrKey === false,
      }
    },
    printScalarType() {
      if (this.capsuleDto.value === null) {
        return 'null'
      }

      return this.capsuleDto.value
    },
    getShortType() {
      return this.capsuleDto.type === 'integer' ? 'int' : this.capsuleDto.type
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
    @apply text-green-700;
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
    @apply text-orange-600;
  }
  &.object {
    @apply text-gray-400;
  }
  &.property {
    @apply text-gray-600;
  }
}
</style>
