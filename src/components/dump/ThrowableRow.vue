<template>
  <div class="flex flex-row space-x-3 border-b-[1px] border-gray-200 py-5" :class="getRowBackgroundColor">
    <div class="flex items-center px-4 justify-start border-r-[1px] border-gray-200">
      <LineNumber :line="id"></LineNumber>
    </div>

    <div class="flex-1 items-center pr-3">
      <div class="flex flex-row items-center space-x-1.5 mb-2.5">
        <LanguageVersion :language="messageDto.language" :version="messageDto.version"></LanguageVersion>

        <CallFile :backtrace="messageDto.data.value"></CallFile>

        <div class="flex-grow"></div>

        <div class="flex flex-row ml-auto space-x-1.5">
          <TimeAgo></TimeAgo>

          <button class="pr-0.5" @click="removeItem(id)">
            <fa-icon icon="trash-can" class="text-gray-300 hover:text-blue-600"></fa-icon>
          </button>
        </div>
      </div>

      <div class="--code throwable">
        <span>{{ this.messageDto.data.value.message }}</span>

        <button class="--backtrace-button button transparent absolute right-1 bottom-0 inline-flex items-center justify-center"
                @click="toggleBacktrace">
          <fa-icon icon="code" class="mr-1.5"></fa-icon>
          <span>backtrace</span>
        </button>
      </div>

      <div v-if="showBacktrace">
        <BackTrace
          :backtrace="messageDto.backtrace"
          :highlighted-file="{ file: messageDto.data.value.file }">
        </BackTrace>
      </div>
    </div>
  </div>
</template>

<script>
import TimeAgo from "@/components/dump/rows/TimeAgo.vue";
import LineNumber from "@/components/dump/rows/LineNumber.vue";
import LanguageVersion from "@/components/dump/rows/LanguageVersion.vue";

import BackTrace from "@/components/dump/rows/BackTrace.vue";
import CallFile from "@/components/dump/rows/CallFile.vue";

export default {
  name: "ThrowableRow",
  components: {
    CallFile,
    BackTrace,
    LanguageVersion,
    LineNumber,
    TimeAgo,
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
    },
    removeItem: {
      type: Function,
      required: true
    },
  },
  data() {
    return {
      showBacktrace: true,
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
}
</script>
