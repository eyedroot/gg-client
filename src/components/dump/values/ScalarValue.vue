<template>
  <span class="--value" :class="textColor">
    {{ printScalarType }} <span class="text-[9px] tracking-tighter text-gray-400 italic">{{ printNumberType }}</span>
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
    printNumberType() {
      if (['float', 'integer', 'double'].includes(this.capsuleDto.type)) {
        return `${this.capsuleDto.type}`
      }

      return ''
    },
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
  &.property {
    @apply text-gray-600;
  }
}
</style>
