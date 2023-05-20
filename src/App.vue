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

</style>
