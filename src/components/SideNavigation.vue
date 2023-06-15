<template>
  <aside class="flex flex-col w-[50px] bg-blue-500 border-r-[1px] border-blue-600 py-5 px-1.5 items-center justify-center">
    <div class="flex flex-col w-full space-y-3.5">
      <button
        class="nav-button"
        :class="{ 'active': selectedContainer === 'logContainer' }"
        @click="emitSelectContainer('logContainer')">
        <fa-icon icon="code" class="text-sm"></fa-icon>
      </button>

      <button
        class="nav-button"
        :class="{ 'active': selectedContainer === 'throwableContainer' }"
        @click="emitSelectContainer('throwableContainer')">
        <fa-icon icon="bug" class="text-sm"></fa-icon>
      </button>
    </div>

    <div class="mt-auto">
      <button @click="emitClearLog">
        <fa-icon icon="trash-can" class="text-white"></fa-icon>
      </button>
    </div>
  </aside>
</template>

<script>
export default {
  name: "SideNavigation",
  components: {},
  props: {
    selectedContainer: {
      type: String,
      required: true,
    },
  },
  data() {
    return {}
  },
  methods: {
    emitClearLog() {
      this.$emit("clearLog")
    },
    emitSelectContainer(container) {
      this.$emit("selectContainer", container)
    },
  },
  computed: {},
}
</script>
