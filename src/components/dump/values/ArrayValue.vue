<template>
  <span class="--header array">
    Array ({{ getKeysCount }}) <span class="brackets" :class="getBracketsIndex">[</span>

    <CollapsedTail v-if="isCollapsed"
                   type="array"
                   :bracket-index="getBracketsIndex">
    </CollapsedTail>
  </span>

  <div class="relative flex flex-col" :class="{ 'collapsed': isCollapsed }">
    <div class="pl-[1.5rem]"
         v-for="(value, key) in capsuleDto.value"
         :key="key">

      <span class="h-fit">
        <ScalarValue :capsule-dto="this.$convertKeyToCapsuleDto(key)"></ScalarValue>
      </span>

      <span class="h-fit mx-1.5">=></span>

      <component
        :is="this.$getValueComponent(value)"
        :capsule-dto="value"
        :depth="depth + 1">
      </component>
    </div>

    <div class="--tail array">
      <span class="brackets" :class="getBracketsIndex">]</span>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import CollapsedTail from "@/components/dump/values/CollapsedTail.vue";

export default {
  name: 'ArrayValue',
  components: {
    CollapsedTail,
    ScalarValue: defineAsyncComponent(() => import('@/components/dump/values/ScalarValue.vue')),
    StdClassValue: defineAsyncComponent(() => import('@/components/dump/values/StdClassValue.vue')),
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
  data() {
    return {
      collapsed: false,
    }
  },
  computed: {
    getKeysCount() {
      return Object.keys(this.capsuleDto.value).length;
    },
    getBracketsIndex() {
      return `brackets-${this.depth % 4}`;
    },
    isCollapsed() {
      return this.depth >= 2 && this.getKeysCount > 3;
    },
  },
}
</script>
