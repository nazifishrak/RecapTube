import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HeroSection from "./assets/components/heroSection.jsx";
import PromptTextBox from "./assets/components/promptTextBox.jsx";
import FurtherQTextBox from "./assets/components/furtherQTextBox.jsx";
import FurtherAnswerTextBox from "./assets/components/furtherAnswerBox.jsx";

function App() {
  const [count, setCount] = useState(0)
    const handleTextChange = (newText) => {
        console.log("Text changed to:", newText);
    };

  return (

    <>
      <div className= "landing">
          <HeroSection/>
          <PromptTextBox placeholder= "Enter youtube link here" onTextChange={handleTextChange}/>
          <FurtherQTextBox placeholder= "Follow-up questions?"/>
          <FurtherAnswerTextBox/>
      </div>
    </>
  )
}

export default App
