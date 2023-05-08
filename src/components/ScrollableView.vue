<template>
  <section class="flex flex-col">
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
    }
  }
}
</script>
