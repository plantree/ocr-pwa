<script setup lang="ts">
import Header from './layouts/Header.vue';
import Footer from './layouts/Footer.vue';
</script>

<template>
  <div class="flex flex-col h-screen justify-between">
    <Header />
    <main class="flex-grow">
      <router-view />
    </main>
    <Footer />
  </div>
</template>
