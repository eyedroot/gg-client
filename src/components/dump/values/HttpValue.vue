<template>
  <div class="--code flex flex-col space-y-1">
    <div class="text-green-700 dark:text-green-500 mb-1.5">/** #{{ displayId }} */</div>

    <div class="ml-2.5">
      <div class="flex flex-row items-center space-x-3">
        <fa-icon icon="arrow-up" class="text-blue-500"></fa-icon>
        <span class="text-[11px] tracking-tighter font-bold" :class="httpMethodColor">{{ request.method.value }}</span>
        <AnchorShell :href="request.url.value">{{ request.url.value }}</AnchorShell>
      </div>
    </div>

    <div class="ml-2.5">
      <div class="flex flex-row items-center space-x-3">
        <fa-icon icon="arrow-down" class="text-red-500"></fa-icon>
        <span class="text-[11px] tracking-tighter font-bold" :class="responseStatusColor">{{ response.status.value }}</span>
        <span class="-status-value">Total Time: {{ response.handlerStats.value.total_time.value }}</span>
        <span class="-status-value">Primary IP: {{ response.handlerStats.value.primary_ip.value }}:{{ response.handlerStats.value.primary_port.value }}</span>
      </div>
    </div>

    <div class="--code !mt-2">
      <component
        :is="components[this.$getValueComponent(props.messageDto.data)]"
        :capsule-dto="props.messageDto.data"></component>
    </div>
  </div>
</template>

<script setup>
import AnchorShell from "@/components/fragments/AnchorShell.vue";
import {computed} from "vue";

import ArrayValue from "@/components/dump/values/ArrayValue.vue";
import ScalarValue from "@/components/dump/values/ScalarValue.vue";
import StdClassValue from "@/components/dump/values/StdClassValue.vue";

const components = {
  ArrayValue,
  ScalarValue,
  StdClassValue,
}

const props = defineProps({
  displayId: {
    type: Number,
    required: true,
  },
  messageDto: {
    type: Object,
    required: true,
  },
})

const request = computed(() => {
  return props.messageDto.data.value.request.value
})

const response = computed(() => {
  return props.messageDto.data.value.response.value
})

const httpMethodColor = computed(() => {
  switch (request.value.method.value) {
    case 'GET':
      return 'text-cyan-700'
    case 'POST':
      return 'text-blue-700'
    case 'PUT':
      return 'text-yellow-700'
    case 'DELETE':
      return 'text-red-700'
    default:
      return 'text-gray-700'
  }
})

const responseStatusColor = computed(() => {
  const statusCode = response.value.status.value

  if (statusCode >= 200 && statusCode < 300) {
    return 'text-green-700'
  }

  if (statusCode >= 300 && statusCode < 400) {
    return 'text-blue-700'
  }

  if (statusCode >= 400 && statusCode < 500) {
    return 'text-yellow-700'
  }

  if (statusCode >= 500 && statusCode < 600) {
    return 'text-red-700'
  }

  return 'text-gray-700'
})
</script>

<style lang="scss">
.-status-value {
  @apply inline-flex text-[11px] text-gray-900 tracking-tight;
}
</style>
