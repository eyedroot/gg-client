<template>
  <div
    class="flex flex-row items-center justify-center bg-gray-200 border-[1px] border-gray-300 py-1 px-2.5 shadow-md z-50 space-x-1 dark:bg-gray-800 dark:border-gray-900"
  >
    <div class="text-[12px] text-gray-500 pr-1 dark:text-gray-200">{{ textCountText() }}</div>

    <input
      ref="inputText"
      v-model="term"
      @keyup.enter="findText"
      type="text"
      class="bg-gray-100 leading-6 px-1 border-[1px] border-gray-300 ring-2 focus:outline-none dark:bg-gray-900 dark:text-gray-200 dark:border-black"
      :class="ringColor"
      placeholder="Enter"
    />

    <button class="pl-1" @click="this.$emit('closeSearch')">
      <fa-icon icon="xmark" class="text-gray-800 dark:text-gray-300"></fa-icon>
    </button>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue';

export default {
  props: {
    searchContext: {
      type: Object,
      required: true,
    },
  },
  setup(props, context) {
    const term = ref(props.searchContext.lastTerm || '');
    const inputText = ref(null);

    watch(term, (value) => {
      context.emit('saveTerm', value);
    });

    onMounted(() => {
      inputText.value.focus();
    });

    const focusInput = () => {
      inputText.value.focus();
    };

    const textCountText = () => {
      return props.searchContext.foundCount > 0
        ? `(${props.searchContext.currentIndex + 1}/${props.searchContext.foundCount})`
        : '(0/0)';
    };

    const findText = () => {
      if (term.value.length > 0) {
        context.emit('findText', term.value);
      }
    };

    const ringColor = computed(() => {
      if (term.value.length === 0 || props.searchContext.foundCount === -1) {
        return 'focus:ring-gray-500';
      }

      return props.searchContext.foundCount ? 'ring-green-500 dark:ring-green-700' : 'ring-red-500 dark:ring-red-700';
    });

    return {
      term,
      inputText,
      focusInput,
      textCountText,
      findText,
      ringColor,
    };
  },
};
</script>
