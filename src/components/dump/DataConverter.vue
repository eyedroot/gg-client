<template>
  <div>
    <template v-if="isScalarType">
      <scalar-type :value="capsuleDto.value"></scalar-type>
    </template>
  </div>
</template>

<script>
import ScalarType from "@/components/dump/datas/ScalarType.vue";

export default {
  name: 'DataConverter',
  components: {ScalarType},
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
