<template>
  <div class="--code throwable">
    <div class="flex flex-row space-x-5">
      <span class="--title">Class</span>
      <span class="--value dark:text-gray-200">{{ messageDto.data.class }}</span>
    </div>
    <div class="flex flex-row space-x-5">
      <span class="--title">File</span>
      <span class="--value dark:text-gray-200">{{ messageDto.data.value.file }}:{{ messageDto.data.value.line }}</span>
    </div>
    <div class="flex flex-row space-x-5">
      <span class="--title">Message</span>
      <span class="--value text-orange-600 font-bold dark:text-orange-300">{{ messageDto.data.value.message }} (CODE: {{ messageDto.data.value.code }})</span>
    </div>

    <CodeViewer :focus-line="codeViewerFile.line" :source-code="codeViewerFile.sourceCode"></CodeViewer>

    <slot></slot>
  </div>
</template>

<script>
import CodeViewer from "@/components/dump/rows/CodeViewer.vue";
import {computed} from "vue";

export default {
  name: 'ThrowableValue',
  components: {CodeViewer},
  props: {
    messageDto: {
      type: Object,
      required: true
    },
  },
  setup(props) {
    const codeViewerFile = computed(() => {
      return props.messageDto.trace.find((trace) => trace.file === props.messageDto.data.value.file)
    })

    return {
      codeViewerFile,
    }
  }
}
</script>

<style scoped lang="scss">
.--title {
  @apply flex font-medium text-gray-500 uppercase tracking-wider w-20 justify-end py-1;
  @apply dark:text-gray-300;
}
.--value {
  @apply flex-1 py-1;
}
</style>
