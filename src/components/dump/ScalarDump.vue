<template>
  <div class="flex flex-row space-x-3 border-b-[1px] border-gray-100" :class="backgroundColor">
    <div class="flex text-sm items-center w-[15%] justify-end border-r-[1px] border-gray-100 pr-3">
      <span class="badge" :class="getBadgeColor">{{ data.type }}</span>
    </div>
    <div class="flex-1 items-center --value py-3" :class="textColor">{{ data.data === null ? 'null' : data.data }}</div>
    <div class="flex items-center ml-auto pr-5">
      <time-ago></time-ago>
    </div>
  </div>
</template>

<script>
import TimeAgo from "@/components/dump/TimeAgo.vue";

export default {
  name: "ScalarDump",
  components: {
    TimeAgo
  },
  props: {
    id: {
      type: Number,
      default: 0,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    textColor() {
      return typeof this.data.data
    },
    backgroundColor() {
      return this.id % 2 === 0 ? 'bg-gray-50' : 'bg-white'
    },
    getBadgeColor() {
      return this.data.type === 'NULL' ? 'gray' : 'blue'
    }
  }
}
</script>

<style lang="scss">
.--value {
  @apply font-medium text-[13px];
  &.number {
    @apply text-blue-700;
  }
  &.boolean {
    @apply text-green-600 italic;
  }
  &.object {
    @apply text-gray-400 italic;
  }
}
</style>
