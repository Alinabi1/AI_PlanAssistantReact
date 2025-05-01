import React from 'react';

const questions = [
  {
    id: "taskType",
    text: "Vilken typ av arbetsuppgift är det?",
    options: [
      "Bokföring & Transaktioner",
      "Fakturering & Betalningar",
      "Löneadministration",
      "Bokslut & Deklarationer",
      "Kundsupport & Rådgivning",
      "Bolagsbildning & Avveckling",
      "Övrigt"
    ]
  },
  {
    id: "priority",
    text: "Hur viktig är denna arbetsuppgift?",
    options: ["Låg", "Medel", "Hög"]
  },
  {
    id: "duration",
    text: "Hur lång tid tar det?",
    options: ["< 30 min", "30–60 min", "> 60 min"]
  },
  // deadline hanteras separat
];

const TaskSection = ({ taskIndex, answer, onAnswerChange }) => {
  const handleOptionChange = (questionId, selectedOption) => {
    const updatedAnswer = {
      ...answer,
      [questionId]: selectedOption
    };
    onAnswerChange(updatedAnswer);
  };

  return (
    <div className="task-section">
      {/* Här är dropdownen för att välja typ av arbetsuppgift */}
      <div key="taskType" style={{ marginBottom: "1rem" }}>
        <p>{questions[0].text}</p>
        <select
          value={answer.taskType || ""}
          onChange={(e) => handleOptionChange("taskType", e.target.value)}
        >
          <option value="" disabled>Välj typ</option>
          {questions[0].options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Övriga radioknappar */}
      {questions.slice(1).map((q) => (
        <div key={q.id} style={{ marginBottom: "1rem" }}>
          <p>{q.text}</p>
          {q.options.map((opt) => (
            <label key={opt} style={{ marginRight: "1rem" }}>
              <input
                type="radio"
                name={q.id}
                value={opt}
                checked={answer[q.id] === opt}
                onChange={() => handleOptionChange(q.id, opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}

      {/* Kalenderfält för deadline */}
      <div style={{ marginBottom: "1rem" }}>
        <p>När är deadline?</p>
        <input
          type="date"
          value={answer.deadline || ""}
          onChange={(e) => handleOptionChange("deadline", e.target.value)}
        />
      </div>
    </div>
  );
};

export default TaskSection;
