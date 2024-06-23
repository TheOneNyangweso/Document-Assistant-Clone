import React from 'react';

const PATH_PREFIX =
  '/home/nyangweso/Desktop/Projects/Document-Assistant/backend';

function DocumentUploader({ addDocument }) {
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/chat/api/v0/upload', {
          method: 'POST',
          headers: {
            accept: 'application/json',
          },
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          const newDocs = [
            {
              uri: `${PATH_PREFIX}${data.saved_file_path}`,
              fileName: `Original - ${file.name}`,
            },
            {
              uri: `{PATH_PREFIX}${data.improved_file_path}`,
              fileName: `Improved - ${file.name}`,
            },
          ];
          addDocument(newDocs);
        } else {
          console.error('File upload failed:', response.statusText);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <div className="document-uploader">
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
}

export default DocumentUploader;
