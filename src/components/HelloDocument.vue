<template>
  <div class="flex flex-col justify-center w-full items-center h-fit my-20 dark:text-gray-200">
    <div class="text-5xl font-bold">Good Game, Great Code</div>
    <div class="text-2xl">With gg, PHP Debugging is a breeze!</div>

    <div class="flex flex-col space-y-10 mt-12">

      <section>
        <article
            class="mb-5 last:mb-0 prose dark:prose-invert"
            v-for="(patchNote, idx) in meta.releaseNotes"
            :key="idx"
            v-html="patchNote">
        </article>
      </section>

      <hr>

      <section>
        <h3 class="mb-1 text-lg">Installation</h3>
        <div class="p-5 text-base bg-gray-200 rounded dark:bg-gray-800">
          <span class="text-gray-400 select-none">$</span> composer require --dev <AnchorShell href="https://github.com/binbyz/gg">beaverlabs/gg</AnchorShell>
        </div>
      </section>

      <section>
        <h3 class="mb-1 text-lg">If using docker container, set to .env</h3>
        <div class="p-5 text-base bg-gray-200 rounded dark:bg-gray-800">
          GG_HOST=host.docker.internal
        </div>
      </section>

    </div>

  </div>
</template>

<script setup>
import AnchorShell from "@/components/fragments/AnchorShell.vue"
import {inject} from "vue";

const meta = inject('meta')
</script>
