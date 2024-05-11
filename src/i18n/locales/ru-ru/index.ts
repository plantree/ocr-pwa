export default {
  header: {
    theme: 'Тема',
    language: 'Язык'
  },
  home: {
    title: 'Простой инструмент для распознавания текста',
    subTitle: 'Распознавание текста по картинке оффлайн',
    enter: 'Начни распознание',
    guide: 'Как использовать?',
    features: [
      {
        title: 'Легко использовать',
        description: 'Загрузите или вставьте изображение, и вы получите текст'
      },
      {
        title: 'Полная конфиденциальность',
        description: 'Не требуется интернет-подключение, все OCR операции выполняются оффлайн'
      },
      {
        title: 'Расширяемый движок',
        description: 'Поддержка Tesseract.js и т.д.'
      },
      {
        title: 'Поддержка ',
        description: 'Поддерживает: Английский, Китайский и другие языки.'
      }
    ]
  },
  ocr: {
    upload: {
      title: 'Нажми или перетащи',
      subTitle: 'Поддерживает jpg, png, bmp, tiff, webp, и другие форматы.'
    },
    preview: 'Превью',
    kbd: '(Считать изображение с буфера обмена)',
    status: {
      loading: 'Загрузка',
      recognizing: 'Распознавание'
    },
    engineOptions: ['OCR Engines', 'Tesseract.js (default)', '(Extendable...)'],
    result: 'OCR результат',
    operations: {
      copy: 'Копировать',
      prettify: 'Усовершенствовать',
      raw: 'Необработанный'
    },
    modal: {
      copy: {
        success: 'Скопировть в буфер обмена',
        failed: 'Не удалось скопировать'
      },
      prettify: {
        success: 'Усовершенствовать'
      },
      raw: {
        success: 'Вернуть в исходное состояние'
      }
    }
  },
  serviceWorker: {
    prompt: {
      update: {
        title: 'Доступна новая версия',
        content: 'Нажмите на кнопку обновить, для обновления.',
        button: 'Перезагрузить'
      },
      offline: {
        title: 'Оффлайн режим готов!',
        button: 'Понял'
      }
    }
  }
};
