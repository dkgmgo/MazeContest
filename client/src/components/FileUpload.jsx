import React, { useState } from 'react';

function FileUpload({ onUploadSuccess }) {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('http://localhost:3001/upload', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            alert('File uploaded successfully');
            onUploadSuccess();
        } else {
            alert('File upload failed');
        }
    };

    return (
        <div className='mt-5 text-center'>
            <h3 className='mb-4'>Upload a javascript file containing the implementation of your algorithm</h3>
            <input type="file" onChange={handleFileChange} />
            <button className='btn btn-primary' onClick={handleUpload}>Upload</button>
        </div>
    );
}

export default FileUpload;
