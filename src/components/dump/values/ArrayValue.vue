<template>
  <div class="relative flex flex-col">
    <div class="--header array">Array ({{ getArrayCount }}) [</div>

    <div class="flex flex-row space-x-1.5"
         v-for="(value, key) in capsuleDto.value"
         :key="key">
      <span class="h-fit">{{ key }}</span>
      <span class="h-fit">=></span>

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
  computed: {
    getArrayCount() {
      return Object.keys(this.capsuleDto.value).length;
    }
  }
}
</script>
