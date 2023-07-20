<template>
  <div class="h-full flex flex-row relative">
    <SideNavigation
      :selectedContainer="currentContainer"
      :notice-count="noticeCount"
      @selectContainer="handleSelectContainer"></SideNavigation>

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

export default {
  name: "App",
  components: {
    SideNavigation,
    ScrollableView,
    NewVersion,
  },
  data() {
    return {
      logMediator: {},
      mediator: {
        logContainer: [],
        throwableContainer: [],
      },
      currentContainer: 'logContainer', // logContainer or throwableContainer or shiftContainer
      noticeCount: {
        logContainer: 0,
        throwableContainer: 0,
      },
      meta: undefined,
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
    getMeta() {
      http.get('/v1/meta/version').then(response => {
        this.meta = response.data.data

        const packageJson = require('../package.json')
        this.meta.clientVersion = packageJson.version
      })
    },
  },
  mounted() {
    this.getMeta()

    setInterval(this.getMeta, 1000 * 60 * 60)

    window.addEventListener('keydown', this.handleKeydown)

    ipcRenderer.on("gg", (event, message) => {
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
