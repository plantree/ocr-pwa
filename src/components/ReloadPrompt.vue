<script setup lang="ts">
import { h } from 'vue';
import { useNotification, NButton, NSpace } from 'naive-ui';
import { useRegisterSW } from 'virtual:pwa-register/vue';
import { pwaInfo } from 'virtual:pwa-info';
import { REFRESH_TIMEOUT } from '@/constants';
import { useI18n } from 'vue-i18n';

// eslint-disable-next-line no-console
console.log(pwaInfo);

const reloadSW: boolean = true;
const notification = useNotification();
const { t } = useI18n();

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
  immediate: true,
  onRegisteredSW(swUrl, r) {
    // eslint-disable-next-line no-console
    console.log(`Service Worker at: ${swUrl}`);
    if (reloadSW) {
      r &&
        setInterval(async () => {
          // eslint-disable-next-line no-console
          console.log('Checking for sw update at ' + new Date().toLocaleString());
          await r.update();
        }, REFRESH_TIMEOUT);
    } else {
      // eslint-disable-next-line no-console
      console.log(`SW Registered: ${r}`);
    }
  },
  onNeedRefresh() {
    needRefresh.value = true;
    notification.info({
      title: () => t('serviceWorker.prompt.update.title'),
      content: () => t('serviceWorker.prompt.update.content'),
      action: () =>
        h(
          NButton,
          {
            text: true,
            type: 'primary',
            onClick: () => {
              updateServiceWorker();
              notification.destroyAll();
            }
          },
          {
            default: () => t('serviceWorker.prompt.update.button')
          }
        ),
      onClose: () => {
        close();
      }
    });
  },
  onOfflineReady() {
    offlineReady.value = true;
    notification.info({
      title: () => t('serviceWorker.prompt.offline.title'),
      action: () =>
        h(
          NButton,
          {
            text: true,
            type: 'primary',
            onClick: () => {
              close();
              notification.destroyAll();
            }
          },
          {
            default: () => t('serviceWorker.prompt.offline.button')
          }
        ),
      onClose: () => {
        close();
      }
    });
  }
});

function close() {
  needRefresh.value = false;
  offlineReady.value = false;
}
</script>

<template>
  <n-space></n-space>
</template>
