<template>
  <span class="--header array">Array ({{ getArrayCount }}) [</span>

  <div class="relative flex flex-col">
    <div class="pl-[1.5rem]"
         v-for="(value, key) in capsuleDto.value"
         :key="key">

      <span class="h-fit">
        <ScalarValue :capsule-dto="convertArrayKeyToCapsuleDto(key)"></ScalarValue>
      </span>

      <span class="h-fit mx-1.5">=></span>

      <component :is="this.$getValueComponent(value)" :capsule-dto="value"></component>
    </div>

    <div class="--tail array">]</div>
  </div>
</template>

<script>
import ScalarValue from "@/components/dump/values/ScalarValue.vue";
import StdClassValue from "@/components/dump/values/StdClassValue.vue";

export default {
  name: 'ArrayValue',
  components: {
    ScalarValue,
    StdClassValue
  },
  props: {
    capsuleDto: {
      type: Object,
      required: true
    }
  },
  methods: {
    convertArrayKeyToCapsuleDto(arrayKey) {
      return {
        "type": typeof arrayKey,
        "isScalarType": true,
        "namespace": null,
        "className": null,
        "value": arrayKey
      }
    },
  },
  computed: {
    getArrayCount() {
      return Object.keys(this.capsuleDto.value).length;
    }
  }
}
</script>
