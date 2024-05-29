import React, { useState } from 'react';

const CodeInput = ({ handleSubmit }) => {
    const [code, setCode] = useState('');

    const handleChange = (e) => {
        setCode(e.target.value);
    };

    const testCode = async () => {
        await handleSubmit(code);
    };

    return (
        <div className='text-center'>
            <textarea
                value={code}
                onChange={handleChange}
                placeholder="move('down');"
                spellCheck="false"
                style={{
                    width: '100%',
                    height: '300px',
                    fontFamily: 'Courier New, Courier, monospace',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: '#f7f7f7',
                    resize: 'vertical',
                }}
            />
            <button className='btn btn-primary' onClick={testCode}>
                Test code
            </button>
        </div>
    );
};

export default CodeInput;
