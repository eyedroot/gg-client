<template>
  <section class="flex flex-col">
    <data-printer v-for="(object, key) in logs"
               :key="key"
               :id="key"
               :data="object">
    </data-printer>
  </section>
</template>

<script>
import '@/assets/style/badge.scss'
import DataPrinter from "@/components/dump/DataPrinter.vue";

export default {
  name: "ScrollableView",
  components: {
    DataPrinter
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
    data: function (newValue) {
      this.logs.push(newValue)
    }
  }
}
</script>
