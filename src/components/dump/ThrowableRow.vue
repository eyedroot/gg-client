<template>
  <div class="flex h-fit overflow-x-auto px-0.5 pt-1" :class="getRowBackgroundColor">
    <div class="flex-1 items-center relative">
      <div class="--code throwable">
        <CallFile :backtrace="getNotVendorTrace()" :id="displayId"></CallFile>

        <div class="mb-3">
          <span>{{ this.messageDto.data.value.message }}</span>
        </div>

        <button class="--backtrace-button button transparent absolute right-1.5 bottom-0 inline-flex items-center justify-center"
                @click="toggleBacktrace">
          <fa-icon icon="code" class="mr-1.5"></fa-icon>
          <span class="text-gray-800">backtrace_{{ messageDto.language.toLowerCase() }}_{{ messageDto.version }}</span>
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
import BackTrace from "@/components/dump/rows/BackTrace.vue";
import CallFile from "@/components/dump/rows/CallFile.vue";

export default {
  name: "ThrowableRow",
  components: {
    CallFile,
    BackTrace,
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    displayId: {
      type: Number,
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
}
</script>
