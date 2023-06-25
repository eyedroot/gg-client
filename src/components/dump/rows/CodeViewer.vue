<template>
  <div class="--code ml-5 my-2">
    <div class="flex flex-col">
      <div v-for="(row, idx) in sourceCode" :key="idx" class="flex flex-row">
        <div class="flex select-none justify-end min-w-[20px] text-gray-400 mr-3">{{ row.line }}</div>
        <code class="flex-1 whitespace-pre text-gray-700" :class="{ 'bg-gray-200': row.line === focusLine }" v-html="highlightCode(row.code)"></code>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sourceCode: {
      type: Array,
      required: true
    },
    focusLine: {
      required: true
    },
  },
  setup() {
    const highlightCode = (code) => {
      return code
        .replace(/::([a-zA-Z_\x80-\xff][a-zA-Z0-9_\x80-\xff]*)/g, '::<span class="method">$1</span>') // method names
        .replace(/(\$[a-zA-Z_\x80-\xff][a-zA-Z0-9_\x80-\xff]*)/g, '<span class="variable">$1</span>') // variables
        .replace(/->([a-zA-Z_\x80-\xff][a-zA-Z0-9_\x80-\xff]*)/g, '-><span class="method">$1</span>') // instance method names
        .replace(/\s([a-z_]+)\(/g, ' <span class="function">$1</span>(') // function names
        .replace(/\s(foreach|echo|class|function|interface|trait|while|do|for|break;|continue|try|catch|finally|throw|return|yield|use|namespace|global|isset|empty|include|include_once|require|require_once|print|unset|list|clone|declare|instanceof|and|or|xor|new|as|bool|boolean|int|integer|float|double|string|array|object|void|mixed|numeric|callback|callable|false|true|null|if|else|elseif|else if)\s/g, ' <span class="keyword">$1</span> ') // keywords
        .replace(/::/g, '<span class="double-colon">::</span>')
    }

    return {
      highlightCode,
    }
  }
}
</script>
