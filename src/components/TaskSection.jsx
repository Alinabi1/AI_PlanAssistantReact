import React, { useState } from 'react';
import Question from './Question';

const TaskSection = () => {
  const [questions] = useState([
    { question: 'Vad är din arbetsuppgift?', options: ['Skriva kod', 'Möte', 'Forskning'] },
    { question: 'Avsett tid', options: ['Inom 1 timme', 'Inom 2 timmar', 'Imorgon'] },
    { question: 'deadline?', options: ['Jag', 'Kollega', 'Chef'] },
  ]);

    return (
      <div className="task-section">
        <h2>Arbetsuppgift Sektion</h2>
        {questions.map((q, index) => (
        <Question key={index} question={q.question} options={q.options} />
      ))}
      </div>
    );
  };
  
  export default TaskSection;