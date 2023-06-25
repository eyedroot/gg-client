<template>
  <span class="inline-flex bg-gray-300 rounded-sm mx-0.5 cursor-pointer" @click="$emit('handleCollapsed')">...</span>
  <span class="brackets" :class="bracketIndex">{{ getCollapsedTail }}</span>
</template>

<script>
export default {
  emits: ['handleCollapsed'],
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
  },
  computed: {
    getCollapsedTail() {
      return this.type === 'array' ? ']' : '}';
    },
  }
}
</script>
