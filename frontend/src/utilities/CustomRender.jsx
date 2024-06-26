function getHighlightedText(originalText, improvedText) {
  const originalWords = originalText.split(' ');
  const improvedWords = improvedText.split(' ');
  const highlightedText = improvedWords.map((word, index) => {
    if (word !== originalWords[index]) {
      return `<span style="color: red;">${word}</span>`;
    }
    return word;
  });
  return highlightedText.join(' ');
}

export default getHighlightedText;
