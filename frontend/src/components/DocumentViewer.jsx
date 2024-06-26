import React, { useState } from 'react';
import FileUploader from './FileUploader';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
// import HighlightedTextRenderer from './CustomRenderer'; // Future renderer to higlight changes
import { FaLightbulb } from 'react-icons/fa';
import AcceptImprovements from './AcceptImprovements';
import '../styles/styles.css'; // CSS file
import '../styles/renderer.css';

function DocumentViewer() {
  const [docs1, setDocs1] = useState([]);
  const [docs2, setDocs2] = useState([]);
  const [suggestion, setSuggestion] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filesUploaded, setFilesUploaded] = useState(false);

  const handleFileUpload = (response) => {
    console.log('File upload response:', response); // Log the response received {just testing}

    const { saved_file_path, improved_file_path, suggestion } = response;

    // Construct base URL for backend
    const baseUrl = 'http://0.0.0.0:8003/'; // Replace with your actual backend base URL

    // Update docs1 with saved_file_path
    setDocs1([
      {
        uri: `${baseUrl}${saved_file_path}`, // Construct full URL for saved file
        fileName: 'Uploaded File',
      },
    ]);

    // Update docs2 with improved_file_path
    setDocs2([
      {
        uri: `${baseUrl}${improved_file_path}`, // Construct full URL for improved file
        fileName: 'Improved File',
      },
    ]);

    setSuggestion(suggestion);
    setFilesUploaded(true);
  };

  const toggleSuggestions = () => {
    setShowSuggestions(!showSuggestions);
  };

  const handleAcceptImprovements = (newImprovedFilePath) => {
    setDocs2([
      {
        uri: `${newImprovedFilePath}`,
        fileName: 'Improved File',
      },
    ]);
  };

  return (
    <div className="container">
      <div className="columns is-vcentered">
        <div className="column is-8">
          <div>
            <h2 className="title is-3">AI Document Assistant</h2>
            <p className="subtitle is-5">version 0.1.0</p>
          </div>
        </div>
        <div className="column is-4">
          <div className="has-text-centered">
            <FileUploader onUpload={handleFileUpload} />
          </div>
        </div>
      </div>

      <div
        className={`document-viewer-container ${
          showSuggestions ? 'show-suggestions' : ''
        }`}
      >
        <div className="document-viewer">
          <DocViewer
            documents={docs1}
            pluginRenderers={DocViewerRenderers}
            className="original"
          />
        </div>
        <div className="document-viewer">
          <DocViewer
            documents={docs2}
            pluginRenderers={DocViewerRenderers}
            className="improved"
          />
        </div>
        {filesUploaded && (
          <FaLightbulb
            className={`suggestion-icon ${showSuggestions ? 'clicked' : ''}`}
            onClick={toggleSuggestions}
          />
        )}
        {showSuggestions && (
          <AcceptImprovements
            suggestion={suggestion}
            improvedFilePath={docs2[0]?.uri}
            onAccept={handleAcceptImprovements}
          />
        )}
      </div>
    </div>
  );
}

// A fallback function incase...
const DocViewerWithInputApp = () => {
  const [selectedDocs, setSelectedDocs] = useState([]);

  return (
    <>
      <input
        type="file"
        accept=".pdf"
        multiple
        onChange={(el) =>
          el.target.files?.length &&
          setSelectedDocs(Array.from(el.target.files))
        }
      />
      <DocViewer
        documents={selectedDocs.map((file) => ({
          uri: window.URL.createObjectURL(file),
          fileName: file.name,
        }))}
        pluginRenderers={[DocViewerRenderers]}
      />
    </>
  );
};

export { DocViewerWithInputApp, DocumentViewer };
