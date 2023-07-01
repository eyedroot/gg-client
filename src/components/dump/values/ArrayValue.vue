<template>
  <span class="--header array">
    <span class="text-purple-900 font-bold">Array:{{ Object.keys(this.capsuleDto.value).length }}</span> <span class="brackets" :class="getBracketsIndex">[</span>

    <CodeFolding
      type="array"
      :bracket-index="getBracketsIndex"
      :is-fold="isFold"
      @handleCollapsed="isFold = ! isFold">
    </CodeFolding>
  </span>

  <div class="relative flex flex-col" v-if="! isFold">
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
import {defineAsyncComponent, ref} from 'vue';
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
  },
  setup(props) {
    const isFold = ref(false)

    if (props.depth >= 1) {
      isFold.value = true
    }

    return {
      isFold,
    }
  },
  computed: {
    getBracketsIndex() {
      return `brackets-${this.depth % 4}`
    },
  },
}
</script>
