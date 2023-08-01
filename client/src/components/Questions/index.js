import React from 'react';
import { Radio } from 'antd';

const Questions = ({questions}) => {
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
                            <Radio.Group>
                            {question.answers &&
                                question.answers.map((answer) => (
                                    <div key={answer} className="col-12 col-xl-6">
                                        {/* <div>
                                            <input type="radio" value={answer} />
                                            <label htmlFor={answer}>{answer}</label>
                                        </div> */}
                                        <Radio value={answer}> {answer} </Radio>
                                    </div>
                                ))}
                            </Radio.Group>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default Questions;