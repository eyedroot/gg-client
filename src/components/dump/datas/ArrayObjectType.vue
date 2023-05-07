<template>
  <div></div>
</template>

<script>
export default {
  name: 'ArrayObjectType',
  props: {
    type: {
      type: String,
      required: true
    },
    data: {
      type: [Object, Array],
      required: true
    }
  },
  mounted() {
    console.log(this.data)
  }
}
</script>
