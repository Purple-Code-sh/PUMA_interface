import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";
import "./style.css";

Slider.propTypes = {
  steps: PropTypes.number.isRequired,
};

export default function Slider({ steps }) {
  const [sliderValue, setSliderValue] = useState(0);
  const [tempValue, setTempValue] = useState(0);

  const handleChange = (e) => {
    e.preventDefault();
    setTempValue(e.target.value);
  };

  const handleMouseUp = () => {
    setSliderValue(tempValue);
    console.log(tempValue);
  };

  const handleIncrease = () => {
    if (sliderValue < 90) {
      const newValue = parseInt(sliderValue) + steps;
      setSliderValue(newValue);
      setTempValue(newValue);
    }
  };

  const handleDecrease = () => {
    if (sliderValue > -90) {
      const newValue = parseInt(sliderValue) - steps;
      setSliderValue(newValue);
      setTempValue(newValue);
    }
  };

  return (
    <>
      <input
        type="range"
        min={-90}
        max={90}
        step={1}
        className="custom-slider"
        onChange={(e) => handleChange(e)}
        onMouseUp={handleMouseUp}
        value={tempValue}
      ></input>
      <div className="flex-container">
        <button className="btn" onClick={handleDecrease}>
          <ArrowLeftIcon className="icon" />
        </button>
        <h3>{sliderValue}</h3>
        <button className="btn" onClick={handleIncrease}>
          <ArrowRightIcon className="icon" />
        </button>
      </div>
    </>
  );
}
