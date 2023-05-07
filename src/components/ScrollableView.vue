<template>
  <section class="flex flex-col">
    <data-row v-for="(messageDto, key) in logs"
               :key="key"
               :id="key"
               :messageDto="messageDto">
    </data-row>
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
      console.log(newData)

      this.logs.push(newData)
    }
  }
}
</script>
