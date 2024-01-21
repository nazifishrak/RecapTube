import React, { useState } from 'react';
import ResponseSection from "./responseSection.jsx";
import {BeatLoader} from "react-spinners";

const PromptTextBox = ({ placeholder, onTextChange }) => {
    const [link, setLink] = useState('');
    const[response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event) => {
        setLink(event.target.value);
        if (onTextChange) {
            onTextChange(event.target.value);
        }
    };

    const handleClick = async () => {

        setIsLoading(true); // Start loading
        try {
            const response = await fetch('http://localhost:3000/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({link}) // Send the link state in the request body
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = await response.json();
            setResponse(responseData);
        } catch (error) {
            console.error('There was an error!', error);
        }
        setIsLoading(false); // Stop loading
    };


    return (
        <div className="prompt-box">
            <input
                type="text"
                placeholder={placeholder}
                value={link}
                onChange={handleChange}
                className="text-box"
                style = {{width:"65%" ,height: "30px", display:"block" , margin: "0 auto", textAlign: "center" ,fontSize:"20px"}}
            />
            <button onClick={handleClick} disabled={isLoading} style={{margin:"10 px"}}>Find notes</button>

            {/* Display spinner when loading */}
            {isLoading && <BeatLoader size={15} color={"#123abc"} />}

            <ResponseSection keypoints={response ? response.notes : ''} notes={response ? response.notes : ''} />
        </div>
    );

};

export default PromptTextBox;
