<template>
  <template v-if="isFold">
    <span
      class="inline-flex bg-gray-300 rounded-sm mx-0.5 px-0.5 cursor-pointer dark:bg-gray-600 dark:text-gray-300"
      @click="$emit('handleFold')">...</span>
    <span class="brackets" :class="bracketIndex">{{ getCollapsedTail }}</span>
  </template>
  <template v-else>
    <span
      class="inline-flex rounded-sm mx-0.5 cursor-pointer text-gray-700"
      @click="$emit('handleFold')">▼</span>
  </template>
</template>

<script>
export default {
  name: 'CodeFoldingTail',
  emits: ['handleFold'],
  props: {
    type: {
      type: String,
      validator(value) {
        return ['array', 'stdClass'].includes(value);
      },
      required: true,
    },
    bracketIndex: {
      type: String,
      default: '',
      required: true,
    },
    isFold: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    getCollapsedTail() {
      return this.type === 'array' ? ']' : '}';
    },
  }
}
</script>
