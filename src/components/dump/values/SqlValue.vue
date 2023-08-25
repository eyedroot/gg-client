<template>
  <div class="--code">
    <LineNumber :display-id="props.displayId"></LineNumber>

    <div class="-sql" v-html="formatSql()"></div>

    <div class="flex flex-row items-center space-x-3 mt-2.5">
      <span class="-status-value">
        Time: {{ props.messageDto.data.value.time.value }}<em class="ml-0.5 not-italic text-gray-500">ms</em>
      </span>
      <span class="-status-value">Driver: {{ props.messageDto.data.value.configs.value.driver.value }}</span>
      <span class="-status-value">Connection: {{ props.messageDto.data.value.connectionName.value }}</span>
      <span class="-status-value">Database: {{ props.messageDto.data.value.configs.value.database.value }}</span>
    </div>
  </div>
</template>

<script setup>
import { format } from 'sql-formatter'
import { highlight } from "sql-highlight"
import LineNumber from "@/components/fragments/LineNumber.vue";

const props = defineProps({
  displayId: {
    type: Number,
    required: true
  },
  messageDto: {
    type: Object,
    required: true
  },
})

const formatSql = () => {
  const params = props.messageDto.data.value.bindings.value.map(binding => {
    return (binding.type === 'string') ? `'${binding.value}'` : String(binding.value)
  })

  const sql = props.messageDto.data.value.sql.value;
  const language = props.messageDto.data.value.configs.value.driver.value ?? 'mysql'

  let formattedSql = format(sql, {
    params: params,
    language: language,
    tabWidth: 2,
    keywordCase: 'upper',
  })

  return highlight(formattedSql, { html: true })
    .replace(/(\r\n|\n|\r)/gm, '<br>')
    .replace(/\s{2}/gm, '&nbsp;&nbsp;')
}
</script>

<style lang="scss">
.-sql {
  @apply dark:text-gray-400 ml-1.5;
}
.sql-hl-keyword {
  @apply text-purple-700 dark:text-purple-400;
}
.sql-hl-string {
  @apply text-gray-600 dark:text-gray-200;
}
.-status-value {
  @apply inline-flex text-[11px] text-gray-900 dark:text-gray-400 tracking-tight;
}
</style>
