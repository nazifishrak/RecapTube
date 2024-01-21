import './ResponseSection.css'
import ReactMarkdown from 'react-markdown';
import FurtherQues from "./FurtherQues.jsx";
const ResponseSection = ({keypoints, notes}) => {

    return(
        <div className="cards-container">

            <div id="card1">
                <p className="text-xl font-bold mb-4 text-gray-800"></p>
                <p className="text-gray-700">
                    <ReactMarkdown children = {keypoints}/>
                </p>
            </div>
            <FurtherQues/>
        </div>
    )
}

export default ResponseSection;