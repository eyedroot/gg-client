<template>
  <span>{{ printScalarType }}</span>
</template>

<script>
export default {
  name: 'ScalarType',
  props: {
    data: {
      type: [String, Boolean, Object, Number, Array, Date, Symbol, Function],
      required: true
    }
  },
  computed: {
    printScalarType() {
      if (this.data === null) {
        return 'NULL'
      }

      return this.data
    }
  }
}
</script>
