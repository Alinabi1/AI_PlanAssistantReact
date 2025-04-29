import React, { useState } from 'react';
import TaskSection from './components/TaskSection.jsx';
import './App.css'

function App() {
  // State för att hålla alla sektioner
  const [sections, setSections] = useState([{}]);  // Starta med en sektion som standard

  // Funktion för att lägga till en ny sektion
  const addSection = () => {
    setSections([...sections, {}]);  // Lägg till en ny sektion
  };

  return (
    <div className="App">
      <h1>Planera din dag</h1>

      {/* Visa alla sektioner */}
      {sections.map((_, index) => (
        <TaskSection key={index} />
      ))}

      {/* Lägg till en ny sektion */}
      <button onClick={addSection}>Lägg till sektion</button>
    </div>
  );
}

export default App
