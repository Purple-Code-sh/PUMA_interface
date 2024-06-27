import { useState, useEffect } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";
import "./style.css";

Slider.propTypes = {
  steps: PropTypes.number.isRequired,
};

export default function Slider({ steps }) {
  const [sliderValue, setSliderValue] = useState(0);
  const [tempValue, setTempValue] = useState(0);
  const [showIndicator, setShowIndicator] = useState(false);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // Conectar al servidor de Socket.IO
    const socket = new WebSocket("ws://192.168.1.17:5000");
    setWs(socket);
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setTempValue(e.target.value);
  };

  const handleMouseUp = () => {
    setSliderValue(tempValue);
    setShowIndicator(false);
    console.log(tempValue);
    ws.send(tempValue.toString());
  };

  const handleMouseDown = () => {
    setShowIndicator(true);
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

  // ----------------------------------------

  return (
    <>
      <div className="slider-div">
        <input
          type="range"
          min={0}
          max={255}
          step={1}
          className="custom-slider"
          onChange={(e) => handleChange(e)}
          onMouseUp={handleMouseUp}
          onMouseDown={handleMouseDown}
          value={tempValue}
        ></input>
        {showIndicator && <div className="slider-indicator">{tempValue}</div>}
      </div>
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
