import React, { useState } from 'react';
import responseSection from "./responseSection.jsx";
import ResponseSection from "./responseSection.jsx";

const PromptTextBox = ({ placeholder, onTextChange }) => {
    const [link, setLink] = useState('');
    const[response, setResponse] = useState(null);

    const handleChange = (event) => {
        setLink(event.target.value);
        if (onTextChange) {
            onTextChange(event.target.value);
        }
    };

    const handleClick = async () => {
        try {
            const response = await fetch('http://localhost:3000/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ link}) // Send the text state in the request body
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            setResponse(responseData);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <div>

            <input
                type="text"
                placeholder={placeholder}
                value={link}
                onChange={handleChange}
                className="text-box" // You can set your class for styling
            />
            <button onClick={handleClick}> Find notes</button>

            <ResponseSection keypoints= {response?response.url: ''} notes = {response?response.transcript:''}> </ResponseSection>



        </div>

    );
};

export default PromptTextBox;
