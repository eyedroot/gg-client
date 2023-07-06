<template>
  <div class="--backtrace flex flex-col px-1.5 py-3 overflow-x-auto">
    <div v-if="backtrace.length === 0">
      <div class="text-gray-600 text-center">No backtrace available. <code>\gtrace($data);</code></div>
    </div>

    <div :key="index" v-for="(row, index) in backtrace" class="flex flex-col">
      <div class="flex flex-row items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 pl-2 leading-7">
        <button class="inline-flex items-center justify-center w-4 h-4 bg-gray-300 hover:bg-gray-500 mr-1.5 text-white cursor-pointer select-none"
                @click="toggleCodes(index)">{{ showCodesIndexes.includes(index) ? '-' : '+' }}</button>

        <span class="text-gray-900" :class="{ 'text-gray-700 font-bold': row.file === this.focusFile.file }">
          {{ row.file ? row.file : row.class }}:<strong>{{ row.line }}</strong>
        </span>

        <code class="ml-1.5 text-blue-600 tracking-tight font-bold">
          {{ row?.function }}(<span v-if="row?.args?.type !== 'NULL'"
          class="inline-flex bg-gray-300 rounded-sm px-0.5 cursor-pointer select-none min-w-[23.88px] items-center justify-center text-gray-700"
          @click="toggleParameters(index)">{{ showParametersIndexes.includes(index) ? '▼' : '...' }}</span>)
        </code>
      </div>

      <div v-if="showParametersIndexes.includes(index)" class="--code ml-5 my-2">
        <component :is="$getValueComponent(row?.args)" :capsule-dto="row?.args"></component>
      </div>

      <CodeViewer v-if="showCodesIndexes.includes(index)" :source-code="row.sourceCode" :focus-line="row?.line"></CodeViewer>
    </div>
  </div>
</template>

<script>
import ScalarValue from "@/components/dump/values/ScalarValue.vue";
import StdClassValue from "@/components/dump/values/StdClassValue.vue";
import ArrayValue from "@/components/dump/values/ArrayValue.vue";
import CodeViewer from "@/components/dump/rows/CodeViewer.vue";

export default {
  components: {
    CodeViewer,
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
      showParametersIndexes: [],
      showCodesIndexes: [],
    }
  },
  methods: {
    toggleParameters(index) {
      if (this.showParametersIndexes.includes(index)) {
        this.showParametersIndexes = this.showParametersIndexes.filter(item => item !== index);
      } else {
        this.showParametersIndexes.push(index);
      }
    },
    toggleCodes(index) {
      if (this.showCodesIndexes.includes(index)) {
        this.showCodesIndexes = this.showCodesIndexes.filter(item => item !== index);
      } else {
        this.showCodesIndexes.push(index);
      }
    }
  },
  mounted() {
    for (let row of this.backtrace) {
      if (row.file === this.focusFile.file) {
        this.showCodesIndexes.push(this.backtrace.indexOf(row));
      }
    }
  }
}
</script>
