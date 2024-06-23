import "./App.css";
import { Slider } from "./components/Slider";
import { useState } from "react";

function App() {
  const [stepsAmount, setStepsAmount] = useState(1);

  const handleStepChange = (e) => {
    setStepsAmount(parseInt(e.target.value));
  };

  return (
    <>
      <div className="step-selector">
        <label htmlFor="step-select">Select step: </label>
        <select
          id="step-select"
          value={stepsAmount}
          onChange={handleStepChange}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div>
      <Slider steps={stepsAmount} />
    </>
  );
}

export default App;
