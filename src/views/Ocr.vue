<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { UploadFileInfo, useMessage } from 'naive-ui';
import useClipboard from 'vue-clipboard3';

import TesseractEngine from '@/ocr/tesseract';
import { cleanText } from '@/utils/strings';
import { useI18n } from 'vue-i18n';

import { DEFAULT_TIMEOUT } from '@/constants';

const { t } = useI18n();

enum Status {
  NotStart,
  Loading,
  Loaded,
  Recognizing,
  Success,
  Fail
}

const internalFileList = ref([]);
const fileList = ref<UploadFileInfo[]>();
const previewSrc = ref('');
// status of load image and recognize
const progressStatus = ref<Status>(Status.NotStart);
const isShowModal = ref(false);
const modalTimeout = ref(DEFAULT_TIMEOUT);

const recognizeText = ref('');
const prettifiedText = ref('');

/* OCR engine */
const tesseract = new TesseractEngine();

/* eslint-disable no-console */ // Отключение правила ESLint no-console
async function tesseractRecognize(url: string) {
  progressStatus.value = Status.Recognizing;
  try {
    const str = await tesseract.recognize(url);
    progressStatus.value = Status.Success;
    recognizeText.value = str;
    prettifiedText.value = str;
  } catch (e) {
    progressStatus.value = Status.Fail;
    console.error(e);
  }
  countdown();
}

function countdown() {
  if (modalTimeout.value > 0) {
    modalTimeout.value--;
    setTimeout(countdown, 1000);
  } else {
    isShowModal.value = false;
    modalTimeout.value = DEFAULT_TIMEOUT;
  }
}

async function handleFileListChange() {
  const newFile = fileList.value?.[fileList.value.length - 1] as UploadFileInfo;
  const url = URL.createObjectURL(newFile.file!);

  previewSrc.value = url;
  progressStatus.value = Status.Loading;
  isShowModal.value = true;
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
    message.success(t('ocr.modal.copy.success'));
  } catch (e) {
    console.error(e);
    message.error(t('ocr.modal.copy.failed'));
  }
}

function prettifyText() {
  prettifiedText.value = cleanText(recognizeText.value);
  message.success(t('ocr.modal.prettify.success'));
}

function resetText() {
  prettifiedText.value = recognizeText.value;
  message.success(t('ocr.modal.raw.success'));
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
      progressStatus.value = Status.Loading;
      isShowModal.value = true;
    }
  } catch (e) {
    console.error(e);
    message.error('Failed to paste');
  }
}

async function loadSuccess() {
  progressStatus.value = Status.Loaded;
  await tesseractRecognize(previewSrc.value);
}

function loadFailed() {
  progressStatus.value = Status.Fail;
}

/* hook functions */
onMounted(async () => {
  await tesseract.init();
});
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
          <n-text class="text-md font-bold capitalize">{{ t('ocr.upload.title') }}</n-text>
          <n-p depth="3">{{ t('ocr.upload.subTitle') }}</n-p>
        </n-upload-dragger>
      </n-upload>

      <h2 class="title capitalize text-lg font-bold">{{ t('ocr.preview') }}</h2>
      <div>
        <kbd class="kbd">ctrl</kbd>
        +
        <kbd class="kbd">v</kbd>
        <span class="ml-2">{{ t('ocr.kbd') }}</span>
      </div>
      <div class="border-2 rounded border-slate-200 p-2 h-48">
        <n-image
          :src="previewSrc"
          :object-fit="'contain'"
          :img-props="{ id: 'previewImg' }"
          @load="loadSuccess()"
          @error="loadFailed()"
        />
      </div>
      <!-- eslint-disable -->
      <n-modal v-model:show="isShowModal">
        <n-card
          class="w-4/5 md:w-1/2"
          size="huge"
          :bordered="false"
          preset="dialog"
          aria-modal="true"
          :closable="true"
          :on-close="
            () => {
              isShowModal = false;
            }
          "
        >
          <ul class="steps w-full">
            <li
              class="step"
              :class="progressStatus >= Status.Loaded ? 'step-success' : 'step-error'"
            >
              {{ t('ocr.status.loading') }}
            </li>
            <li
              class="step"
              :class="
                progressStatus < Status.Success
                  ? ''
                  : progressStatus === Status.Success
                  ? 'step-success'
                  : 'step-error'
              "
            >
              {{ t('ocr.status.recognizing') }}
            </li>
          </ul>
          <p class="mt-4 text-right">{{ modalTimeout }} (s)</p>
        </n-card>
      </n-modal>
    </div>

    <div class="flex flex-col gap-4 md:w-2/5">
      <select class="select select-bordered w-full max-w-xs">
        <option disabled selected>{{ t('ocr.engineOptions[0]') }}</option>
        <option>{{ t('ocr.engineOptions[1]') }}</option>
        <option disabled>{{ t('ocr.engineOptions[2]') }}</option>
      </select>
      <h2 class="title capitalize text-lg font-bold">{{ t('ocr.result') }}</h2>
      <div class="flex flex-grow border-2 rounded overflow-y-auto h-64">
        <textarea
          v-model="prettifiedText"
          cols="0"
          class="w-full whitespace-pre-line font-sans"
        ></textarea>
      </div>
      <div class="flex flex-row gap-2">
        <button class="btn normal-case" @click="copyText">{{ t('ocr.operations.copy') }}</button>
        <button class="btn normal-case" @click="prettifyText">
          {{ t('ocr.operations.prettify') }}
        </button>
        <button class="btn normal-case" @click="resetText">{{ t('ocr.operations.raw') }}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NUpload, NUploadDragger, NIcon, NText, NP, NImage, NModal, NCard } from 'naive-ui';
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
    ArchiveIcon
  }
});
</script>
