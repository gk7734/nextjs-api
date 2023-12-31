import {useRef, useState} from "react";

function HomePage() {
    const [feedbackItems, setFeedbackItems] = useState([]);

    const emailInputRef = useRef();
    const feedbackInputRef = useRef();

    function submitFormHandler(event) {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredFeedback = feedbackInputRef.current.value;

        const reqBody = {
            email: enteredEmail,
            text: enteredFeedback
        };

        fetch('/api/feedback', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((data) => console.log(data));
    }

    function loadFeedbackHandler() {
        fetch('/api/feedback')
            .then((response) => response.json())
            .then((data) => {
                setFeedbackItems(data.feedback)
            });
    }

    return (
        <div>
            <h1 className="text-rose-400 text-2xl">The Home Page</h1>
            <form onSubmit={submitFormHandler}>
                <div>
                    <label htmlFor="email">Your Email Address</label>
                    <input type="email" id="email" ref={emailInputRef}/>
                </div>
                <div>
                    <label htmlFor="feedback">Your Feedback</label>
                    <textarea id="feedback" rows="5" ref={feedbackInputRef}></textarea>
                </div>
                <button className='p-1 bg-blue-300 text-rose-200 rounded-xl hover:bg-blue-600'>Send Feedback</button>
            </form>
            <hr />
            <button onClick={loadFeedbackHandler} className='p-1 bg-blue-300 text-rose-200 rounded-xl hover:bg-blue-600'>Load Feedback</button>
            <ul>
                {feedbackItems.map((item) => <li key={item.id} className='p-3'>{item.text}</li>)}
            </ul>
        </div>
    );
}

export default HomePage;