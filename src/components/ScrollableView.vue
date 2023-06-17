<template>
  <section
    v-if="logs.length"
    class="w-full full overflow-y-auto p-2.5" ref="scrollable">
    <div class="grid grid-cols-3 gap-3">
      <template v-for="(messageDto, key) in logs">
        <DataRow
          v-if="isLogMessage(messageDto)"
          :key="`log-${key}`"
          :id="key"
          :messageDto="messageDto"
          :removeItem="removeItem">
        </DataRow>

        <ThrowableRow
          v-else-if="isThrowableMessage(messageDto)"
          :key="`throwable-${key}`"
          :id="key"
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

export default {
  name: "ScrollableView",
  components: {
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
      logs: []
    }
  },
  watch: {
    data: function (newData) {
      this.logs.push(newData)

      // DOM 업데이트가 완료된 후에 스크롤 위치를 업데이트
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    }
  },
  methods: {
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
