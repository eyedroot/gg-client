<template>
  <div class="flex flex-row space-x-3 border-b-[1px] border-gray-100 py-3" :class="backgroundColor">
    <div class="flex items-center px-4 justify-start border-r-[1px] border-gray-100">
      <line-number :line="id"></line-number>
    </div>

    <div class="flex items-center w-[13%] justify-end border-r-[1px] border-gray-100 pr-3">
      <span class="badge" :class="getBadgeColor">{{ data.type }}</span>
    </div>

    <div class="flex-1 items-center">
      <component :is="getDataComponent()" :data="data.data"></component>
    </div>

    <div class="flex items-center ml-auto pr-5">
      <time-ago></time-ago>
    </div>
  </div>
</template>

<script>
import TimeAgo from "@/components/dump/TimeAgo.vue";
import ScalarType from "@/components/dump/datas/ScalarType.vue";
import LineNumber from "@/components/dump/LineNumber.vue";

export default {
  name: "DataRow",
  components: {
    LineNumber,
    ScalarType,
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
  methods: {
    getDataComponent() {
      if (this.data.isScalarType) {
        return 'ScalarType'
      }

      if (this.data.type.toLowerCase() === 'array') {
        return 'ArrayType'
      }

      return '(Unknown)'
    }
  },
  computed: {
    backgroundColor() {
      return this.id % 2 === 0 ? 'bg-gray-50' : 'bg-white'
    },
    getBadgeColor() {
      return this.data.type === 'NULL' ? 'gray' : 'blue'
    }
  }
}
</script>
