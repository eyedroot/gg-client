<template>
  <span class="--header array">
    <span class="text-purple-900 font-bold">Array:{{ getKeysCount }}</span> <span class="brackets" :class="getBracketsIndex">[</span>

    <CodeFolding
      v-if="foldCondition"
      type="array"
      :bracket-index="getBracketsIndex"
      @handleCollapsed="toggleCollapsed">
    </CodeFolding>
  </span>

  <div class="relative flex flex-col" :class="{ 'collapsed': foldCondition }">
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
import {defineAsyncComponent, ref, watchEffect} from 'vue';
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
    unfoldAll: {
      type: Boolean,
      default: false,
      required: false,
    }
  },
  setup(props) {
    const shouldFold = ref(props.unfoldAll)

    watchEffect(() => {
      shouldFold.value = props.unfoldAll
    })

    return {
      shouldFold,
    }
  },
  methods: {
    toggleCollapsed() {
      this.shouldFold = ! this.shouldFold
    },
  },
  computed: {
    getKeysCount() {
      return Object.keys(this.capsuleDto.value).length
    },
    getBracketsIndex() {
      return `brackets-${this.depth % 4}`
    },
    foldCondition() {
      if (this.shouldFold) {
        return false
      }

      return this.depth >= 2 && this.getKeysCount > 3
    },
  },
}
</script>
