<template>
  <div class="flex border-b-[1px] border-gray-200 w-full py-10 justify-center">
    <span class="value">{{ messageDto.data.value }}</span>
  </div>
</template>

<script>
export default {
  name: "DividerValue",
  components: {},
  props: {
    messageDto: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
  },
  methods: {},
  computed: {},
}
</script>

<style lang="scss">
.value {
  @apply text-sm inline-flex;
  &::before, &::after {
    content: "\"";
    @apply mx-0.5 text-gray-300
  }
}
</style>
