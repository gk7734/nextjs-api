import {buildFeedbackPath, extractFeedback} from "@/pages/api/feedback";


function FeedbackPage(pros) {
    return (
        <ul>
            {pros.feedbackItems.map((item) => (
                <li key={item.id}>{item.text}</li>
            ))}
        </ul>
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