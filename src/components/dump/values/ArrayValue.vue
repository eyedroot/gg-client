<template>
  <span class="--header array">Array ({{ getKeysCount }}) [</span>

  <div class="relative flex flex-col">
    <div class="pl-[1.5rem]"
         v-for="(value, key) in capsuleDto.value"
         :key="key">

      <span class="h-fit">
        <ScalarValue :capsule-dto="this.$convertKeyToCapsuleDto(key)"></ScalarValue>
      </span>

      <span class="h-fit mx-1.5">=></span>

      <component :is="this.$getValueComponent(value)" :capsule-dto="value"></component>
    </div>

    <div class="--tail array">]</div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'ArrayValue',
  components: {
    ScalarValue: defineAsyncComponent(() => import('@/components/dump/values/ScalarValue.vue')),
    StdClassValue: defineAsyncComponent(() => import('@/components/dump/values/StdClassValue.vue')),
  },
  props: {
    capsuleDto: {
      type: Object,
      required: true
    }
  },
  computed: {
    getKeysCount() {
      return Object.keys(this.capsuleDto.value).length;
    }
  },
}
</script>
