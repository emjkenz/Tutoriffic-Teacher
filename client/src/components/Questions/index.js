import React from 'react';

const Questions = ({questions}) => {
    console.log(questions);
    return(
        <div>
            { questions &&
            questions.map((question) => (
                <div key={question} className="col-12 col-xl-6">
                    <div className="card mb-3">
                        <h4 className="card-header p-2 m-0">
                            {question.question} <br />
                        </h4>
                        <div>
                            {question.answers &&
                                question.answers.map((answer) => (
                                    <div key={answer} className="col-12 col-xl-6">
                                        <div>
                                            <input type="radio" value={answer} />
                                            <label htmlFor={answer}>{answer}</label>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        
                    </div>
                </div>
            ))}
        </div>
    )
};

export default Questions;