<template>
  <div class="flex relative px-0.5 pt-1">
    <button class="absolute top-3 right-2.5 z-20" @click="$emit('removeItem')">
      <fa-icon icon="xmark" class="text-gray-800 dark:text-gray-300"></fa-icon>
    </button>

    <table
      class="w-full h-fit divide-y divide-gray-200 border border-gray-200 box-border dark:border-black dark:divide-black"
    >
      <thead class="bg-gray-100 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
        <tr>
          <th class="px-6 py-2 text-left text-xs font-medium uppercase tracking-wider">Begin Memory</th>
          <th class="px-6 py-2 text-left text-xs font-medium uppercase tracking-wider">End Memory</th>
          <th class="px-6 py-2 text-left text-xs font-medium uppercase tracking-wider">Diff Memory</th>
          <th class="px-6 py-2 text-left text-xs font-medium uppercase tracking-wider">EXECUTE Time</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:text-gray-200">
        <tr>
          <td class="px-6 py-2 whitespace-nowrap">
            {{ messageDto.data.value.beginMemory.value }}
          </td>
          <td class="px-6 py-2 whitespace-nowrap">
            {{ messageDto.data.value.endMemory.value }}
          </td>
          <td class="px-6 py-2 whitespace-nowrap">
            {{ messageDto.data.value.diffMemory.value }}
          </td>
          <td class="px-6 py-2 whitespace-nowrap">
            {{ messageDto.data.value.executeTime.value }}
          </td>
        </tr>
      </tbody>
    </table>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'UsageValue',
  props: {
    messageDto: {
      type: Object,
      required: true,
    },
  },
  setup() {},
};
</script>
