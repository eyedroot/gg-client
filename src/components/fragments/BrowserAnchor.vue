<template>
  <a class="cursor-pointer underline" @click="handleOpenExternal">{{ title }}</a>
</template>

<script>
import { shell } from 'electron'

export default {
  name: "BrowserAnchor",
  props: {
    href: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
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
