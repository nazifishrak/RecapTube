import './ResponseSection.css'
const ResponseSection = ({keypoints, notes}) => {

    return(
        <div className="cards-container">

            <div id="card1">
                <p className="text-xl font-bold mb-4 text-gray-800">Wide Card</p>
                <p className="text-gray-700">
                    {keypoints}
                </p>
            </div>

            <div id="card2">
                <p className="text-xl font-bold mb-4 text-gray-800">Tall Card</p>
                <p className="text-gray-700">
                    {notes}
                </p>
            </div>
        </div>
    )
}

export default ResponseSection;