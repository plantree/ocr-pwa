function cleanText(inputText: string): string {
  inputText = inputText.replace(/\r/g, '\n');
  inputText = inputText.replace(/\n+/g, '\n');
  const arr = inputText.split('\n');
  const brr: string[] = [];
  arr.forEach((item) => {
    if (item.trim()) {
      brr.push(item.trim());
    }
  });
  const cleanedText = brr.join('\n');
  return cleanedText.replace(/ /g, '');
}

export { cleanText };
