import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './header';
import Footer from './footer';
import './feedback.css'; // Import the custom CSS file

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!feedback || !email) {
            alert('Please fill out all fields');
            return;
        }

        const mailtoLink = `mailto:n200731@rguktn.ac.in?subject=Feedback&body=Email: ${email}%0D%0A%0D%0AFeedback: ${encodeURIComponent(feedback)}`;
        window.location.href = mailtoLink;
    };

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "What is the RGUKT grade mate?",
            answer: "The RGUKT grade mate is a web application that helps students calculate their SGPA, CGPA, and percentages."
        },
        {
            question: "How does the grade calculation work?",
            answer: "The calculation is based on the input of your grades and credits for each subject. The app uses the formula provided by RGUKT for accurate calculations."
        },
        {
            question: "Is the RGUKT grade matefree to use?",
            answer: "Yes, the calculator is completely free to use."
        },
        {
            question: "Can I use the calculator on my mobile device?",
            answer: "Yes, the application is fully responsive and works on any device."
        },
        {
            question: "What is SGPA?",
            answer: "SGPA stands for Semester Grade Point Average. It is a measure of academic performance in a semester, calculated as the weighted average of the grade points obtained in all subjects, considering the credits assigned to each subject."
        },
        {
            question: "What is CGPA?",
            answer: "CGPA stands for Cumulative Grade Point Average. It represents the average of grade points obtained in all semesters up to a given academic term. It provides an overall assessment of a student's academic performance throughout their course."
        },
        {
            question: "Why isn't the SGPA selection showing in CGPA calculation?",
            answer: "In the RGUKT grade mate, if you click on the right of the SGPA column in the table, you need to manually input the SGPA value. If you do not click on the table, the semester SGPA is automatically calculated for SGPA calculation."
        },
        {
            "question": "Why is the page so slow to use?",
            "answer": "The page might be slow because React re-renders the DOM for every change. Optimizing component updates and minimizing unnecessary re-renders can help improve performance."
        }
    ];

    const [darkMode, setDarkMode] = useState(true);

    return (
        <div className={`${darkMode ? 'dark-mode' : 'light-mode'} style`}>
            <Header toggleDarkMode={() => setDarkMode(!darkMode)} darkMode={darkMode} />
            <div className="container mt-5">
                <h2 className='glow'>Frequently Asked Questions</h2>
                <div className="accordion" id="faqAccordion">
                    {faqs.map((faq, index) => (
                        <div key={index} className="card mt-3 mb-3">
                            <div className="card-header d-flex justify-content-between align-items-center" onClick={() => toggleFAQ(index)}>
                                <h5 className="mb-0">
                                    {faq.question}
                                </h5>
                                <button
                                    className="btn arrow-button"
                                    type="button"
                                >
                                    <span className="material-symbols-outlined">
                                        {activeIndex === index ? 'arrow_drop_up' : 'arrow_drop_down'}
                                    </span>
                                </button>
                            </div>
                            <div
                                id={`collapse${index}`}
                                className={`collapse ${activeIndex === index ? 'show' : ''}`}
                                data-parent="#faqAccordion"
                            >
                                <div className="card-body">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="container mt-5 d-flex justify-content-center">
                <div className="feedback-form">
                    <h1 className="text-center glow">Feedback</h1>
                    <form onSubmit={handleSubmit} className="text-center">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label color">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{ width: "100%", maxWidth: "500px" }} // Adjusted input width
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="feedback" className="form-label color">Feedback</label>
                            <textarea
                                className="form-control"
                                id="feedback"
                                rows="5" // Increased rows for larger text area
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                required
                                style={{ width: "100%", maxWidth: "500px" }} // Adjusted textarea width
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default FAQ;
