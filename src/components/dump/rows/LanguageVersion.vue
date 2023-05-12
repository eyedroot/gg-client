<template>
  <span class="badge !mr-0" :class="getLanguageColor">{{ language }}/{{ version }}</span>
</template>

<script>
export default {
  name: 'LanguageVersion',
  props: {
    language: {
      type: String,
      required: true
    },
    version: {
      type: String,
      required: true
    }
  },
  computed: {
    getLanguageColor() {
      return 'purple'
    }
  }
}
</script>

<style scoped lang="scss">

</style>
