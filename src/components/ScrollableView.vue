<template>
  <section class="flex flex-col">
    <component v-for="(object, key) in logs"
               :key="key"
               :is="getDataComponent(object)"
               :id="key"
               :data="object">
    </component>
  </section>
</template>

<script>
import ScalarDump from '@/components/dump/ScalarDump.vue'
import '@/assets/style/badge.scss'

export default {
  name: "ScrollableView",
  components: {
    ScalarDump
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
  },
  methods: {
    getDataComponent(data) {
      return data?.isScalarType ? 'ScalarDump' : undefined
    }
  }
}
</script>
