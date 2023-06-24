<template>
  <span class="--value" :class="textColor">
    <span>
      <span v-if="capsuleDto.type === 'string'" class="text-gray-500">"</span>
      <span>{{ printScalarType }}</span>
      <span v-if="capsuleDto.type === 'string'" class="text-gray-500">"</span>
    </span>
    <span v-if="! isProperty && ['float', 'integer', 'double'].includes(capsuleDto.type)"
      class="ml-1.5 text-[9px] tracking-tighter text-gray-400 italic select-none"></span>
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
    isProperty: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  computed: {
    textColor() {
      return {
        property: this.isProperty === true,
        [typeof this.capsuleDto.value]: this.isProperty === false,
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
    @apply text-green-600;
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
