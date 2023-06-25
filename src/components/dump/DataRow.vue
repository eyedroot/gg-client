<template>
  <div v-if="['log', 'throwable'].includes(messageDto.messageType)"
       class="flex h-fit overflow-x-auto px-0.5 pt-1" :class="getRowBackgroundColor">

    <div class="--code-wrap flex-auto items-center relative">
      <button class="absolute top-1 right-1.5 z-20" @click="removeItem(id)">
        <fa-icon icon="xmark" class="text-gray-800"></fa-icon>
      </button>

      <div class="--code" :class="{ throwable: messageDto.messageType === 'throwable' }">
        <CallFile :backtrace="getNotVendorTrace()" :id="displayId"></CallFile>

        <div v-if="messageDto.messageType.startsWith('log')" class="mb-3" ref="rValue">
          <component :is="this.$getValueComponent(messageDto.data)"
                     :capsule-dto="messageDto.data"></component>
        </div>
        <div v-else class="mb-3">
          <span>{{ this.messageDto.data.value.message }}</span>
        </div>

        <div class="flex absolute right-1.5 bottom-0 space-x-1.5">
          <RowExtensions :load-from-local-storage="loadFromLocalStorage"
                         @saveToLocalStorage="saveToLocalStorage"
                         @toggleBacktrace="toggleBacktrace">
            <template v-slot:languageVersion>
              <span>{{ messageDto.language.toLowerCase() }}_{{ messageDto.version }}</span>
            </template>
          </RowExtensions>
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

  <SpaceValue v-else-if="messageDto.messageType === 'log.space'"
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
import RowExtensions from "@/components/dump/RowExtensions.vue";

export default {
  name: "DataRow",
  components: {
    RowExtensions,
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
      showBacktrace: false
    }
  },
  methods: {
    toggleBacktrace() {
      console.log('toggleBacktrace')
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
    saveToLocalStorage() {
      const logs = JSON.parse(localStorage.getItem(this.storageName)) || [];
      logs.push(toRaw(this.messageDto));

      localStorage.setItem(this.storageName, JSON.stringify(logs));
    },
  },
  computed: {
    getRowBackgroundColor() {
      return this.id % 2 === 0 ? 'bg-white' : 'bg-white'
    },
  },
}
</script>
