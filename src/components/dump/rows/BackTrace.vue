<template>
  <div class="--backtrace flex flex-col p-1.5 leading-7 tracking-tighter overflow-x-auto">

    <label class="flex items-center space-x-1.5 my-1.5">
      <input type="checkbox" v-model="hideVendorDirectories">
      <span class="text-gray-600">hide **/vendor/** directories</span>
    </label>

    <div v-for="(row, index) in backtrace" :key="index"
      class="flex flex-col">
      <div class="flex flex-row items-center">
        <fa-icon icon="file-lines" class="mr-1.5 text-gray-300"></fa-icon>
        <span :class="{ 'font-bold underline': isNotVendorTrace(row.file) }">{{ getFileOrClass(row) }}:<strong>{{ row?.line }}</strong></span>

        <code class="ml-1.5 text-blue-600 font-bold">
          {{ row?.function }}(<span
              class="inline-flex bg-gray-300 rounded px-0.5 cursor-pointer text-black"
              @click="toggleParameters(index)">...</span>)
        </code>
      </div>

      <div class="--code ml-5 my-2" :class="getParametersToggleClass(index)">
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
  name: 'BackTrace',
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
    notVendorTrace: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showParametersIndexes: [],
      hideVendorDirectories: false,
    }
  },
  methods: {
    getFileOrClass(row) {
      return row?.file ? row.file : row?.class
    },
    getParametersToggleClass(index) {
      return {
        'hidden': ! this.showParametersIndexes.includes(index)
      };
    },
    isNotVendorTrace(file) {
      return file === this.notVendorTrace?.file;
    },
    toggleParameters(index) {
      if (this.showParametersIndexes.includes(index)) {
        this.showParametersIndexes = this.showParametersIndexes.filter(item => item !== index);
      } else {
        this.showParametersIndexes.push(index);
      }
    }
  },
}
</script>
