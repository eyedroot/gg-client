<template>
  <section class="w-full full overflow-x-hidden overflow-y-scroll bg-gray-50 p-0.5 py-1" ref="scrollable">
    <ScrollableOptions
      :options="options"
      :scroll-y="scrollY"
      :load-from-local-storage="loadFromLocalStorage"
      @update:options="handleOptions"
      @clearLogs="handleClearLogs"></ScrollableOptions>

    <div v-if="logs.length" class="flex flex-wrap" :class="{'flex-col-reverse': options.reverse}">
      <template v-for="(messageDto, key) in logs">

        <DataRow :class="getColumnSize()"
                 v-if="isLogMessage(messageDto)"
                 :key="`log-${key}`"
                 :id="key"
                 :display-id="getDisplayId(key)"
                 :messageDto="messageDto"
                 :removeItem="removeItem"
                 :load-from-local-storage="loadFromLocalStorage"
                 @getColumnSize="getColumnSize">
        </DataRow>

        <ThrowableRow :class="getColumnSize()"
                      v-if="isThrowableMessage(messageDto)"
                      :key="`throwable-${key}`"
                      :id="key"
                      :display-id="getDisplayId(key)"
                      :messageDto="messageDto"
                      :load-from-local-storage="loadFromLocalStorage"
                      :removeItem="removeItem">
        </ThrowableRow>
      </template>
    </div>

    <HelloDocument v-else></HelloDocument>
  </section>
</template>

<script>
import DataRow from "@/components/dump/DataRow.vue";
import HelloDocument from "@/components/HelloDocument.vue";
import ThrowableRow from "@/components/dump/ThrowableRow.vue";
import ScrollableOptions from "@/components/ScrollableOptions.vue";
import {inject} from "vue";

export default {
  name: "ScrollableView",
  components: {
    ScrollableOptions,
    ThrowableRow,
    HelloDocument,
    DataRow
  },
  setup() {
    const storageName = inject('storageName') || 'logs'

    return {
      storageName
    }
  },
  props: {
    data: {
      type: Object,
      required: false,
    },
    loadFromLocalStorage: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      logs: [],
      options: {
        grid: 1, // 1, 2, 3
        reverse: false,
      },
      scrollY: 0,
    }
  },
  watch: {
    data: function (newData) {
      this.logs.push(newData)

      // DOM 업데이트가 완료된 후에 스크롤 위치를 업데이트
      this.$nextTick(() => {
        if (this.options.reverse === false) {
          this.scrollToBottom()
        } else {
          this.scrollToTop()
        }
      })
    },
  },
  methods: {
    handleOptions(options) {
      // reverse 환경에서는 grid 옵션을 1로 고정
      if (options.reverse) {
        options.grid = 1
      }

      this.options = options

      if (this.options.reverse === false) {
        this.scrollToBottom()
      } else {
        this.scrollToTop()
      }
    },
    getColumnSize() {
      return {
        'w-full': this.options.grid === 1,
        'w-1/2': this.options.grid === 2,
        'w-1/3': this.options.grid === 3
      }
    },
    handleClearLogs() {
      this.logs = []
    },
    getDisplayId(key) {
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
    scrollToTop() {
      const scrollable = this.$refs.scrollable;

      if (scrollable) {
        scrollable.scrollTop = 0;
      }
    },
    removeItem(id) {
      this.logs.splice(id, 1)

      if (this.loadFromLocalStorage) {
        localStorage.setItem(this.storageName, JSON.stringify(this.logs))
      }
    },
    updateScrollY() {
      this.scrollY = this.$refs.scrollable.scrollTop;
    },
    loadLogsFromLocalStorage() {
      const logs = localStorage.getItem(this.storageName) || '[]'
      this.logs = JSON.parse(logs)
    }
  },
  mounted() {
    this.$refs.scrollable.addEventListener('scroll', this.updateScrollY)

    if (this.loadFromLocalStorage) {
      this.loadLogsFromLocalStorage()
    }
  }
}
</script>
