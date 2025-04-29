import React, { useState } from 'react';

const Question = ({ question, options }) => {
    const [selectedAnswer, setSelectedAnswer] = useState('');

    const handleChange = (e) => {
        setSelectedAnswer(e.target.value);
    };

    return (
        <div className="question">
          <h3>{question}</h3>
          <div className="options-container">
            {options.map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name={question}
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={handleChange}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      );
};

export default Question;