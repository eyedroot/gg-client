<template>
  <div class="flex flex-row space-x-3 border-b-[1px] border-gray-200 py-5" :class="getRowBackgroundColor">
    <div class="flex items-center px-4 justify-start border-r-[1px] border-gray-200">
      <LineNumber :line="id"></LineNumber>
    </div>

    <div class="flex-1 items-center pr-3">
      <div class="flex flex-row items-center space-x-1.5 mb-2.5">
        <LanguageVersion :language="messageDto.language" :version="messageDto.version"></LanguageVersion>
        <CallFile :backtrace="getNotVendorTrace()"></CallFile>

        <div class="flex-grow"></div>

        <div class="ml-auto">
          <TimeAgo></TimeAgo>
        </div>
      </div>

      <div class="--code">
        <component :is="this.$getValueComponent(messageDto.data)" :capsule-dto="messageDto.data"></component>

        <button class="--backtrace-button button transparent absolute right-1 bottom-0 inline-flex items-center justify-center"
                @click="toggleBacktrace">
          <fa-icon icon="code" class="mr-1.5"></fa-icon>
          <span>backtrace</span>
        </button>
      </div>

      <div v-if="showBacktrace">
        <BackTrace :backtrace="messageDto.backtrace"></BackTrace>
      </div>
    </div>
  </div>
</template>

<script>
import TimeAgo from "@/components/dump/rows/TimeAgo.vue";
import LineNumber from "@/components/dump/rows/LineNumber.vue";
import LanguageVersion from "@/components/dump/rows/LanguageVersion.vue";

import ArrayValue from "@/components/dump/values/ArrayValue.vue";
import ScalarValue from "@/components/dump/values/ScalarValue.vue";
import StdClassValue from "@/components/dump/values/StdClassValue.vue";
import CallFile from "@/components/dump/rows/CallFile.vue";
import BackTrace from "@/components/dump/rows/BackTrace.vue";

export default {
  name: "DataRow",
  components: {
    BackTrace,
    CallFile,
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
  data() {
    return {
      showBacktrace: false,
    };
  },
  methods: {
    toggleBacktrace() {
      this.showBacktrace = ! this.showBacktrace;
    },
    getNotVendorTrace() {
      for (let i = 0; i < this.messageDto.backtrace.length; i++) {
        const row = this.messageDto.backtrace[i];

        if (row.file && ! row.file.includes('/vendor/')) {
          return row;
        }
      }
    },
  },
  computed: {
    getRowBackgroundColor() {
      return this.id % 2 === 0 ? 'bg-white' : 'bg-white'
    },
  },
  mounted() {
    console.log(this.messageDto)
  }
}
</script>
