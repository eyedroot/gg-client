<template>
  <aside class="flex flex-col w-[45px] bg-gray-200 border-r-[1px] border-gray-300 py-5 px-1.5 items-center justify-center">
    <div class="flex flex-col w-full space-y-3.5">
      <span class="relative inline-flex">
        <SideNavigationBalloon :notice-count="noticeCount.logContainer"></SideNavigationBalloon>

        <button
          class="nav-button"
          :class="{ 'active': selectedContainer === 'logContainer' }"
          @click="emitSelectContainer('logContainer')">
          <fa-icon icon="code" class="text-sm"></fa-icon>
        </button>
      </span>

      <span class="relative inline-flex">
        <SideNavigationBalloon :notice-count="noticeCount.throwableContainer"></SideNavigationBalloon>

        <button
          class="nav-button"
          :class="{ 'active': selectedContainer === 'throwableContainer' }"
          @click="emitSelectContainer('throwableContainer')">
          <fa-icon icon="bug" class="text-sm"></fa-icon>
        </button>
      </span>
    </div>

    <div class="mt-auto">

    </div>
  </aside>
</template>

<script>
import SideNavigationBalloon from "@/components/SideNavigationBalloon.vue";

export default {
  name: "SideNavigation",
  components: {SideNavigationBalloon},
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
    return {}
  },
  methods: {
    emitSelectContainer(container) {
      this.$emit("selectContainer", container)
    },
  },
  computed: {},
}
</script>
