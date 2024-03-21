import React,{useState,useEffect} from "react";
import axios from "axios";
import './Submissions.css';

const Submissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [showFullCode, setShowFullCode] = useState({});
    const [output, setOutput] = useState({});
    const getSubmissions = async () => {
        axios.get('https://tuf-intern-task-1pws.onrender.com/api/form/getforms')
        .then((response) => {
            const submissionsData = response.data.map((submission) => {
                const parsedSubmissionResponse = JSON.parse(submission.SubmissionResponse);
                const decodedStdout = atob(parsedSubmissionResponse.stdout);
                return {
                    ...submission,
                    SubmissionResponse: parsedSubmissionResponse,
                    decodedStdout,
                };
            });
            setSubmissions(submissionsData);
            // console.log(submissionsData);
        })
        .catch((error) => {
            console.error('There was an error!', error);
        });
    }
    useEffect(() => {
        getSubmissions();
    }, []);

    const toggleShowFullCode = (index) => {
        setShowFullCode((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    const handleOutputChange = (index, value) => {
            setOutput((prevState) => ({
                ...prevState,
                [index]: value,
        }));
    };
    return (
        <div>
            <h2>Submissions</h2>
            <div className="submissions-container">
                {submissions.map((submission, index) => (
                    <div key={index} className="submission-card">
                        <div className="submission-details">
                            <p><strong>Name:</strong> {submission.name}</p>
                            <p><strong>Language:</strong> {submission.language}</p>
                            <p><strong>Timestamp:</strong> {submission.created_at}</p>
                        </div>
                        <div className="submission-code">
                            <p><strong>Code:</strong></p>
                            <div className="code-container">
                            {!showFullCode[index] && (
                                    <span>{submission.code.length > 100 ? `${submission.code.slice(0, 100)}...` : submission.code}</span>
                                )}
                                {showFullCode[index] && (
                                    <pre>{submission.code}</pre>
                                )}
                                
                            
                            {submission.code.length > 100 && (
                                <button
                                    className="show-more-btn"
                                    onClick={() => toggleShowFullCode(index)}
                                >
                                    {showFullCode[index] ? 'Show Less' : 'Show More'}
                                </button>
                            )}
                            </div>
                            <div className="submission-output">
                            <p><strong>Output:</strong></p>
                            <textarea
                                value={output[index] || submission.decodedStdout || ''}
                                onChange={(e) => handleOutputChange(index, e.target.value)}
                                rows={4}
                                
                            />
                            </div>
                        </div>
                    </div> 
                ))}
            </div>
        </div>
);
}

export default Submissions;
