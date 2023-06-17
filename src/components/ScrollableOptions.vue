<template>
  <header class="top-0 flex flex-row space-x-6 w-full items-center justify-center p-1 z-50 bg-gray-200 border-b-[1px] border-gray-300 shadow-sm" :class="{ fixed: scrollY >= 38 }">
    <button @click="setGrid(1)">
      <img src="/assets/image/icons/columns-1.png" class="w-5 opacity-50" :class="{ '!opacity-100': options.grid === 1 }" alt="Column 1">
    </button>
    <button @click="setGrid(2)">
      <img src="/assets/image/icons/columns-2.png" class="w-5 opacity-50" :class="{ '!opacity-100': options.grid === 2 }" alt="Column 2">
    </button>
    <button @click="setGrid(3)">
      <img src="/assets/image/icons/columns-3.png" class="w-5 opacity-50" :class="{ '!opacity-100': options.grid === 3 }" alt="Column 3">
    </button>
    <button @click="setReverse()">
      Reverse
    </button>
    <button @click="clearLogs()">
      <fa-icon icon="eraser" class="text-gray-800"></fa-icon>
    </button>
  </header>
</template>

<script>
export default {
name: "ScrollableOptions",
  props: {
    options: {
      type: Object,
      required: true
    },
    scrollY: {
      type: Number,
      required: true
    }
  },
  methods: {
    setGrid(grid) {
      this.$emit('update:options', {
        grid: grid,
        reverse: this.options.reverse,
      })
    },
    setReverse() {
      this.$emit('update:options', {
        grid: this.options.grid,
        reverse: ! this.options.reverse,
      })
    },
    clearLogs() {
      if (window.confirm('Do you want to erase all data?')) {
        this.$emit('clearLogs')
      }
    },
  },
}
</script>
