import React, { useState } from 'react';
import {BeatLoader} from "react-spinners";
import ReactMarkdown from "react-markdown";

function FurtherQues() {
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const sendPromptToServer = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:3000/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({prompt}) // Send the link state in the request body
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = await response.json();
            setMessages(responseData);
            console.log(responseData);
        } catch (error) {
            console.error('There was an error!', error);
        }

        setIsLoading(false);
    };

    return (
        <div>
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type your question here..."
            />
            <button onClick={sendPromptToServer} disabled={isLoading}>Send</button>
            {isLoading && <BeatLoader size={15} color={"#123abc"} />}
            <div id = "card1">
                <ReactMarkdown children = {messages?messages.answer:''}/>
            </div>
        </div>
    );
}

export default FurtherQues;
