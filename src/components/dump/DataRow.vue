<template>
  <div class="flex flex-row space-x-3 border-b-[1px] border-gray-100 py-3" :class="getRowBackgroundColor">
    <div class="flex items-center px-4 justify-start border-r-[1px] border-gray-100">
      <LineNumber :line="id"></LineNumber>
    </div>

    <div class="flex items-center justify-end border-r-[1px] border-gray-100 pr-3">
      <BackTrace :backtrace="messageDto.backtrace"></BackTrace>
    </div>

    <div class="flex-1 items-center">
      <div class="p-3 rounded bg-gray-100 border-[1px] border-gray-200 box-border w-fit text-[105%] leading-5">
        <component :is="this.$getValueComponent(messageDto.data)" :capsule-dto="messageDto.data"></component>
      </div>
    </div>

    <div class="flex space-x-1.5 items-center ml-auto pr-5">
      <TimeAgo></TimeAgo>
      <LanguageVersion :language="messageDto.language" :version="messageDto.version"></LanguageVersion>
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
