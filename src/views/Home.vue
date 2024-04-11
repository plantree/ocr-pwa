<script setup lang="ts">
import { Locale } from '@/enums';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const openGuide = () => {
  if (locale.value === Locale.ZH_CN) {
    window.open('https://github.com/plantree/ocr-pwa/blob/main/docs/zh-CN/guide.md');
  } else {
    window.open('https://github.com/plantree/ocr-pwa/blob/main/docs/en-US/guide.md');
  }
};
</script>

<template>
  <div class="flex flex-col justify-center gap-8 my-16">
    <div class="text-center flex flex-col gap-2">
      <h1>
        <span
          class="font-title capitalize font-bold text-2xl bg-gradient-to-r from-green-600 to-blue-400 text-transparent bg-clip-text"
        >
          {{ t('home.title') }}
        </span>
      </h1>
      <h2 class="font-title font-bold text-2xl capitalize">{{ t('home.subTitle') }}</h2>
    </div>

    <div class="inline-flex w-full justify-center px-16 py-4 gap-4 flex-row">
      <router-link to="/ocr">
        <p class="text-center btn md:btn-wide normal-case">
          {{ t('home.enter') }}
        </p>
      </router-link>
      <a target="_blank" href="/guide" @click.prevent="openGuide">
        <p class="text-center btn btn-neutral md:btn-wide normal-case">
          {{ t('home.guide') }}
        </p>
      </a>
    </div>

    <div class="flex flex-col px-8 gap-4 md:flex-row md:px-32">
      <div class="flex-1 card bg-base-200">
        <div class="card-body">
          <h2 class="card-title text-base">{{ t('home.features[0].title') }}</h2>
          <p>{{ t('home.features[0].description') }}</p>
        </div>
      </div>
      <div class="flex-1 card bg-base-200">
        <div class="card-body">
          <h2 class="card-title text-base">{{ t('home.features[1].title') }}</h2>
          <p>{{ t('home.features[1].description') }}</p>
        </div>
      </div>
      <div class="flex-1 card bg-base-200">
        <div class="card-body">
          <h2 class="card-title text-base">{{ t('home.features[2].title') }}</h2>
          <p>{{ t('home.features[2].description') }}</p>
        </div>
      </div>
      <div class="flex-1 card bg-base-200">
        <div class="card-body">
          <h2 class="card-title text-base">{{ t('home.features[3].title') }}</h2>
          <p>{{ t('home.features[3].description') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
