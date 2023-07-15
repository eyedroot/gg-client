<template>
  <span class="--header array" :class="{ '--dimmed': isDimmed }">
    <span class="text-purple-900 font-bold">Array:{{ Object.keys(this.capsuleDto.value).length }}</span> <span class="brackets" :class="getBracketsIndex">[</span>

    <CodeFolding
      type="array"
      :bracket-index="getBracketsIndex"
      :is-fold="isFold"
      @handleFold="handleFold">
    </CodeFolding>
  </span>

  <div class="relative flex flex-col" v-if="! isFold">
    <div class="pl-[1.5rem]"
         v-for="(value, key) in capsuleDto.value"
         :key="key">

      <span class="h-fit">
        <ScalarValue :is-property-or-key="true" :capsule-dto="this.$convertKeyToCapsuleDto(key)"></ScalarValue>
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
import useDimmed from "@/utilities/dimmed"

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
    const { isDimmed, dimmed } = useDimmed()

    const handleFold = () => {
      dimmed(() => isFold.value = ! isFold.value)
    }

    if (props.depth === 0 && Object.keys(props.capsuleDto.value).length >= 30) {
      isFold.value = true
    }

    if (props.depth >= 1) {
      isFold.value = true
    }

    if (Object.keys(props.capsuleDto.value).length === 0) {
      isFold.value = false
    }

    return {
      isFold,
      handleFold,
      isDimmed,
    }
  },
  computed: {
    getBracketsIndex() {
      return `brackets-${this.depth % 4}`
    },
  },
}
</script>
