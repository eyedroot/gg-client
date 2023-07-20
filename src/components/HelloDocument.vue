<template>
  <section class="flex flex-col justify-center w-full items-center h-fit my-20 dark:text-gray-200">
    <div class="text-5xl font-bold">Good Game, Great Code</div>
    <div class="text-2xl">With gg, PHP Debugging is a breeze!</div>

    <div class="flex flex-col space-y-10 mt-12">
      <div class="">
        <h3 class="mb-1 text-lg">Laravel Framework</h3>
        <div class="p-5 text-base bg-gray-200 rounded dark:bg-gray-800">
          $ composer require --dev <AnchorShell href="https://github.com/binbyz/laravel-gg">beaverlabs/laravel-gg</AnchorShell>
        </div>
      </div>

      <div class="">
        <h3 class="mb-1 text-lg">Vanilla PHP</h3>
        <div class="p-5 text-base bg-gray-200 rounded dark:bg-gray-800">
          $ composer global require <AnchorShell href="https://github.com/binbyz/gg">beaverlabs/gg</AnchorShell>
        </div>
      </div>

      <div class="">
        <h3 class="mb-1 text-lg">If using docker container, set to .env</h3>
        <div class="p-5 text-base bg-gray-200 rounded dark:bg-gray-800">
          GG_HOST=host.docker.internal
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AnchorShell from "@/components/fragments/AnchorShell.vue";

export default {
  components: {AnchorShell}

}
</script>
