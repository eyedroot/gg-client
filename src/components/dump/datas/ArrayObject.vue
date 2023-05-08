<template>
  <div>
    <template v-if="isArray">
      <div class="--header array">Array:({{ getArrayCount }}) [</div>
      <div class="--tail array">]</div>
    </template>

    <template v-if="isStdClass">
      <div class="--header stdclass">{{ getStdClassName }} {</div>
      <div class="--tail stdclass">}</div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ArrayObject',
  props: {
    capsuleDto: {
      type: Object,
      required: true
    }
  },
  computed: {
    isArray() {
      return this.capsuleDto.type === 'array'
    },
    getArrayCount() {
      return Object.keys(this.capsuleDto.value).length;
    },
    isStdClass() {
      return this.capsuleDto.type === 'object'
    },
    getStdClassName() {
      return this.capsuleDto.className
    }
  },
  mounted() {
    console.log(this.capsuleDto)
  }
}
</script>
