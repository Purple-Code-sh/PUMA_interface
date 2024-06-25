import { useState, useEffect } from "react";
import { io } from "socket.io-client";
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

  const handleChange = (e) => {
    e.preventDefault();
    setTempValue(e.target.value);
  };

  const handleMouseUp = () => {
    setSliderValue(tempValue);
    setShowIndicator(false);
    console.log(tempValue);
    if (socket) {
      socket.emit("angle_1_changed", tempValue.toString());
    }
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

  // ------------- WebSocket ----------------.
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Conectar al servidor de Socket.IO
    const newSocket = io("http://localhost:3000", {
      auth: {
        username: "chamin",
        serverOffset: 0,
      },
    });
    setSocket(newSocket);

    // Limpiar la conexión al desmontar el componente
    return () => newSocket.close();
  }, []);

  // ----------------------------------------

  return (
    <>
      <div className="slider-div">
        <input
          type="range"
          min={-90}
          max={90}
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
