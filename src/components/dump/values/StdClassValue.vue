<template>
  <div class="--header stdclass">{{ getStdClassName }} {</div>

  <div class="relative flex flex-col">
    <div class="pl-[1.5rem]"
         v-for="(value, key) in capsuleDto.value"
         :key="key">

      <span class="h-fit">
        + <ScalarValue :capsule-dto="this.$convertKeyToCapsuleDto(key)"></ScalarValue>
      </span>

      <span class="h-fit mx-1.5">: </span>

      <component :is="this.$getValueComponent(value)" :capsule-dto="value"></component>
    </div>

    <div class="--tail array">}</div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'StdClassValue',
  components: {
    ScalarValue: defineAsyncComponent(() => import('@/components/dump/values/ScalarValue.vue')),
    ArrayValue: defineAsyncComponent(() => import('@/components/dump/values/ArrayValue.vue')),
  },
  props: {
    capsuleDto: {
      type: Object,
      required: true
    }
  },
  computed: {
    getStdClassName() {
      return this.capsuleDto.className
    },
    getKeysCount() {
      return Object.keys(this.capsuleDto.value).length;
    },
  },
}
</script>
