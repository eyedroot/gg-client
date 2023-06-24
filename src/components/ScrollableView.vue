<template>
  <section class="w-full full overflow-x-hidden overflow-y-scroll bg-gray-50 p-0.5 py-1" ref="scrollable">
    <ScrollableOptions
      :options="options"
      :scroll-y="scrollY"
      :load-from-local-storage="loadFromLocalStorage"
      @update:options="handleOptions"
      @clearLogs="handleClearLogs"></ScrollableOptions>

    <div class="fixed bottom-3 right-8 z-50">
      <SearchText v-if="searchContext.enabled"
                  ref="searchText"
                  :search-context="searchContext"
                  @findText="findText"
                  @saveTerm="saveTerm"
                  @closeSearch="searchContext.enabled = false"></SearchText>
    </div>

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
                 @getColumnSize="getColumnSize"
                 @copyToClipboard="copyToClipboard">
        </DataRow>

        <ThrowableRow :class="getColumnSize()"
                      v-if="isThrowableMessage(messageDto)"
                      :key="`throwable-${key}`"
                      :id="key"
                      :display-id="getDisplayId(key)"
                      :messageDto="messageDto"
                      :load-from-local-storage="loadFromLocalStorage"
                      :removeItem="removeItem"
                      @copyToClipboard="copyToClipboard">
        </ThrowableRow>
      </template>
    </div>

    <HelloDocument v-else></HelloDocument>
  </section>
</template>

<script>
import DataRow from "@/components/dump/DataRow.vue"
import HelloDocument from "@/components/HelloDocument.vue"
import ThrowableRow from "@/components/dump/ThrowableRow.vue"
import ScrollableOptions from "@/components/ScrollableOptions.vue"
import {inject} from "vue";
import {clipboard} from "electron"
import SearchText from "@/components/SearchText.vue";

export default {
  name: "ScrollableView",
  components: {
    SearchText,
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
    currentContainer: {
      type: String,
      required: false,
      default: '',
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
      searchContext: {
        enabled: false,
        lastTerm: '',
        lastSearched: '',
        foundCount: -1,
        currentIndex: -1,
      }
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

        if (this.searchContext.lastTerm.length > 0) {
          this.findText(this.searchContext.lastTerm, false)
        }
      })
    },
    currentContainer: function (newContainer) {
      if (newContainer === 'shiftContainer') {
        this.loadLogsFromLocalStorage()
      }
    }
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
    },
    copyToClipboard() {
      clipboard.writeText('')
    },
    handleKeydown(e) {
      if (e.key === 'Escape' && this.searchContext.enabled) {
        this.searchContext.enabled = false
      }

      if ((e.metaKey || e.ctrlKey) && e.key === 'f') {
        if (this.searchContext.enabled) {
          this.$refs.searchText.focusInput()
        } else {
          e.preventDefault()
          e.stopPropagation()
          this.searchContext.enabled = ! this.searchContext.enabled
        }
      }
    },
    saveTerm(term) {
      this.searchContext.lastTerm = term

      if (! term.length) {
        this.clearFoundText()
      }
    },
    clearFoundText() {
      this.searchContext.foundCount = -1
      this.searchContext.currentIndex = -1

      this.$refs.scrollable.querySelectorAll('.--found-text, .--found-cursor').forEach(element => {
        element.classList.remove('--found-text', '--found-cursor')
      })
    },
    findText(text, focus = true) {
      if (text !== this.searchContext.lastSearched) {
        this.clearFoundText()
      }

      const scrollableViewElement = this.$refs.scrollable
      const textNodes = this.getTextNodesIn(scrollableViewElement)
      const matchingNodes = textNodes.filter(node => node.textContent.includes(text))

      this.searchContext.foundCount = matchingNodes.length

      if (matchingNodes.length > 0) {
        matchingNodes.forEach(node => {
          node.parentElement.classList.add('--found-text')
        })

        if (focus) {
          let currentIndex = matchingNodes.findIndex(node => node.parentElement.classList.contains('--found-cursor'))

          // 현재 하이라이트된 요소가 없거나, 마지막 요소일 경우 첫 번째 요소로 순환합니다.
          if (currentIndex === -1 || currentIndex === matchingNodes.length - 1) {
            currentIndex = 0;
          } else {
            currentIndex += 1; // 다음 요소로 이동합니다.
          }

          this.searchContext.currentIndex = currentIndex

          matchingNodes[currentIndex].parentElement.scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'center'
          });

          const previousHighlightedElement = scrollableViewElement.querySelector('.--found-cursor');

          if (previousHighlightedElement) {
            previousHighlightedElement.classList.remove('--found-cursor');
          }

          matchingNodes[currentIndex].parentElement.classList.add('--found-cursor');
        }
      }

      this.searchContext.lastSearched = text
    },
    getTextNodesIn(element) {
      let textNodes = []

      for (let child of element.childNodes) {
        if (child.nodeType === Node.TEXT_NODE) {
          textNodes.push(child)
        } else {
          textNodes = [...textNodes, ...this.getTextNodesIn(child)]
        }
      }

      return textNodes
    }
  },
  mounted() {
    this.$refs.scrollable.addEventListener('scroll', this.updateScrollY)
    window.addEventListener('keydown', this.handleKeydown)

    if (this.loadFromLocalStorage) {
      this.loadLogsFromLocalStorage()
    }
  },
  beforeUnmount() {
    this.$refs.scrollable.removeEventListener('scroll', this.updateScrollY)
    window.removeEventListener('keydown', this.handleKeydown)
  }
}
</script>
