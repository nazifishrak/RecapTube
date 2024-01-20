import React, { useState } from 'react';

const PromptTextBox = ({ placeholder, onTextChange }) => {
    const [text, setText] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
        if (onTextChange) {
            onTextChange(event.target.value);
        }
    };

    return (
        <div>

            <input
                type="text"
                placeholder={placeholder}
                value={text}
                onChange={handleChange}
                className="text-box" // You can set your class for styling
            />
            <button> Find notes</button>
        </div>

    );
};

export default PromptTextBox;