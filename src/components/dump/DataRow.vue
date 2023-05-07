<template>
  <div class="flex flex-row space-x-3 border-b-[1px] border-gray-100 py-3" :class="getRowBackgroundColor">
    <div class="flex items-center px-4 justify-start border-r-[1px] border-gray-100">
      <line-number :line="id"></line-number>
    </div>

    <div class="flex items-center w-[13%] justify-end border-r-[1px] border-gray-100 pr-3">
    </div>

    <div class="flex-1 items-center">
      <data-converter :capsule-dto="messageDto.data"></data-converter>
    </div>

    <div class="flex space-x-1.5 items-center ml-auto pr-5">
      <time-ago></time-ago>
      <language-version :language="messageDto.language" :version="messageDto.version"></language-version>
    </div>
  </div>
</template>

<script>
import TimeAgo from "@/components/dump/rows/TimeAgo.vue";
import LineNumber from "@/components/dump/rows/LineNumber.vue";
import DataConverter from "@/components/dump/DataConverter.vue";
import LanguageVersion from "@/components/dump/rows/LanguageVersion.vue";

export default {
  name: "DataRow",
  components: {
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
