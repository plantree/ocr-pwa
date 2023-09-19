export default {
  header: {
    theme: 'theme',
    language: 'language'
  },
  home: {
    title: 'An Easy Tool For OCR',
    subTitle: 'Extracting Text From Images Offline',
    enter: 'Start OCR',
    guide: 'How to use?',
    features: [
      {
        title: 'Easy to Use',
        description: 'Upload or paste an image, and you will get the text'
      },
      {
        title: 'Focus on Privacy',
        description: 'No network required, all OCR operations are performed locally'
      },
      {
        title: 'Extendable Engines',
        description: 'Support Tesseract.js, etc.'
      },
      {
        title: 'Support Multiple Languages',
        description: 'Support English, Chinese, etc.'
      }
    ]
  },
  ocr: {
    upload: {
      title: 'Click or drag',
      subTitle: 'Support jpg, png, bmp, tiff, webp, etc.'
    },
    preview: 'preview',
    kbd: '(Read image from cliboard)',
    status: {
      loading: 'Loading',
      recognizing: 'Recognizing'
    },
    engineOptions: ['OCR Engines', 'Tesseract.js (default)', '(Extendable...)'],
    result: 'OCR result',
    operations: {
      copy: 'Copy',
      prettify: 'Prettify',
      raw: 'Raw'
    },
    modal: {
      copy: {
        success: 'Copied to clipboard',
        failed: 'Failed to copy'
      },
      prettify: {
        success: 'Prettified'
      },
      raw: {
        success: 'Reset to raw'
      }
    }
  },
  serviceWorker: {
    prompt: {
      update: {
        title: 'New version available',
        content: 'Click on refresh button to update.',
        button: 'Refresh'
      },
      offline: {
        title: 'Offline mode is ready!',
        button: 'Got it'
      }
    }
  }
};
