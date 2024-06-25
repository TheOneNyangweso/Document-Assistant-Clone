import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import 'bulma/css/bulma.min.css';

const UPLOAD_URL = 'http://0.0.0.0:8003/chat/api/v0/upload';

const FileUploader = ({ onUpload }) => {
  const [uploadedFilePath, setUploadedFilePath] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const uploadFile = useCallback(
    async (file) => {
      setIsLoading(true);
      setError('');
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post(UPLOAD_URL, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setUploadedFilePath(response.data.saved_file_path);

        // Call onUpload prop with the response data
        if (typeof onUpload === 'function') {
          onUpload(response.data);
        }
      } catch (err) {
        setError('Failed to upload file.');
      } finally {
        setIsLoading(false);
      }
    },
    [onUpload]
  );

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        uploadFile(file);
      }
    },
    [uploadFile]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.doc,.docx,.txt,.pdf',
    multiple: false,
  });

  return (
    <div className="box file-uploader notification is-primary">
      <div {...getRootProps()} style={{ cursor: 'pointer' }}>
        <input {...getInputProps()} />
        <p className="subtitle">
          Drag & drop a file here, or click to select a file
        </p>
        <p className="subtitle">(.doc, .docx, .txt, .pdf)</p>
      </div>
      {isLoading && <p>Uploading...</p>}
      {uploadedFilePath && (
        <p className="notification is-success">
          File uploaded successfully: {uploadedFilePath}
        </p>
      )}
      {error && <p className="notification is-danger">{error}</p>}
    </div>
  );
};

export default FileUploader;
