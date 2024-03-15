<template>
  <div v-show="showFlag" class="fixed bottom-3 left-14 bg-gray-800 rounded-md p-5">
    <div class="flex flex-row space-x-3 items-center">
      <fa-icon icon="lightbulb" class="text-2xl text-yellow-100"></fa-icon>

      <div class="text-white text-base">
        <AnchorShell :href="meta.publicRepositoryUrl" title="New version is available!"></AnchorShell>
      </div>

      <fa-icon @click="showFlag = false" class="text-white cursor-pointer" icon="close"></fa-icon>
    </div>
  </div>
</template>

<script>
import AnchorShell from '@/components/fragments/AnchorShell.vue';
import { ref } from 'vue';

export default {
  name: 'NewVersion',
  components: { AnchorShell },
  props: {
    meta: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const showFlag = ref(false);

    const versionChecker = (latestVersion, currentVersion) => {
      if (!latestVersion || !currentVersion) {
        return false;
      }

      const latestVersionArray = latestVersion.split('.');
      const currentVersionArray = currentVersion.split('.');

      if (latestVersionArray[0] > currentVersionArray[0]) {
        return true;
      }

      if (latestVersionArray[1] > currentVersionArray[1]) {
        return true;
      }

      if (latestVersionArray[2] > currentVersionArray[2]) {
        return true;
      }

      return false;
    };

    setTimeout(() => {
      showFlag.value = versionChecker(props.meta.latestVersion, props.meta.clientVersion);
    }, 1000 * 5);

    setInterval(
      () => {
        showFlag.value = versionChecker(props.meta.latestVersion, props.meta.clientVersion);
      },
      1000 * 60 * 60,
    );

    return {
      showFlag,
    };
  },
};
</script>
