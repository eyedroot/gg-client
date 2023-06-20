<template>
  <div v-if="isVisibleState"
    class="absolute top-1.5 right-0 inline-flex items-center justify-center rounded-md bg-red-500 w-2 h-2 text-[9px] text-white opacity-100">
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
  },
  computed: {
    isVisibleState() {
      return this.noticeCount > 0
    },
    getNoticeCount() {
      return this.noticeCount > 99 ? '99+' : this.noticeCount
    }
  },
}
</script>
