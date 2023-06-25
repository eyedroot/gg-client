<template>
  <div class="--code ml-5 my-2">
    <div class="flex flex-col">
      <div v-for="(row, idx) in sourceCode" :key="idx" class="flex flex-row">
        <div class="flex select-none justify-end min-w-[20px] text-gray-400 mr-3">{{ row.line }}</div>
        <code class="flex-1 whitespace-pre" :class="{ 'bg-gray-200': focusLine === row.line }">{{ row.code }}</code>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sourceCode: {
      type: Array,
      required: true
    },
    focusLine: {
      type: Number,
      required: true
    },
  },
  setup() {
    return {
    }
  }
}
</script>
