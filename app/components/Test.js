"use client";
import React from "react";
import { useState } from "react";

const Colors = () => {
  const [color, setColor] = useState("bg-red-500");
  const [sliderValue, setSliderValue] = useState(0);
  const [fontSize, setFontSize] = useState(16);

  const changeColor = (newColor) => {
    setColor(newColor);
  };

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
    setFontSize(event.target.value);
  };

  return (
    <div>
      <div className={color} style={{ fontSize: `${fontSize}px` }}>
        Text inside the div
      </div>
      <button
        className='rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700'
        onClick={() => changeColor("bg-red-500")}
      >
        Red button
      </button>
      <button
        className='rounded bg-black py-2 px-4 font-bold text-white hover:bg-gray-700'
        onClick={() => changeColor("bg-black")}
      >
        Black button
      </button>
      <input
        type='range'
        min='16'
        max='48'
        value={sliderValue}
        onChange={handleSliderChange}
      />
    </div>
  );
};

export default Colors;
