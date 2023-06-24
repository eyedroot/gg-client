<template>
  <div class="flex flex-row items-center justify-center bg-gray-200 border-[1px] border-gray-300 py-1 px-2.5 shadow-md z-50 space-x-1">
    <div class="text-[12px] text-gray-500 pr-1">{{ textCountText() }}</div>

    <input ref="inputText"
           v-model="term"
           @keyup.enter="findText"
           type="text"
           class="bg-gray-100 leading-6 px-1 border-[1px] border-gray-300 focus:ring-2 focus:outline-none"
           :class="ringColor"
           placeholder="Enter">

    <button class="pl-1" @click="this.$emit('closeSearch')">
      <fa-icon icon="xmark" class="text-gray-800"></fa-icon>
    </button>
  </div>
</template>

<script>
import {computed, onMounted, ref, watch} from "vue";

export default {
  props: {
    searchContext: {
      type: Object,
      required: true,
    }
  },
  setup(props, context) {
    const term = ref(props.searchContext.lastTerm || '')
    const inputText = ref(null)

    watch(term, (value) => {
      context.emit('saveTerm', value)
    })

    onMounted(() => {
      inputText.value.focus()
    })

    const focusInput = () => {
      inputText.value.focus()
    }

    const textCountText = () => {
      return props.searchContext.foundCount > 0
        ? `(${props.searchContext.currentIndex + 1}/${props.searchContext.foundCount})`
        : '(0/0)'
    }

    const findText = () => {
      if (term.value.length > 0) {
        context.emit('findText', term.value)
      }
    }

    const ringColor = computed(() => {
      if (term.value.length === 0 || props.searchContext.foundCount === -1) {
        return 'focus:ring-gray-500'
      }

      return props.searchContext.foundCount ? 'focus:ring-green-500' : 'focus:ring-red-500'
    })

    return {
      term,
      inputText,
      focusInput,
      textCountText,
      findText,
      ringColor,
    }
  },
}
</script>
