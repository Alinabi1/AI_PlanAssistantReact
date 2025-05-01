// src/App.js
import React, { useState } from 'react';
import TaskSection from './components/TaskSection.jsx';

const App = () => {
  const [numTasks, setNumTasks] = useState(null);
  const [currentTask, setCurrentTask] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleSelectChange = (e) => {
    const value = parseInt(e.target.value);
    setNumTasks(value);
    setCurrentTask(0);
    setAnswers(Array(value).fill({})); // Initiera ett tomt objekt för varje arbetsuppgift
  };

  const goToNext = () => {
    if (currentTask < numTasks - 1) {
      setCurrentTask(currentTask + 1);
    }
  };

  const goToPrevious = () => {
    if (currentTask > 0) {
      setCurrentTask(currentTask - 1);
    }
  };

  const handleAnswerChange = (taskIndex, updatedAnswer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[taskIndex] = updatedAnswer;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8080/planing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(answers)
      });

      if (!response.ok) {
        throw new Error("Något gick fel vid skickandet av datan.");
      }

      const result = await response.json();
      console.log("Svar från servern:", result);
      alert("Dina arbetsuppgifter har skickats!");
    } catch (error) {
      console.error("Fel vid skickandet:", error);
      alert("Kunde inte skicka arbetsuppgifter. Kontrollera servern.");
    }
  };

  const resetApp = () => {
    setNumTasks(null);
    setCurrentTask(0);
    setAnswers([]);
  };

  return (
    <div className="App">
      <h1>Planera din dag</h1>

      {numTasks === null ? (
        <div>
          <p>Hur många arbetsuppgifter har du idag?</p>
          <select onChange={handleSelectChange} defaultValue="">
            <option value="" disabled>Välj antal</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      ) : (
        <div>
          <h2>Arbetsuppgift {currentTask + 1} av {numTasks}</h2>

          <TaskSection
            taskIndex={currentTask}
            answer={answers[currentTask]}
            onAnswerChange={(newAnswer) =>
              handleAnswerChange(currentTask, newAnswer)
            }
          />

          <div style={{ marginTop: '20px' }}>
            {currentTask > 0 && (
              <button onClick={goToPrevious}>Föregående</button>
            )}
            {currentTask < numTasks - 1 ? (
              <button onClick={goToNext}>Nästa</button>
            ) : (
              <button onClick={handleSubmit}>Skicka</button>
            )}
            <button onClick={resetApp} style={{ marginLeft: '10px' }}>
              Starta om
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
