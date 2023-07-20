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
    space2nbsp(str) {
      return str.replace(/ /g, '&nbsp;')
    },
    nl2br(str) {
      return str.replace(/\r\n|\r|\n/g, '<br>')
    },
    text2link(str) {
      return str.replace(/(https?:\/\/\S+?)(&nbsp;|\s|$)/g, '<a href="$1" target="_blank">$1</a>$2') // noinspection JSUnresolvedVariable
    },
    numberFormat(str) {
      return String(str).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1<span class="select-none">,</span>')
    },
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

      if (this.capsuleDto.type === 'string') {
        return this.text2link(this.space2nbsp(this.nl2br(this.capsuleDto.value)))
      }

      if (this.capsuleDto.type === 'integer') {
        return this.numberFormat(this.capsuleDto.value)
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
    @apply text-blue-700 dark:text-blue-300;
  }
  &.string {
    @apply text-gray-900 dark:text-gray-300;
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
    a {
      @apply text-blue-600 underline dark:text-blue-300;
      &:visited {
        @apply text-purple-600 underline dark:text-purple-300;
      }
    }
  }
  &.boolean {
    @apply text-orange-600 dark:text-orange-300;
  }
  &.object {
    @apply text-gray-400;
  }
  &.property {
    @apply text-green-700 font-semibold dark:text-green-400;
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
