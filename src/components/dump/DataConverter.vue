<template>
  <component :is="getComponentName" :capsule-dto="capsuleDto"></component>
</template>

<script>
import ScalarValue from "@/components/dump/datas/ScalarValue.vue";
import ArrayValue from "@/components/dump/datas/ArrayValue.vue";
import StdClassValue from "@/components/dump/datas/StdClassValue.vue";

export default {
  name: 'DataConverter',
  components: {
    ScalarValue,
    ArrayValue,
    StdClassValue
  },
  props: {
    capsuleDto: {
      type: Object,
      required: true
    },
  },
  computed: {
    getComponentName() {
      if (this.capsuleDto.isScalarType) {
        return 'ScalarValue'
      }

      return this.capsuleDto.type === 'array' ? 'ArrayValue' : 'StdClassValue'
    }
  }
}
</script>
