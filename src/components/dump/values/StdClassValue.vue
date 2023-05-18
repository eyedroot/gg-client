<template>
  <span class="--header stdclass">
    {{ getStdClassName }} <span class="brackets" :class="getBracketsIndex">{</span>

    <CollapsedTail
      v-if="isCollapsed"
      type="stdClass"
      :bracket-index="getBracketsIndex"
      @handleCollapsed="toggleCollapsed">
    </CollapsedTail>
  </span>

  <div class="relative flex flex-col" :class="{ 'collapsed': isCollapsed }">
    <div class="pl-[1.5rem]"
         v-for="(value, key) in capsuleDto.value"
         :key="key">

      <span class="h-fit">
        <span class="text-blue-500 mr-0.5">{{ getModifierToCharacter(getModifier(key)) }}</span>
        <ScalarValue :capsule-dto="this.$convertKeyToCapsuleDto(getPropertyName(key))"></ScalarValue>
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
import CollapsedTail from "@/components/dump/values/CollapsedTail.vue";

export default {
  name: 'StdClassValue',
  components: {
    CollapsedTail,
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
  data() {
    return {
      shouldBeCollapsed: false,
    }
  },
  methods: {
    toggleCollapsed() {
      this.shouldBeCollapsed = !this.shouldBeCollapsed;
    },
    getModifier(rawKey) {
      return rawKey.split('@')[0];
    },
    getModifierToCharacter(modifier) {
      switch (modifier) {
        case 'public':
          return '+';
        case 'protected':
          return '#';
        case 'private':
          return '-';
        default:
          return '';
      }
    },
    getPropertyName(rawKey) {
      return rawKey.split('@')[1];
    },
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
    isCollapsed() {
      if (this.shouldBeCollapsed) {
        return false;
      }

      return this.depth >= 2 && this.getKeysCount > 3;
    },
  },
}
</script>
