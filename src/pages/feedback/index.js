import {Fragment, useState} from "react";
import {buildFeedbackPath, extractFeedback} from "@/pages/api/feedback";

function FeedbackPage(pros) {
    const [feedbackData, setFeedbackData] = useState();
    
    function loadFeedbackHandler(id) {
        fetch(`/api/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setFeedbackData(data.feedback)
            })
    }


    return (
        <Fragment>
            {feedbackData && <p>{feedbackData.email}</p>}
            <ul>
                {pros.feedbackItems.map((item) => (
                    <li key={item.id} className='m-3'>
                        {item.text}
                        <button onClick={loadFeedbackHandler.bind(null, item.id)} className="m-1 p-1 bg-blue-600 shadow-2xl shadow-orange-300 rounded-xl hover:bg-blue-400">
                            Show Details
                        </button>
                    </li>
                ))}
            </ul>
        </Fragment>
    )
}

export async function getStaticProps() {
    const filePath = buildFeedbackPath()
    const data = extractFeedback(filePath)

    return {
        props: {
            feedbackItems: data
        }
    }
}

export default FeedbackPage;