<template>
  <!-- Naive UI Golbal Configs-->
  <n-config-provider :theme="theme">
    <div class="flex flex-col min-h-screen justify-between">
      <AppHeader @update-theme="changeTheme" />
      <main class="flex-grow">
        <n-message-provider>
          <router-view />
        </n-message-provider>
      </main>
      <AppFooter />
    </div>
    <n-notification-provider :max="1" :placement="'bottom-right'">
      <ReloadPrompt />
    </n-notification-provider>
  </n-config-provider>
</template>

<script lang="ts">
import AppHeader from './layouts/AppHeader.vue';
import AppFooter from './layouts/AppFooter.vue';
import ReloadPrompt from './components/ReloadPrompt.vue';

import { defineComponent, ref } from 'vue';
import { NMessageProvider, NConfigProvider, darkTheme, NNotificationProvider } from 'naive-ui';
import type { GlobalTheme } from 'naive-ui';

export default defineComponent({
  components: {
    AppHeader,
    AppFooter,
    NMessageProvider,
    NConfigProvider,
    NNotificationProvider,
    ReloadPrompt
  },
  setup() {
    const theme = ref<GlobalTheme | null>(null);
    const changeTheme = (isDark: boolean) => {
      theme.value = isDark ? darkTheme : null;
    };
    return {
      darkTheme,
      theme,
      changeTheme
    };
  }
});
</script>
