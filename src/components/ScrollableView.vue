<template>
  <section class="flex flex-col h-full overflow-y-scroll" ref="scrollable">
    <DataRow v-for="(messageDto, key) in logs"
               :key="key"
               :id="key"
               :messageDto="messageDto">
    </DataRow>
  </section>
</template>

<script>
import '@/assets/style/badge.scss'
import DataRow from "@/components/dump/DataRow.vue";

export default {
  name: "ScrollableView",
  components: {
    DataRow
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      logs: []
    }
  },
  watch: {
    data: function (newData) {
      this.logs.push(newData)

      // DOM 업데이트가 완료된 후에 스크롤 위치를 업데이트
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    }
  },
  methods: {
    scrollToBottom() {
      const scrollable = this.$refs.scrollable;

      if (scrollable) {
        scrollable.scrollTop = scrollable.scrollHeight - scrollable.clientHeight;
      }
    },
  },
  mounted() {
    this.scrollToBottom()
  },
}
</script>
