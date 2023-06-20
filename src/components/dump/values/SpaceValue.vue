<template>
  <div class="flex border-b-[1px] border-gray-200 py-5 justify-center items-center">
    <span class="inline-flex">{{ messageDto.data.value }}</span>
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
