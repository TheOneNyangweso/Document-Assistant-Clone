import React from 'react';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import '@cyntler/react-doc-viewer/dist/index.css';

function DocumentViewer({ docs }) {
  return (
    <div className="document-viewer-container">
      {docs.map((doc, index) => (
        <div className="document-viewer" key={index}>
          <DocViewer documents={[doc]} pluginRenderers={DocViewerRenderers} />
        </div>
      ))}
    </div>
  );
}

export default DocumentViewer;
