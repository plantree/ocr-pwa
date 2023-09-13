export default {
  header: {
    theme: '主题',
    language: '语言'
  },
  home: {
    title: '一个极简的OCR工具',
    subTitle: '无需安装，支持离线图片文字提取',
    enter: '开始识别',
    guide: '如何使用?',
    features: [
      {
        title: '易于使用',
        description: '只需上传或直接粘贴，即可识别图片文字'
      },
      {
        title: '聚焦隐私',
        description: '无需网络访问，本地处理，专注隐私保护'
      },
      {
        title: '可扩展引擎',
        description: '目前支持Tesseract，后序待扩展'
      },
      {
        title: '多语言',
        description: '支持中文，英语等多种语言'
      }
    ]
  },
  ocr: {
    upload: {
      title: '点击或拖拽',
      subTitle: '支持 jpg, png, bmp, tiff, webp, 等.'
    },
    preview: '预览',
    status: {
      loading: '加载',
      recognizing: '识别'
    },
    engineOptions: ['OCR 引擎', 'Tesseract.js (默认)', '(待扩展)'],
    result: 'OCR 结果',
    operations: {
      copy: '拷贝',
      prettify: '美化',
      raw: '原始结果'
    }
  }
};