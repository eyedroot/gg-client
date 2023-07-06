<template>
  <div v-if="['log', 'throwable'].includes(messageDto.type)"
       class="flex h-fit overflow-x-auto px-0.5 pt-1">

    <div class="--code-wrap flex-auto items-center relative" ref="code">
      <button class="absolute top-1 right-1.5 z-20" @click="removeItem(id)">
        <fa-icon icon="xmark" class="text-gray-800"></fa-icon>
      </button>

      <div v-if="messageDto.type.startsWith('log')"
           class="--code" :class="{ throwable: messageDto.type === 'throwable' }">
        <CallFile :focusFile="focusFile()" :id="displayId"></CallFile>

        <div class="mb-3" ref="rValue">
          <component :is="this.$getValueComponent(messageDto.data)"
                     :capsule-dto="messageDto.data"></component>
        </div>

        <div class="flex absolute right-1.5 bottom-0 space-x-1.5">
          <RowExtensions :is-local-data="isLocalData"
                         @saveToLocalStorage="saveToLocalStorage"
                         @toggleBacktrace="toggleBacktrace"
                         @copyImage="copyImage">
            <template v-slot:languageVersion>
              <span>{{ messageDto.language.toLowerCase() }}_{{ messageDto.version }}</span>
            </template>
          </RowExtensions>
        </div>
      </div>

      <ThrowableValue v-else-if="messageDto.type === 'throwable'"
        :message-dto="messageDto">
        <div class="flex absolute right-1.5 bottom-0 space-x-1.5">
          <RowExtensions :is-local-data="isLocalData"
                         @saveToLocalStorage="saveToLocalStorage"
                         @toggleBacktrace="toggleBacktrace"
                         @copyImage="copyImage">
            <template v-slot:languageVersion>
              <span>{{ messageDto.language.toLowerCase() }}_{{ messageDto.version }}</span>
            </template>
          </RowExtensions>
        </div>
      </ThrowableValue>

      <div v-if="showBacktrace">
        <BackTrace
          :backtrace="this.messageDto.trace"
          :focus-file="focusFile()">
        </BackTrace>
      </div>
    </div>
  </div>

  <UsageValue v-else-if="messageDto.type === 'log.usage'"
              @removeItem="removeItem(id)"
              :message-dto="this.messageDto">
  </UsageValue>

  <NoteValue v-else-if="messageDto.type === 'log.note'"
             :class="this.$emit('getColumnSize')"
             @removeItem="removeItem(id)"
             :messageDto="this.messageDto">
  </NoteValue>
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
import SpaceValue from "@/components/dump/values/NoteValue.vue";
import {inject, toRaw} from "vue";
import RowExtensions from "@/components/dump/RowExtensions.vue";
import html2canvas from "html2canvas";
import UsageValue from "@/components/dump/values/UsageValue.vue";
import ThrowableValue from "@/components/dump/values/ThrowableValue.vue";

export default {
  components: {
    ThrowableValue,
    UsageValue,
    RowExtensions,
    NoteValue: SpaceValue,
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
    isLocalData: {
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
      this.showBacktrace = !this.showBacktrace;
    },
    focusFile() {
      if (this.messageDto.language === 'PHP') {
        if (this.messageDto.type === 'throwable') {
          return this.messageDto.data.value
        }

        for (let i = 0; i < this.messageDto.trace.length; i++) {
          let row = this.messageDto.trace[i];

          if (row.file && (!row.file.includes('gg/src/Gg.php') && !row.file.includes('gg/src/helpers/helper.php') && !row.file.includes('/vendor/'))) {
            return row;
          }
        }
      }

      return { file: '', line: -1 }
    },
    saveToLocalStorage() {
      const logs = JSON.parse(localStorage.getItem(this.storageName)) || [];
      logs.push(toRaw(this.messageDto));

      localStorage.setItem(this.storageName, JSON.stringify(logs));
    },
    async copyImage() {
      const canvas = await html2canvas(this.$refs.code, {
        scale: 2, // 더 높은 해상도를 생성하고, 텍스트 시각 품질 향상
        backgroundColor: null, // 배경을 투명하게 만듭니다.
        useCORS: true, // 외부 이미지 렌더링에 필요하다면 CORS 대응을 사용하십시오
      })

      const dataUrl = canvas.toDataURL()

      // Convert dataUrl to Blob
      const response = await fetch(dataUrl)
      const blob = await response.blob()

      // Create a new clipboard item
      const clipboardItem = new ClipboardItem({'image/png': blob})

      // Write the clipboard item to the clipboard
      navigator.clipboard.write([clipboardItem]).then(() => {
        console.log('Image copied to clipboard.')
      }).catch(err => {
        console.error('Failed to copy image to clipboard: ', err)
      })
    },
  },
}
</script>
