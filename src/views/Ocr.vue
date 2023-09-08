<script setup lang="ts">
import { ref } from 'vue';
import { UploadFileInfo, useMessage } from 'naive-ui';
import useClipboard from 'vue-clipboard3';

import { recognize } from '@/ocr/tesseract';
import { cleanText } from '@/utils/strings';

enum LoadStatus {
  NotStart,
  Loading,
  Success,
  Fail
}

const internalFileList = ref([]);
const fileList = ref<UploadFileInfo[]>();
const previewSrc = ref('');
// load status of preview image
const loadStatus = ref<LoadStatus>(LoadStatus.NotStart);
const recognizeText = ref('');
const prettifiedText = ref('');

async function handleFileListChange() {
  const newFile = fileList.value?.[fileList.value.length - 1] as UploadFileInfo;
  console.log(newFile);
  const url = URL.createObjectURL(newFile.file!);
  console.log(url);

  previewSrc.value = url;
  loadStatus.value = LoadStatus.Loading;
  const str = await recognize(url);
  recognizeText.value = str;
  prettifiedText.value = str;
}

function handleDrop(event) {
  event.preventDefault();
  const files = event.dataTransfer.files;
  fileList.value = [];
  internalFileList.value.concat(files);
}

// event handlers
const { toClipboard } = useClipboard();
const message = useMessage();

async function copyText() {
  try {
    await toClipboard(prettifiedText.value);
    message.success('Copied to clipboard');
  } catch (e) {
    console.error(e);
    message.error('Failed to copy');
  }
}

function prettifyText() {
  prettifiedText.value = cleanText(recognizeText.value);
  message.success('Prettified');
}

function resetText() {
  prettifiedText.value = recognizeText.value;
  message.success('Reset to raw');
}

// ref: https://web.dev/patterns/clipboard/paste-images/
async function handlePaste(e) {
  try {
    const clipboardItems =
      typeof navigator?.clipboard?.read === 'function'
        ? await navigator.clipboard.read()
        : e.clipboardData.files;
    for (const clipboardItem of clipboardItems) {
      let blob;
      if (clipboardItem.type?.startsWith('image/')) {
        // For files from `e.clipboardData.files`.
        blob = clipboardItem;
      } else {
        // For files from `navigator.clipboard.read()`.
        const imageTypes = clipboardItem.types?.filter((type) => type.startsWith('image/'));
        for (const imageType of imageTypes) {
          blob = await clipboardItem.getType(imageType);
        }
      }
      const url = URL.createObjectURL(blob);
      previewSrc.value = url;
      loadStatus.value = LoadStatus.Loading;
      const str = await recognize(url);
      recognizeText.value = str;
      prettifiedText.value = str;
    }
  } catch (e) {
    console.error(e);
    message.error('Failed to paste');
  }
}
</script>

<template>
  <div class="flex flex-col my-16 mx-8 gap-4 justify-around md:flex-row" @paste="handlePaste">
    <div class="flex flex-col gap-4 md:w-2/5">
      <n-upload
        v-model:file-list="fileList"
        accept="image/*"
        :show-file-list="false"
        :default-upload="false"
        @update:file-list="handleFileListChange"
      >
        <n-upload-dragger @drop="handleDrop" @dragover.prevent>
          <div>
            <n-icon size="32" :depth="3">
              <archive-icon />
            </n-icon>
          </div>
          <n-text class="text-md font-bold"> 点击或者拖动图片到该区域来上传 </n-text>
          <n-p depth="3"> 请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码 </n-p>
        </n-upload-dragger>
      </n-upload>

      <h2 class="title capitalize text-lg font-bold">preview</h2>
      <div>
        <kbd class="kbd">ctrl</kbd>
        +
        <kbd class="kbd">v</kbd>
      </div>
      <div class="border-2 rounded border-slate-200 p-2 h-48">
        <n-image
          :src="previewSrc"
          :object-fit="'contain'"
          :img-props="{ id: 'previewImg' }"
          @load="loadStatus = LoadStatus.Success"
          @error="loadStatus = LoadStatus.Fail"
        />
      </div>
      <n-modal :show="loadStatus === LoadStatus.Loading">
        <n-card class="w-1/2" size="huge" :bordered="false" role="dialog" aria-modal="true">
          <n-spin size="large" class="flex"></n-spin>
        </n-card>
      </n-modal>
    </div>

    <div class="flex flex-col gap-4 md:w-2/5">
      <h2 class="title capitalize text-lg font-bold">OCR result</h2>
      <div class="flex flex-grow border-2 rounded overflow-y-auto h-64">
        <pre class="whitespace-pre-line font-sans">{{ prettifiedText }}</pre>
      </div>
      <div class="flex flex-row gap-2">
        <button class="btn normal-case" @click="copyText">Copy</button>
        <button class="btn normal-case" @click="prettifyText">Prettify</button>
        <button class="btn normal-case" @click="resetText">Raw</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NUpload, NUploadDragger, NIcon, NText, NP, NImage, NModal, NCard, NSpin } from 'naive-ui';
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5';

export default defineComponent({
  components: {
    NUpload,
    NUploadDragger,
    NIcon,
    NText,
    NP,
    NImage,
    NModal,
    NCard,
    NSpin,
    ArchiveIcon
  }
});
</script>
