<template>
  <ScrollableView :data="mediator"></ScrollableView>
</template>

<script>
import ScrollableView from "@/components/ScrollableView.vue";
import { ipcRenderer } from "electron";

export default {
  name: "App",
  components: {
    ScrollableView
  },
  data() {
    return {
      mediator: {}
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  @apply h-full;
}
</style>
