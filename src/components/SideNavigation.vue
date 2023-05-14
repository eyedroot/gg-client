<template>
  <aside class="flex flex-col w-[65px] bg-blue-500 border-r-2 border-blue-600 py-5 px-2.5 items-center justify-center">
    <button class="flex items-center justify-center rounded bg-blue-600 w-full h-[40px] border-2 border-blue-700">
      <fa-icon icon="code" class="text-white"></fa-icon>
    </button>

    <div class="mt-auto">
      <button @click="emitClearLog">
        <fa-icon icon="trash-can" class="text-white text-lg"></fa-icon>
      </button>
    </div>
  </aside>
</template>

<script>
export default {
  name: "SideNavigation",
  components: {},
  data() {
    return {}
  },
  methods: {
    emitClearLog() {
      this.$emit("clear-log")
    }
  },
  computed: {},
}
</script>
