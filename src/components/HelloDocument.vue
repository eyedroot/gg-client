<template>
  <section class="flex flex-col bg-blue-50 justify-center w-full items-center">
    <div class="text-5xl font-bold">Good Game, Great Code</div>
    <div class="text-2xl">With gg, PHP Debugging is a breeze!</div>

    <div class="flex flex-col space-y-10 mt-12">
      <div class="">
        <h3 class="mb-1 text-lg">Laravel Framework</h3>
        <div class="p-5 bg-gray-200 rounded fira-code">
          $ composer require --dev beaverlabs/laravel-gg
        </div>
      </div>

      <div class="">
        <h3 class="mb-1 text-lg">Vanilla PHP</h3>
        <div class="p-5 bg-gray-200 rounded fira-code">
          $ composer require global beaverlabs/gg
        </div>
      </div>

      <div class="">
        <h3 class="mb-1 text-lg">If using docker container, set to .env</h3>
        <div class="p-5 bg-gray-200 rounded fira-code">
          GG_HOST=host.docker.internal
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {

}
</script>
