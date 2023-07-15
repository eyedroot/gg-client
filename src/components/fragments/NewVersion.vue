<template>
  <div v-show="showFlag" class="fixed bottom-3 left-14 bg-gray-800 rounded-md p-5">
    <div class="flex flex-row space-x-3 items-center">
      <fa-icon icon="lightbulb" class="text-2xl text-yellow-100"></fa-icon>

      <div class="text-white text-base">
        <BrowserAnchor :href="meta.publicRepositoryUrl" title="New version is available!"></BrowserAnchor>
      </div>

      <fa-icon @click="showFlag = false" class="text-white cursor-pointer" icon="close"></fa-icon>
    </div>
  </div>
</template>

<script>
import BrowserAnchor from '@/components/fragments/BrowserAnchor.vue'
import {ref} from 'vue'

export default {
  name: "NewVersion",
  components: { BrowserAnchor },
  props: {
    meta: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const showFlag = ref(false)

    const versionChecker = () => props.meta.latestVersion !== props.meta.clientVersion

    showFlag.value = versionChecker()

    setInterval(() => {
      showFlag.value = versionChecker()
    }, 1000 * 60 * 60 * 24)

    return {
      showFlag,
    }
  },
}
</script>
