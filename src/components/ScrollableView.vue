<template>
  <section class="flex flex-col">
    <data-row v-for="(object, key) in logs"
               :key="key"
               :id="key"
               :data="object">
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
    data: function (newValue) {
      this.logs.push(newValue)
    }
  }
}
</script>
