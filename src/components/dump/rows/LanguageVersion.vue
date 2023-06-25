<template>
  <span class="badge !mr-0" :class="getLanguageColor">{{ language }}/{{ version }}</span>
</template>

<script>
export default {
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
      return 'bg-violet-500 text-white border-[0px] border-violet-600'
    }
  }
}
</script>

<style scoped lang="scss">

</style>
