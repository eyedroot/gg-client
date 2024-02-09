<template>
  <div class="text-green-700 dark:text-green-500 mb-1.5">/** #{{ props.displayId }} */</div>
</template>

<script setup>
const props = defineProps({
  displayId: {
    type: Number,
    required: true
  },
})
</script>
