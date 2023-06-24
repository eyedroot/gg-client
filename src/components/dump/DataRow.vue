<template>
  <div v-if="isLogType()"
       class="flex h-fit overflow-x-auto px-0.5 pt-1" :class="getRowBackgroundColor">
    <div class="flex-auto items-center relative">
      <button class="absolute top-1 right-1.5 z-20" @click="removeItem(id)">
        <fa-icon icon="xmark" class="text-gray-800"></fa-icon>
      </button>

      <div class="--code">
        <CallFile :backtrace="getNotVendorTrace()" :id="displayId"></CallFile>

        <div class="mb-3" ref="rValue">
          <component :is="this.$getValueComponent(messageDto.data)" :capsule-dto="messageDto.data"></component>
        </div>

        <div class="flex absolute right-1.5 bottom-0 space-x-1.5">
          <button v-if="loadFromLocalStorage === false"
            class="--backtrace-button button transparent inline-flex items-center justify-center"
            @click="saveToLocalStorage">
            <fa-icon icon="floppy-disk" class="mr-1.5"></fa-icon>
            <span class="text-gray-800">{{ saved ? 'saved!' : 'save' }}</span>
          </button>

          <button class="--backtrace-button button transparent items-center justify-center"
            @click="toggleBacktrace">
            <fa-icon icon="code" class="mr-1.5"></fa-icon>
            <span class="text-gray-800">backtrace_{{ messageDto.language.toLowerCase() }}_{{ messageDto.version }}</span>
          </button>
        </div>
      </div>

      <div v-if="showBacktrace">
        <BackTrace
          :backtrace="messageDto.backtrace"
          :highlighted-file="getNotVendorTrace()">
        </BackTrace>
      </div>
    </div>
  </div>

  <SpaceValue
    v-else-if="isLogSpaceType()"
    :class="this.$emit('getColumnSize')"
    :messageDto="this.messageDto">
  </SpaceValue>
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
import SpaceValue from "@/components/dump/values/SpaceValue.vue";
import {inject, toRaw} from "vue";

export default {
  name: "DataRow",
  components: {
    SpaceValue,
    BackTrace,
    CallFile,
    LanguageVersion,
    LineNumber,
    TimeAgo,
    ArrayValue,
    ScalarValue,
    StdClassValue
  },
  setup() {
    const storageName = inject('storageName') || 'logs'

    return {
      storageName
    }
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
    loadFromLocalStorage: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  data() {
    return {
      showBacktrace: false,
      saved: false,
      copied: false,
    }
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
    isLogType() {
      return this.messageDto.messageType === 'log';
    },
    isLogSpaceType() {
      return this.messageDto.messageType === 'log.space';
    },
    saveToLocalStorage() {
      const logs = JSON.parse(localStorage.getItem(this.storageName)) || [];
      logs.push(toRaw(this.messageDto));

      localStorage.setItem(this.storageName, JSON.stringify(logs));
      this.saved = true;
    },
    copyToClipboard() {
      this.copied = true;

      console.log(this.$refs.rValue.innerText)
      // let text = this.$refs.rValue.value.textContent;
      // console.log(text)

      this.$emit('copy-to-clipboard', '')
    },
  },
  computed: {
    getRowBackgroundColor() {
      return this.id % 2 === 0 ? 'bg-white' : 'bg-white'
    },
  },
}
</script>
