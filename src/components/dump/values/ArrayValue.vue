<template>
  <span class="--header array">
    <span class="text-purple-900 font-bold">Array:{{ getKeysCount }}</span> <span class="brackets" :class="getBracketsIndex">[</span>

    <CodeFolding
      v-if="isCodeFolded"
      type="array"
      :bracket-index="getBracketsIndex"
      @handleCollapsed="toggleCollapsed">
    </CodeFolding>
  </span>

  <div class="relative flex flex-col" :class="{ 'collapsed': isCodeFolded }">
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
        :depth="depth + 1"
        :force-open-folding="forceOpenFolding">
      </component>
    </div>

    <div class="--tail array">
      <span class="brackets" :class="getBracketsIndex">]</span>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import CodeFolding from "@/components/dump/values/CodeFoldingTail.vue";

export default {
  name: 'ArrayValue',
  components: {
    CodeFolding,
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
    },
    forceOpenFolding: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  data() {
    return {
      shouldBeCodeFolding: false,
    }
  },
  methods: {
    toggleCollapsed() {
      this.shouldBeCodeFolding = !this.shouldBeCodeFolding;
    },
  },
  computed: {
    getKeysCount() {
      return Object.keys(this.capsuleDto.value).length;
    },
    getBracketsIndex() {
      return `brackets-${this.depth % 4}`;
    },
    isCodeFolded() {
      if (this.forceOpenFolding) {
        return false
      }

      if (this.shouldBeCodeFolding) {
        return false;
      }

      return this.depth >= 2 && this.getKeysCount > 3;
    },
  },
}
</script>
