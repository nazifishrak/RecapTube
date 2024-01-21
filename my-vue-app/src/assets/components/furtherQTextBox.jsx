import React, { useState } from 'react';
import FurtherAnswerTextBox from "./furtherAnswerBox.jsx";
import "./furtherQTextBox.css";

const FurtherQTextBox = ({ placeholder, onTextChange }) => {
    const [text, setText] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
        if (onTextChange) {
            onTextChange(event.target.value);
        }
    };

    return (
        <div className= "followUp">

            <input
                type="text"
                placeholder={placeholder}
                value={text}
                onChange={handleChange}
                className="text-box" // You can set your class for styling
            />
            <button> Find answers</button>

        </div>

    );
};

export default FurtherQTextBox;