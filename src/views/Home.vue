<script setup>
const openGuide = () => {
  window.open(`https://github.com`);
};
</script>

<template>
  <div class="flex flex-col justify-center mt-12">
    <div class="px-2 py-10 text-center flex flex-col gap-2">
      <h1>
        <span
          class="font-title capitalize font-bold text-2xl bg-gradient-to-r from-green-600 to-blue-400 text-transparent bg-clip-text"
          >An easy tool for OCR</span
        >
      </h1>
      <h2 class="font-title font-bold text-2xl">
        extracting text from images <span class="underline">offline</span>
      </h2>
    </div>

    <div class="inline-flex w-full flex-col justify-center px-16 gap-4 md:flex-row">
      <p class="text-center btn md:btn-wide normal-case">
        <router-link to="/ocr"> Start OCR </router-link>
      </p>
      <p class="text-center btn btn-neutral md:btn-wide normal-case">
        <a target="_blank" href="/guide" @click.prevent="openGuide"> How to use? </a>
      </p>
    </div>
  </div>
</template>
