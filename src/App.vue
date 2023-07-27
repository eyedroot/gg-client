<template>
  <div class="h-full flex flex-row relative" :class="{ 'dark': isDarkMode }">
    <SideNavigation
      :selectedContainer="currentContainer"
      :notice-count="noticeCount"
      @selectContainer="handleSelectContainer"
      @toggleDarkMode="toggleDarkMode"></SideNavigation>

    <ScrollableView
      ref="logContainer"
      v-show="currentContainer === 'logContainer'"
      :data="mediator.logContainer"></ScrollableView>

    <ScrollableView
      ref="throwableContainer"
      v-show="currentContainer === 'throwableContainer'"
      :data="mediator.throwableContainer"></ScrollableView>

    <ScrollableView
      ref="shiftContainer"
      :is-local-data="true"
      :current-container="currentContainer"
      v-show="currentContainer === 'shiftContainer'">
    </ScrollableView>

    <NewVersion v-if="meta !== undefined" :meta="meta"></NewVersion>
  </div>
</template>

<script>
import SideNavigation from "@/components/SideNavigation.vue"
import ScrollableView from "@/components/ScrollableView.vue"
import NewVersion from "@/components/fragments/NewVersion.vue"
import http from "@/utilities/http"

import {ipcRenderer} from "electron"
import {inject, reactive, ref} from "vue";

export default {
  name: "App",
  components: {
    SideNavigation,
    ScrollableView,
    NewVersion,
  },
  setup() {
    const logMediator = reactive({})
    const mediator = reactive({
      logContainer: [],
      throwableContainer: [],
    })
    const currentContainer = ref('logContainer')
    const noticeCount = reactive({
      logContainer: 0,
      throwableContainer: 0,
    })
    const meta = ref(undefined)

    const isDarkMode = inject('isDarkMode')

    const isDataListening = inject('isDataListening')

    return {
      logMediator,
      mediator,
      currentContainer, // logContainer or throwableContainer or shiftContainer
      noticeCount,
      meta,
      isDarkMode,
      isDataListening,
    }
  },
  watch: {
    currentContainer: function (selectContainer) {
      if (selectContainer === 'logContainer') {
        this.noticeCount.logContainer = 0
      } else {
        this.noticeCount.throwableContainer = 0
      }
    },
  },
  methods: {
    handleSelectContainer(container) {
      this.currentContainer = container
    },
    handleKeydown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === '1') {
        this.currentContainer = 'logContainer'
      }

      if ((e.metaKey || e.ctrlKey) && e.key === '2') {
        this.currentContainer = 'throwableContainer'
      }

      if ((e.metaKey || e.ctrlKey) && e.key === '3') {
        this.currentContainer = 'shiftContainer'
      }
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
    },
    getMeta() {
      http.get('/v1/meta/version').then(response => {
        this.meta = response.data.data

        const packageJson = require('../package.json')
        this.meta.clientVersion = packageJson.version

        this.setDocumentTitle(this.meta.clientVersion)
      })
    },
    setDocumentTitle(clientVersion) {
      document.title = `GG Client v${clientVersion}`
    },
  },
  mounted() {
    this.getMeta()

    setInterval(this.getMeta, 1000 * 60 * 60)

    window.addEventListener('keydown', this.handleKeydown)

    ipcRenderer.on("gg", (event, message) => {
      if (! this.isDataListening) {
        return
      }

      const logItems = message.filter(item => item.type.startsWith('log'))
      const throwableItems = message.filter(item => item.type === 'throwable')

      if (throwableItems.length > 0) {
        this.mediator.throwableContainer = throwableItems

        if (this.currentContainer !== 'throwableContainer') {
          this.noticeCount.throwableContainer += throwableItems.length
        }
      }

      if (logItems.length > 0) {
        this.mediator.logContainer = logItems

        if (this.currentContainer !== 'logContainer') {
          this.noticeCount.logContainer += logItems.length
        }
      }
    })
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeydown)
  },
}
</script>
