<template>
  <a class="cursor-pointer underline" @click="handleOpenExternal">
    <slot></slot><span>{{ title }}</span>
  </a>
</template>

<script>
import { shell } from 'electron'

export default {
  name: "AnchorShell",
  props: {
    href: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup(props) {
    const handleOpenExternal = () => {
      shell.openExternal(props.href)
    }

    return {
      handleOpenExternal,
    }
  },
}
</script>
