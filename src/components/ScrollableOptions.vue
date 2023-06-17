<template>
  <header class="fixed top-0 flex flex-row space-x-2.5 w-full items-center justify-center p-1 z-50 bg-gray-200 border-b-[1px] border-gray-300">
    <button @click="setGrid(1)">Grid 1</button>
    <button @click="setGrid(2)">Grid 2</button>
    <button @click="setGrid(3)">Grid 3</button>
  </header>
</template>

<script>
export default {
name: "ScrollableOptions",
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      grid: 1,
      reverse: false,
    }
  },
  watch: {
    options: function (newOptions) {
      this.grid = newOptions.grid
      this.reverse = newOptions.reverse
    }
  },
  methods: {
    setGrid(grid) {
      this.$emit('update:options', {
        grid: grid,
        reverse: this.reverse,
      })
    },
    setReverse(reverse) {
      this.$emit('update:options', {
        grid: this.grid,
        reverse: reverse,
      })
    },
  },
}
</script>
