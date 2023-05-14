<template>
  <div class="h-full flex flex-row">
    <SideNavigation @clear-log="handleClearLog"></SideNavigation>
    <ScrollableView ref="scrollable-view" :data="mediator"></ScrollableView>
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
      mediator: {}
    }
  },
  methods: {
    handleClearLog() {
      this.$refs["scrollable-view"].logs = []
    }
  },
  mounted() {
    ipcRenderer.on("gg", (event, message) => {
      this.mediator = message
    })
  }
}
</script>

<style lang="scss">
html, body {
  @apply h-full;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 12px;
  @apply h-full bg-white;
}
</style>
