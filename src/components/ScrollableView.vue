<template>
  <section>
    <component v-for="(value, key) in logs"
               :key="key"
               :is="guessDumpComponent(value)"
               :data="value">
    </component>
  </section>
</template>

<script>
import ScalarDump from '@/components/dump/ScalarDump.vue'

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
      console.log(newValue)
      this.logs.push(newValue)
    }
  },
  methods: {
    guessDumpComponent(data) {
      console.log('guessDumpComponent', data)

      return data?.isScalarType ? 'ScalarDump' : 'ScalarDump'
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  @apply flex flex-col h-full;
}
</style>
