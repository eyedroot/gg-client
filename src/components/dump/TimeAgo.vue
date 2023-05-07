<template>
  <span class="text-[11px] tracking-tight text-gray-700">
    {{ getFromNow }}
  </span>
</template>

<script>
export default {
  name: 'TimeAgo',
  props: {
    now: {
      type: Date,
      default: () => new Date(),
      required: false
    }
  },
  computed: {
    getFromNow() {
      return this.$dayjs(this.now).fromNow()
    }
  }
}
</script>
