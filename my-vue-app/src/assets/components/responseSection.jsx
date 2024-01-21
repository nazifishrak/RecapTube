const ResponseSection = ({keypoints, notes}) => {

    return(
        <div className="flex justify-evenly">
            <div id="card1" className="ml-20 mx-4 my-8 w-72 h-125 bg-white border border-gray-300 rounded-lg shadow-md p-8 clickable-card transition duration-300">
                <p className="text-xl font-bold mb-4 text-gray-800">Wide Card</p>
                <p className="text-gray-700">
                    {keypoints}
                </p>
            </div>

            <div id="card2" className="mr-20 mx-4 my-8 w-100 h-72 bg-white border border-gray-300 rounded-lg shadow-md p-8 clickable-card transition duration-300">
                <p className="text-xl font-bold mb-4 text-gray-800">Tall Card</p>
                <p className="text-gray-700">
                    {notes}
                </p>
            </div>
        </div>
    )
}

export default ResponseSection;