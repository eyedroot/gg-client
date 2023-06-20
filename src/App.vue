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
      :load-from-local-storage="true"
      v-if="currentContainer === 'shiftContainer'">
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
        logContainer: {},
        throwableContainer: {},
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
      if (message.messageType === 'throwable') {
        this.mediator.throwableContainer = message

        if (this.currentContainer !== 'throwableContainer') {
          this.noticeCount.throwableContainer += 1
        }
      } else {
        this.mediator.logContainer = message

        if (this.currentContainer !== 'logContainer') {
          this.noticeCount.logContainer += 1
        }
      }
    })
  },
}
</script>
