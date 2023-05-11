<template>
  <div class="relative">
    <div class="--header stdclass">{{ getStdClassName }} {</div>
    <div class="--tail stdclass">}</div>
  </div>
</template>

<script>
export default {
  name: 'StdClassValue',
  props: {
    capsuleDto: {
      type: Object,
      required: true
    }
  },
  computed: {
    getStdClassName() {
      return this.capsuleDto.className
    }
  },
  mounted() {
    console.log(this.capsuleDto)
  }
}
</script>
