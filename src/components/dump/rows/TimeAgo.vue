<template>
  <span class="text-[11px] tracking-tight text-gray-700">
    {{ timeAgo }}
  </span>
</template>

<script>
export default {
  name: 'TimeAgo',
  data() {
    return {
      timerId: null,
      createdDateTime: new Date(),
      now: new Date(),
    }
  },
  mounted() {
    this.timerId = setInterval(() => {
      this.now = new Date()
    }, 1000)
  },
  computed: {
    timeAgo() {
      const diff = Math.floor((this.now.getTime() - this.createdDateTime) / 1000)

      if (diff < 60) {
        return `${diff} seconds ago`
      } else if (diff < 3600) {
        return `${Math.floor(diff / 60)} minutes ago`
      } else if (diff < 86400) {
        return `${Math.floor(diff / 3600)} hours ago`
      } else {
        return `${Math.floor(diff / 86400)} days ago`
      }
    }
  },
  beforeUnmount() {
    clearInterval(this.timerId)
  }
}
</script>
