<template>
  <header
    class="top-1 flex --draggable cursor-move py-1.5 flex-row space-x-6 w-full items-center justify-center p-1 z-50 bg-gray-200 border-b-[1px] border-gray-300 shadow-sm -ml-0.5 -mt-1 select-none dark:bg-gray-800 dark:border-black"
    :class="{ fixed: scrollY >= 38 }"
    style="width: calc(100% + 4px)"
  >
    <button class="--invalidation-draggable" @click="setGrid(1)">
      <img
        :src="isDarkMode ? '/assets/image/icons/columns-1-dark.svg' : '/assets/image/icons/columns-1.svg'"
        class="w-5 opacity-50"
        :class="{ '!opacity-100': options.grid === 1 }"
        alt="Column 1"
      />
    </button>

    <button
      @click="setGrid(2)"
      class="--invalidation-draggable"
      :class="{ 'opacity-20 cursor-not-allowed': isPreventGrid23() }"
    >
      <img
        :src="isDarkMode ? '/assets/image/icons/columns-2-dark.svg' : '/assets/image/icons/columns-2.svg'"
        class="w-5 opacity-50"
        :class="{ '!opacity-100': options.grid === 2 }"
        alt="Column 2"
      />
    </button>

    <button
      @click="setGrid(3)"
      class="--invalidation-draggable"
      :class="{ 'opacity-20 cursor-not-allowed': isPreventGrid23() }"
    >
      <img
        :src="isDarkMode ? '/assets/image/icons/columns-3-dark.svg' : '/assets/image/icons/columns-3.svg'"
        class="w-5 opacity-50"
        :class="{ '!opacity-100': options.grid === 3 }"
        alt="Column 3"
      />
    </button>

    <button @click="setReverse()" class="--invalidation-draggable">
      <fa-icon :icon="getSortIcon()" class="text-gray-800 dark:text-gray-300"></fa-icon>
    </button>

    <button @click="clearLogs()" class="--invalidation-draggable">
      <fa-icon icon="eraser" class="text-gray-800 dark:text-gray-300"></fa-icon>
    </button>

    <div class="absolute right-3 top-1.5 --invalidation-draggable">
      <CheckboxButton label="Pinned" />
    </div>
  </header>
</template>

<script>
import { inject } from 'vue';
import CheckboxButton from '@/components/CheckboxButton.vue';

export default {
  name: 'ScrollableOptions',
  components: { CheckboxButton },
  props: {
    options: {
      type: Object,
      required: true,
    },
    scrollY: {
      type: Number,
      required: true,
    },
    isLocalData: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup() {
    const isDarkMode = inject('isDarkMode');

    return {
      isDarkMode,
    };
  },
  methods: {
    setGrid(grid) {
      this.$emit('updateOptions', {
        grid: grid,
        reverse: this.options.reverse,
      });
    },
    setReverse() {
      this.$emit('updateOptions', {
        grid: this.options.grid,
        reverse: !this.options.reverse,
      });
    },
    clearLogs() {
      if (window.confirm('Do you want to erase all data?')) {
        this.$emit('clearLogs', this.isLocalData);
      }
    },
    getSortIcon() {
      if (this.options.reverse) {
        return 'arrow-up-wide-short';
      }

      return 'arrow-down-short-wide';
    },
    isPreventGrid23() {
      return this.options.reverse === true;
    },
  },
};
</script>
