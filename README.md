# ocr-pwa

A simple PWA for OCR, based on Tesseract.

![](http://img.plantree.me/20230920104759.png)

## Preview

[https://ocr.plantree.me/](https://ocr.plantree.me/)

## Introduction

This is a simple tool for OCR, and it can be used **without network connection**.

There're already many OCR tools on the market, even if iPhone and WeChat could do that easily. Why do I still do it?

There are about two reasons:

1. I want to do OCR **easily** on the desktop, but I do not want to install any applications.
2. I hope the tool could be used **offline**.

Therefore, this project has four features you might be interested:

1. Easy to use. This is a PWA and you can install it easily from the browser and use is offline.
2. Focus on privacy. Thanks to the development of WebAssembly, we can introduce some awesome native tools to the web, meanwhile avoid interactions with servers.
3. Extendable Engines. Currently supports Tesseract only, and may support PaddlePaddle afterwards.
4. Support Multiple Languages. Potential support list could be found here: https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions.html.

## Develop

This project is built with `Vite`, `Vue3` and `TypeScript`.

```bash
# 1. git clone
git clone git@github.com:plantree/ocr-pwa.git

# 2. Install depencies
pnpm install

# 3. Run
npm run dev
```

## Issues

Please submit your issues [here](https://github.com/plantree/ocr-pwa/issues).

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2023-present, Plantree
