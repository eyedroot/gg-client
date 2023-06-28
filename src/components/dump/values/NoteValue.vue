<template>
  <div class="flex relative px-0.5 pt-1 justify-center items-center">
    <button class="absolute top-3 right-2.5 z-20" @click="$emit('removeItem')">
      <fa-icon icon="xmark" class="text-gray-800"></fa-icon>
    </button>

    <div class="--code flex-1 py-2.5">
      <span class="inline-flex">{{ messageDto.data.value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoteValue",
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
