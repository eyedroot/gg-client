<template>
  <div class="--backtrace flex flex-col p-1.5 leading-7 tracking-tighter overflow-x-auto">

    <label class="flex items-center space-x-1.5 my-1.5 select-none">
      <input type="checkbox" v-model="hideVendorDirectories" @click="toggleVendorDirectories">
      <span class="text-gray-600">hide **/vendor/** directories</span>
    </label>

    <div
      :key="index"
      v-for="(row, index) in prunedBacktrace"
      class="flex flex-col">
        <div class="flex flex-row items-center">
          <fa-icon icon="file-lines" class="mr-1.5 text-gray-300" :class="{ '!text-blue-500': isHighlightedFile(row.file) }"></fa-icon>
          <span :class="{ 'font-bold underline': isHighlightedFile(row.file) }">{{
              getFileOrClass(row)
            }}:<strong>{{ row?.line }}</strong></span>

          <code class="ml-1.5 text-blue-600 font-bold">
            {{ row?.function }}(<span
            class="inline-flex bg-gray-300 rounded px-0.5 cursor-pointer text-black select-none"
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
    highlightedFile: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showParametersIndexes: [],
      hideVendorDirectories: false,
      prunedBacktrace: [],
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
    isHighlightedFile(file) {
      return file === this.highlightedFile.file;
    },
    toggleVendorDirectories() {
      this.hideVendorDirectories = ! this.hideVendorDirectories;

      this.prunedBacktrace = this.backtrace.filter(row => {
        if (this.hideVendorDirectories) {

          return row.file !== undefined && ! row.file.includes('/vendor/');
        }

        return true;
      });
    },
    toggleParameters(index) {
      if (this.showParametersIndexes.includes(index)) {
        this.showParametersIndexes = this.showParametersIndexes.filter(item => item !== index);
      } else {
        this.showParametersIndexes.push(index);
      }
    },
  },
  created() {
    this.prunedBacktrace = [...this.backtrace]
  }
}
</script>
