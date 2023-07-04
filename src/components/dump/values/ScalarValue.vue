<template>
  <span class="--value" :class="textColor">
    <span :class="multilineOrDoubleQuote" v-html="printScalarType"></span>
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
  methods: {
    nl2br(str) {
      return str.replace(/\r\n|\r|\n/g, '<span class="select-none bg-gray-200 text-gray-400 p-0.5">\\n</span><br>')
    }
  },
  computed: {
    textColor() {
      return {
        property: this.isPropertyOrKey === true,
        [typeof this.capsuleDto.value]: this.isPropertyOrKey === false,
      }
    },
    multilineOrDoubleQuote() {
      if (this.capsuleDto.type === 'string') {
        return this.capsuleDto.value.includes('\n') ? '--multiline' : '--double-quote'
      }

      return {}
    },
    printScalarType() {
      if (this.capsuleDto.value === null) {
        return 'null'
      }

      return (this.capsuleDto.type === 'string') ? this.nl2br(this.capsuleDto.value) : this.capsuleDto.value
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
    @apply text-gray-900;
    .--multiline::before {
      content: '"""\A';
      white-space: pre;
      @apply text-gray-500;
    }
    .--multiline::after {
      content: '"""';
      @apply text-gray-500;
    }
    .--double-quote::before {
      content: '"';
      @apply text-gray-500;
    }
    .--double-quote::after {
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
    @apply text-green-700 font-semibold;
    .--double-quote::before {
      content: '"';
      @apply text-gray-500;
    }
    .--double-quote::after {
      content: '"';
      @apply text-gray-500;
    }
  }
}
</style>
