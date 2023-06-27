<template>
  <span class="--header stdclass">
    <span class="text-purple-900 font-bold">{{ this.capsuleDto.className }}</span> <span class="brackets" :class="getBracketsIndex">{</span>

    <CodeFolding
      type="stdClass"
      :bracket-index="getBracketsIndex"
      :is-fold="isFold"
      @handleCollapsed="isFold = ! isFold">
    </CodeFolding>
  </span>

  <div class="--line pl-[1.5rem]" v-if="capsuleDto.pruned">
    <span class="italic text-gray-500">...pruned properties</span>
  </div>

  <div class="relative flex flex-col" :class="{ 'collapsed': isFold }">
    <div class="--line pl-[1.5rem]"
         v-for="(value, key) in capsuleDto.value"
         :key="key">

      <span class="h-fit">
        <span class="text-blue-500 mr-0.5">{{ getModifierToCharacter(getModifier(key)) }}</span>
        <ScalarValue
          :capsule-dto="this.$convertKeyToCapsuleDto(getPropertyName(key))" :is-property-or-key="true"></ScalarValue>
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
import {defineAsyncComponent, ref} from 'vue';
import CodeFolding from "@/components/dump/values/CodeFoldingTail.vue";

export default {
  name: 'StdClassValue',
  components: {
    CodeFolding,
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
    },
  },
  setup(props) {
    const isFold = ref(false)

    if (props.depth >= 2 && Object.keys(props.capsuleDto.value).length > 3) {
      isFold.value = true
    }

    return {
      isFold,
    }
  },
  methods: {
    getModifier(rawKey) {
      return rawKey.split('@')[0]
    },
    getModifierToCharacter(modifier) {
      switch (modifier) {
        case 'public':
          return '+'
        case 'protected':
          return '#'
        case 'private':
          return '-'
        default:
          return ''
      }
    },
    getPropertyName(rawKey) {
      return rawKey.split('@')[1]
    },
  },
  computed: {
    getBracketsIndex() {
      return `brackets-${this.depth % 4}`;
    },
  },
}
</script>
