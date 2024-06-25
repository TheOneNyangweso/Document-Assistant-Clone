import React from 'react';
import getHighlightedText from '../utility/customRender'; // Import the utility function

const HighlightedTextRenderer = ({
  mainState: { currentDocument },
  config,
}) => {
  if (!currentDocument || !config) return null;

  const { documents, originalDocumentIndex } = config;
  const originalDocument = documents[originalDocumentIndex];
  const improvedText = currentDocument.fileData;
  const originalText = originalDocument.fileData;

  const highlightedText = getHighlightedText(originalText, improvedText);

  return (
    <div
      id="highlighted-text-renderer"
      dangerouslySetInnerHTML={{ __html: highlightedText }}
    />
  );
};

HighlightedTextRenderer.fileTypes = ['text/plain'];
HighlightedTextRenderer.weight = 1;

export default HighlightedTextRenderer;
