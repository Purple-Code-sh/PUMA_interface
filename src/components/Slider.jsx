import { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function Slider() {
  const [sliderValue, setSliderValue] = useState(0);

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setSliderValue(e.target.value);
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
        value={sliderValue}
      ></input>
      <div>
        <button>
          <ArrowLeftIcon />
        </button>
        <h3>{sliderValue}</h3>
      </div>
    </>
  );
}
