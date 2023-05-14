<template>
  <div class="flex flex-row space-x-3 border-b-[1px] border-gray-100 py-3" :class="getRowBackgroundColor">
    <div class="flex items-center px-4 justify-start border-r-[1px] border-gray-100">
      <LineNumber :line="id"></LineNumber>
    </div>

    <div class="flex items-center justify-end border-r-[1px] border-gray-100 pr-3">
      <BackTrace :backtrace="messageDto.backtrace"></BackTrace>
    </div>

    <div class="flex-1 items-center">
      <div class="--code p-3 rounded bg-gray-100 border-[1px] border-gray-200 box-border text-[100%] leading-5 tracking-tighter">
        <component :is="this.$getValueComponent(messageDto.data)" :capsule-dto="messageDto.data"></component>
      </div>
    </div>

    <div class="flex flex-col justify-center items-center space-y-1.5 ml-auto pr-5 min-w-[100px] max-w-[100px]">
      <LanguageVersion :language="messageDto.language" :version="messageDto.version"></LanguageVersion>
      <TimeAgo></TimeAgo>
    </div>
  </div>
</template>

<script>
import TimeAgo from "@/components/dump/rows/TimeAgo.vue";
import LineNumber from "@/components/dump/rows/LineNumber.vue";
import LanguageVersion from "@/components/dump/rows/LanguageVersion.vue";
import BackTrace from "@/components/dump/rows/BackTrace.vue";

import ArrayValue from "@/components/dump/values/ArrayValue.vue";
import ScalarValue from "@/components/dump/values/ScalarValue.vue";
import StdClassValue from "@/components/dump/values/StdClassValue.vue";

export default {
  name: "DataRow",
  components: {
    BackTrace,
    LanguageVersion,
    LineNumber,
    TimeAgo,
    ArrayValue,
    ScalarValue,
    StdClassValue
  },
  props: {
    id: {
      type: Number,
      default: 0,
      required: true
    },
    messageDto: {
      type: Object,
      required: true
    }
  },
  computed: {
    getRowBackgroundColor() {
      return this.id % 2 === 0 ? 'bg-gray-50' : 'bg-white'
    }
  }
}
</script>

<style lang="scss">
.--code {
  font-family: 'Fira Code', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
}
</style>
