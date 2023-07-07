<template>
  <span class="--header stdclass" :class="{ '--dimmed': isDimmed }">
    <span class="text-purple-900 font-bold">{{ this.capsuleDto.class }}</span> <span class="brackets" :class="getBracketsIndex">{</span>

    <CodeFolding
      type="stdClass"
      :bracket-index="getBracketsIndex"
      :is-fold="isFold"
      @handleFold="handleFold">
    </CodeFolding>
  </span>

  <div class="--line pl-[1.5rem]" v-if="capsuleDto.pruned && !isFold">
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
import useDimmed from "@/components/utilities/dimmed";

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
    const { isDimmed, dimmed } = useDimmed()

    const handleFold = () => {
      dimmed(() => isFold.value = ! isFold.value)
    }

    if (props.depth >= 1) {
      isFold.value = true
    }

    return {
      isFold,
      isDimmed,
      handleFold,
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
        case 'protected static':
          return '#static'
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
