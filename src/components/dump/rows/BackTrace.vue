<template>
  <div class="--backtrace flex flex-col px-1.5 pt-1 tracking-tighter overflow-x-auto">
    <div :key="index"
      v-for="(row, index) in backtrace"
      class="flex flex-col">
        <div class="flex flex-row items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 pl-2 leading-6">
          <span class="inline-flex items-center justify-center w-4 h-4 bg-emerald-600 hover:bg-emerald-700 transition rounded mr-1.5 text-white cursor-pointer">+</span>

          <span :class="{ 'text-gray-700 font-bold': row.file === this.focusFile.file }">
            {{ row?.file ? row.file : row?.class }}:<strong>{{ row?.line }}</strong>
          </span>

          <code class="ml-1.5 text-blue-600 font-bold">
            {{ row?.function }}(<span
            class="inline-flex bg-gray-300 rounded-sm px-0.5 cursor-pointer text-black select-none"
            @click="toggleParameters(index)">...</span>)
          </code>
        </div>

        <div class="--code ml-5 my-2" :class="{ 'hidden': ! this.showParametersIndexes.includes(index) }">
          <component :is="this.$getValueComponent(row?.args)" :capsule-dto="row?.args"></component>
        </div>
    </div>
  </div>
</template>

<script>
import ScalarValue from "@/components/dump/values/ScalarValue.vue";
import StdClassValue from "@/components/dump/values/StdClassValue.vue";
import ArrayValue from "@/components/dump/values/ArrayValue.vue";

export default {
  components: {
    ArrayValue,
    ScalarValue,
    StdClassValue,
  },
  props: {
    backtrace: {
      type: Array,
      required: true
    },
    focusFile: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showSourceCode: false,
      showParametersIndexes: []
    }
  },
  methods: {
    toggleParameters(index) {
      if (this.showParametersIndexes.includes(index)) {
        this.showParametersIndexes = this.showParametersIndexes.filter(item => item !== index);
      } else {
        this.showParametersIndexes.push(index);
      }
    }
  }
}
</script>
