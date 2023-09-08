import { createWorker } from 'tesseract.js';

const worker = await createWorker({
  logger: (m) => console.log(m)
});

(async () => {
  /** You can load more languages in advance, but use only part of them in Worker.initialize() */
  await worker.loadLanguage('eng+chi_sim');
  await worker.initialize('eng+chi_sim');
})();

export const recognize = async (imageUrl: string) => {
  const {
    data: { text }
  } = await worker.recognize(imageUrl);
  return text;
};
