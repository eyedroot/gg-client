<template>
  <div class="flex flex-row space-x-3 border-b-[1px] border-gray-100 py-3" :class="getRowBackgroundColor">
    <div class="flex items-center px-4 justify-start border-r-[1px] border-gray-100">
      <LineNumber :line="id"></LineNumber>
    </div>

    <div class="flex items-center justify-end border-r-[1px] border-gray-100 pr-3">
      <BackTrace :backtrace="messageDto.backtrace"></BackTrace>
    </div>

    <div class="flex-1 items-center">
      <DataConverter :capsule-dto="messageDto.data"></DataConverter>
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
import DataConverter from "@/components/dump/DataConverter.vue";
import LanguageVersion from "@/components/dump/rows/LanguageVersion.vue";
import BackTrace from "@/components/dump/rows/BackTrace.vue";

export default {
  name: "DataRow",
  components: {
    BackTrace,
    LanguageVersion,
    DataConverter,
    LineNumber,
    TimeAgo
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
