<template>
  <div class="h-full flex flex-row">
    <SideNavigation
      :selectedContainer="currentContainer"
      @clearLog="handleClearLog"
      @selectContainer="handleSelectContainer"></SideNavigation>

    <ScrollableView
      v-show="currentContainer === 'logContainer'"
      ref="logContainer"
      :data="logMediator"></ScrollableView>

    <ScrollableView
      v-show="currentContainer === 'throwableContainer'"
      ref="throwableContainer"
      :data="throwableMediator"></ScrollableView>
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
      throwableMediator: {},
      currentContainer: 'logContainer', // logContainer or throwableContainer
    }
  },
  methods: {
    handleClearLog() {
      this.$refs[this.currentContainer].logs = []
    },
    handleSelectContainer(container) {
      this.currentContainer = container
    },
  },
  mounted() {
    ipcRenderer.on("gg", (event, message) => {
      console.log(message)

      if (message.messageType === 'throwable') {
        this.throwableMediator = message
      } else {
        this.logMediator = message
      }
    })
  },
}
</script>

<style lang="scss">

</style>
