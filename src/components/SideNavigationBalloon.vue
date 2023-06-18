<template>
  <div class="absolute top-1.5 right-0 inline-flex items-center justify-center rounded-md bg-red-500 w-2 h-2 text-[9px] text-white opacity-100"
    :class="showNotice()">
    <span class="hidden">{{ getNoticeCount }}</span>
  </div>
</template>

<script>
export default {
  name: "SideNavigationBalloon",
  components: {},
  props: {
    noticeCount: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {}
  },
  methods: {
    showNotice() {
      return {
        'opacity-100': this.noticeCount > 0,
        'opacity-0': this.noticeCount === 0,
      }
    },
  },
  computed: {
    getNoticeCount() {
      return this.noticeCount > 99 ? '99+' : this.noticeCount
    }
  },
}
</script>
