<template>
  <div
    v-show="props.context.enabled"
    class="fixed top-10 right-3 flex rounded border-2 border-gray-600 px-3 py-2 items-center justify-center bg-gray-50 text-green-700 z-30 shadow-md transition-opacity font-bold dark:bg-gray-900 dark:text-green-300"
  >
    <fa-icon icon="check-circle" class="mr-2"></fa-icon>
    <span>{{ props.context.message }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  context: {
    type: Object,
    required: false,
    default: () => ({
      enabled: true,
      message: 'Copied to clipboard!',
    }),
  },
});
</script>
