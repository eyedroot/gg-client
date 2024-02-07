<template>
  <div class="text-green-700 dark:text-green-500 mb-1.5">
    /** #{{ props.displayId }} - {{ currentDateTime }} */
  </div>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
  displayId: {
    type: Number,
    required: true,
  },
})

const currentDateTime = computed(() => {
  const date = new Date()

  const hour = ('0' + (date.getHours())).slice(-2)
  const minute = ('0' + (date.getMinutes())).slice(-2)
  const second = ('0' + (date.getSeconds())).slice(-2)

  return `${hour}:${minute}:${second}`
})
</script>
