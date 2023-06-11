<template>
  <div class="h-full flex flex-row">
    <SideNavigation
      :selectedContainer="currentContainer"
      @clearLog="handleClearLog"
      @selectContainer="handleSelectContainer"></SideNavigation>

    <ScrollableView
      v-show="currentContainer === 'logContainer'"
      ref="logContainer"
      :data="mediator"></ScrollableView>

    <ScrollableView
      v-show="currentContainer === 'throwableContainer'"
      ref="throwableContainer"
      :data="mediator"></ScrollableView>
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
      mediator: {},
      currentContainer: 'logContainer', // logContainer or throwableContainer
    }
  },
  methods: {
    handleClearLog() {
      this.$refs["logContainer"].logs = []
    },
    handleSelectContainer(container) {
      this.currentContainer = container
    },
  },
  mounted() {
    ipcRenderer.on("gg", (event, message) => {
      this.mediator = message
    })
  }
}
</script>

<style lang="scss">

</style>
