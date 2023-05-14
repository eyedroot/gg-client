<template>
  <div class="--header stdclass">
    {{ getStdClassName }} <span class="brackets" :class="getBracketsIndex">{</span>
  </div>

  <div class="relative flex flex-col">
    <div class="pl-[1.5rem]"
         v-for="(value, key) in capsuleDto.value"
         :key="key">

      <span class="h-fit">
        <span class="text-blue-500">+</span>
        <ScalarValue :capsule-dto="this.$convertKeyToCapsuleDto(key)"></ScalarValue>
      </span>

      <span class="h-fit mr-1.5">:</span>

      <component
        :is="this.$getValueComponent(value)"
        :capsule-dto="value"
        :depth="depth + 1">
      </component>
    </div>

    <div class="--tail array">
      <span class="brackets" :class="getBracketsIndex">}</span>
    </div>
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
    depth: {
      type: Number,
      default: 0,
      required: false,
    },
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
    getBracketsIndex() {
      return `brackets-${this.depth % 4}`;
    },
  },
}
</script>
