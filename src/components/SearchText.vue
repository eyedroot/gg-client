<template>
  <div class="flex flex-row items-center justify-center bg-gray-200 border-[1px] border-gray-300 p-1 shadow-md z-50">
    <input ref="inputText"
           v-model="term"
           @keyup.enter="findText"
           type="text"
           class="bg-gray-100 leading-6 px-1 border-[1px] border-gray-200 focus:ring-2 focus:outline-none"
           :class="ringColor"
           placeholder="Text Search">
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

    const findText = () => {
      if (term.value.length > 0) {
        context.emit('findText', term.value)
      }
    }

    const ringColor = computed(() => {
      return props.searchContext.foundCount ? 'focus:ring-green-500' : 'focus:ring-red-500'
    })

    return {
      term,
      inputText,
      findText,
      ringColor
    }
  },
}
</script>
