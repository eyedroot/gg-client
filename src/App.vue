<template>
  <div class="h-full flex flex-row">
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
  </div>
</template>

<script>
import SideNavigation from "@/components/SideNavigation.vue";
import ScrollableView from "@/components/ScrollableView.vue";
import { ipcRenderer } from "electron";

export default {
  name: "App",
  components: {
    SideNavigation,
    ScrollableView,
  },
  data() {
    return {
      logMediator: {},
      mediator: {
        logContainer: [],
        throwableContainer: [],
      },
      currentContainer: 'logContainer', // logContainer or throwableContainer
      noticeCount: {
        logContainer: 0,
        throwableContainer: 0,
      }
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
  },
  mounted() {
    ipcRenderer.on("gg", (event, message) => {
      console.log(message)

      const logItems = message.filter(item => item.messageType.startsWith('log'))
      const throwableItems = message.filter(item => item.messageType === 'throwable')

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
}
</script>
