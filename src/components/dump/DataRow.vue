<template>
  <div v-if="['log', 'throwable', 'http.request', 'sql.model'].includes(messageDto.type)"
       class="flex h-fit overflow-x-auto px-0.5 pt-1">

    <div class="--code-wrap flex-auto items-center relative" ref="code">
      <button class="absolute top-1 right-1.5 z-20" @click="removeItem(id)">
        <fa-icon icon="xmark" class="text-gray-800 dark:text-gray-300"></fa-icon>
      </button>

      <div v-if="messageDto.type.startsWith('log')" class="--code">
        <LineNumber
          :display-id="displayId"></LineNumber>

        <div class="mb-3" ref="rValue">
          <component
              :is="this.$getValueComponent(messageDto.data)"
              :capsule-dto="messageDto.data"></component>
        </div>

        <RowExtensions
            :is-local-data="isLocalData"
            :created-at="messageDto?.__createdAt"
           @saveToLocalStorage="saveToLocalStorage"
           @toggleBacktrace="toggleBacktrace"
           @copyImage="copyImage"
           @copyJson="copyJson"
           @copyAssocArray="copyAssocArray">
          <template v-slot:languageVersion>
            <span>{{ messageDto.language.toLowerCase() }} {{ messageDto.version }}</span>
          </template>
        </RowExtensions>
      </div>

      <ThrowableValue
        v-else-if="messageDto.type === 'throwable'"
        :message-dto="messageDto">
        <RowExtensions
          :is-local-data="isLocalData"
          :created-at="messageDto?.__createdAt"
           @saveToLocalStorage="saveToLocalStorage"
           @toggleBacktrace="toggleBacktrace"
           @copyImage="copyImage"
           @copyJson="copyJson"
           @copyAssocArray="copyAssocArray">
          <template v-slot:languageVersion>
            <span>{{ messageDto.language.toLowerCase() }} {{ messageDto.version }}</span>
          </template>
        </RowExtensions>
      </ThrowableValue>

      <HttpValue
        v-else-if="messageDto.type === 'http.request'"
        :message-dto="messageDto"
        :display-id="displayId">
      </HttpValue>

      <SqlValue
        v-else-if="messageDto.type === 'sql.model'"
        :message-dto="messageDto"
        :display-id="displayId">
      </SqlValue>

      <div v-if="showBacktrace">
        <BackTrace
          :backtrace="this.messageDto.trace"
          :focus-file="focusFile()">
        </BackTrace>
      </div>
    </div>
  </div>

  <UsageValue
      v-else-if="messageDto.type === 'log.usage'"
      @removeItem="removeItem(id)"
      :message-dto="this.messageDto">
  </UsageValue>

  <NoteValue
      v-else-if="messageDto.type === 'log.note'"
     :class="this.$emit('getColumnSize')"
     @removeItem="removeItem(id)"
     :messageDto="this.messageDto">
  </NoteValue>
</template>

<script>
import TimeAgo from "@/components/dump/rows/TimeAgo.vue";
import LineCircle from "@/components/dump/rows/LineCircle.vue";
import LanguageVersion from "@/components/dump/rows/LanguageVersion.vue";

import ArrayValue from "@/components/dump/values/ArrayValue.vue";
import ScalarValue from "@/components/dump/values/ScalarValue.vue";
import StdClassValue from "@/components/dump/values/StdClassValue.vue";

import BackTrace from "@/components/dump/rows/BackTrace.vue";
import NoteValue from "@/components/dump/values/NoteValue.vue";
import {inject, ref, toRaw} from "vue";
import RowExtensions from "@/components/dump/RowExtensions.vue";
import html2canvas from "html2canvas";
import UsageValue from "@/components/dump/values/UsageValue.vue";
import ThrowableValue from "@/components/dump/values/ThrowableValue.vue";
import copyJson from "@/utilities/copy_json";
import clipboardFromString from "@/utilities/clipboard";
import copyAssoc from "@/utilities/copy_assoc";
import HttpValue from "@/components/dump/values/HttpValue.vue";
import SqlValue from "@/components/dump/values/SqlValue.vue";
import LineNumber from "@/components/fragments/LineNumber.vue";

export default {
  components: {
    LineNumber,
    SqlValue,
    HttpValue,
    ThrowableValue,
    UsageValue,
    RowExtensions,
    NoteValue,
    BackTrace,
    LanguageVersion,
    LineCircle,
    TimeAgo,
    ArrayValue,
    ScalarValue,
    StdClassValue
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
  setup() {
    const storageName = inject('storageName') || 'logs'
    const showBacktrace = ref(false)

    const createdAt = new Date()

    return {
      storageName,
      showBacktrace,
      createdAt,
    }
  },
  methods: {
    toggleBacktrace() {
      this.showBacktrace = !this.showBacktrace;
    },
    saveToLocalStorage() {
      const logs = JSON.parse(localStorage.getItem(this.storageName)) || []

      logs.push({
        ...toRaw(this.messageDto),
        __createdAt: this.createdAt,
      })

      localStorage.setItem(this.storageName, JSON.stringify(logs))

      this.$emit('showBalloon', 'Saved to local storage')
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
      clipboardFromString([clipboardItem])
    },
    copyJson() {
      const result = copyJson(this.messageDto.data)

      clipboardFromString(
        JSON.stringify(result, null, 2),
        () => this.$emit('showBalloon', 'Copied Json'),
      )
    },
    copyAssocArray() {
      const result = copyAssoc(this.messageDto.data)

      clipboardFromString(result, () => this.$emit('showBalloon', 'Copied Assoc'))
    }
  },
}
</script>
