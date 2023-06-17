<template>
  <section v-if="logs.length"
    class="w-full full overflow-y-scroll" ref="scrollable">
    <ScrollableOptions :options="options" @update:options="handleOptions"></ScrollableOptions>

    <div class="grid gap-3 p-2.5 pt-[33px]" :class="getGridColumns()">
      <template v-for="(messageDto, key) in logs">
        <DataRow
          v-if="isLogMessage(messageDto)"
          :key="`log-${key}`"
          :id="getKeyId(key)"
          :messageDto="messageDto"
          :removeItem="removeItem">
        </DataRow>

        <ThrowableRow
          v-else-if="isThrowableMessage(messageDto)"
          :key="`throwable-${key}`"
          :id="getKeyId(key)"
          :messageDto="messageDto"
          :removeItem="removeItem">
        </ThrowableRow>
      </template>
    </div>
  </section>

  <HelloDocument v-else></HelloDocument>
</template>

<script>
import DataRow from "@/components/dump/DataRow.vue";
import HelloDocument from "@/components/HelloDocument.vue";
import ThrowableRow from "@/components/dump/ThrowableRow.vue";
import ScrollableOptions from "@/components/ScrollableOptions.vue";

export default {
  name: "ScrollableView",
  components: {
    ScrollableOptions,
    ThrowableRow,
    HelloDocument,
    DataRow
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      logs: [],
      options: {
        grid: 1, // 1, 2, 3
        reverse: false,
      },
    }
  },
  watch: {
    data: function (newData) {
      this.logs.push(newData)

      // DOM 업데이트가 완료된 후에 스크롤 위치를 업데이트
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    },
  },
  methods: {
    handleOptions(options) {
      if (this.options.reverse !== options.reverse) {
        this.logs.reverse()
        console.log(this.logs)
      }

      this.options = options
    },
    getGridColumns() {
      return {
        'grid-cols-1': this.options.grid === 1,
        'grid-cols-2': this.options.grid === 2,
        'grid-cols-3': this.options.grid === 3
      }
    },
    getKeyId(key) {
      return this.options.reverse ? this.logs.length - key : key + 1
    },
    isLogMessage(messageDto) {
      return messageDto.messageType === 'log' || messageDto.messageType === 'log.space'
    },
    isThrowableMessage(messageDto) {
      return messageDto.messageType === 'throwable'
    },
    scrollToBottom() {
      const scrollable = this.$refs.scrollable;

      if (scrollable) {
        scrollable.scrollTop = scrollable.scrollHeight - scrollable.clientHeight;
      }
    },
    removeItem(id) {
      this.logs.splice(id, 1)
    },
  },
  mounted() {
    this.scrollToBottom()
  },
}
</script>
