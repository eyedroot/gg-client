<template>
  <div>
    <template v-if="isScalarType">
      <scalar-value :value="capsuleDto.value"></scalar-value>
    </template>
    <template v-if="! isScalarType">
      <array-object :capsule-dto="capsuleDto"></array-object>
    </template>
  </div>
</template>

<script>
import ScalarValue from "@/components/dump/datas/ScalarValue.vue";
import ArrayObject from "@/components/dump/datas/ArrayObject.vue";

export default {
  name: 'DataConverter',
  components: {
    ScalarValue,
    ArrayObject
  },
  props: {
    capsuleDto: {
      type: Object,
      required: true
    }
  },
  computed: {
    isScalarType() {
      return this.capsuleDto.isScalarType;
    }
  }
}
</script>
