<template>
  <aside class="flex flex-col w-[45px] bg-gray-200 border-r-[1px] border-gray-300 py-5 px-1.5 items-center justify-center select-none">
    <div class="flex flex-col w-full space-y-3.5">
      <span class="inline-flex">
        <AnchorText href="https://phpgg.kr">
          <img src="/assets/image/icons/logo.png" alt="PHPgg">
        </AnchorText>
      </span>

      <span class="relative inline-flex">
        <SideNavigationBalloon :notice-count="noticeCount.logContainer"></SideNavigationBalloon>

        <button class="nav-button"
          :class="{ 'active': selectedContainer === 'logContainer' }"
          @click="emitSelectContainer('logContainer')">
          <fa-icon icon="code" class="text-sm"></fa-icon>
        </button>
      </span>

      <span class="relative inline-flex">
        <SideNavigationBalloon :notice-count="noticeCount.throwableContainer"></SideNavigationBalloon>

        <button class="nav-button"
          :class="{ 'active': selectedContainer === 'throwableContainer' }"
          @click="emitSelectContainer('throwableContainer')">
          <fa-icon icon="bug" class="text-sm"></fa-icon>
        </button>
      </span>

      <span class="relative inline-flex">
        <button class="nav-button"
                :class="{ 'active': selectedContainer === 'shiftContainer' }"
                @click="emitSelectContainer('shiftContainer')">
          <fa-icon icon="floppy-disk" class="text-sm"></fa-icon>
        </button>
      </span>
    </div>

    <div class="relative mt-auto">
      <button
        @mouseover="showZoomLayer = true"
        @mouseleave="showZoomLayer = false"
        class="nav-button hover:opacity-100" @click="handleZoomInOut(true)">
        <fa-icon icon="magnifying-glass-plus" class="text-sm"></fa-icon>
      </button>

      <button
        @mouseover="showZoomLayer = true"
        @mouseleave="showZoomLayer = false"
        class="nav-button hover:opacity-100" @click="handleZoomInOut(false)">
        <fa-icon icon="magnifying-glass-minus" class="text-sm"></fa-icon>
      </button>

      <div v-if="showZoomLayer"
        class="absolute bottom-4 -right-[60px] inline-flex bg-gray-900 rounded-xl text-white font-bold items-center justify-center p-2.5 z-50 shadow-sm opacity-80">
        <span>{{ (currentZoomFactor * 100).toFixed(0) }}%</span>
      </div>
    </div>
  </aside>
</template>

<script>
import SideNavigationBalloon from "@/components/SideNavigationBalloon.vue";

import { webFrame } from "electron";
import AnchorText from "@/components/fragments/AnchorShell.vue";

export default {
  name: "SideNavigation",
  components: {
    AnchorText,
    SideNavigationBalloon
  },
  props: {
    selectedContainer: {
      type: String,
      required: true,
    },
    noticeCount: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      showZoomLayer: false,
      currentZoomFactor: webFrame.getZoomFactor(),
    }
  },
  methods: {
    emitSelectContainer(container) {
      this.$emit("selectContainer", container)
    },
    handleZoomInOut(zoomIn = true) {
      let changeZoom = this.currentZoomFactor + (zoomIn ? 0.1 : -0.1);

      if (changeZoom > 1.5) {
        changeZoom = 1.5
      } else if (changeZoom < 1) {
        changeZoom = 1
      }

      this.currentZoomFactor = parseFloat(changeZoom.toFixed(1));

      webFrame.setZoomFactor(this.currentZoomFactor);
    },
  },
}
</script>
