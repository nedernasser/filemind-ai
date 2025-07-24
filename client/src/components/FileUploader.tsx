import { JSX, useState, useRef } from 'react';
import axios from 'axios';

type Props = {
  onUploadSuccess: () => void;
};

const FileUploader: React.FC<Props> = ({ onUploadSuccess }): JSX.Element => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const upload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      await axios.post('http://localhost:3000/file/upload', formData);
      alert('Uploaded successfully!');
      onUploadSuccess();

      // Clear selected file and reset input element
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-6">
      <label htmlFor="file-upload">File</label>
      <input
        type="file"
        ref={fileInputRef}
        id="file-upload"
        onChange={e => setFile(e.target.files?.[0] ?? null)}
      />
      <button
        onClick={upload}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default FileUploader;
