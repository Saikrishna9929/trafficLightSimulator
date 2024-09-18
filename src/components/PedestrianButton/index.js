// PedestrianButton.js
import React, { useContext } from 'react';
import { TrafficLightContext } from '../TrafficLightContext';
import "./index.css"

const PedestrianButton = () => {
  const { dispatch } = useContext(TrafficLightContext);

  const handleClick = () => {
    dispatch({ type: 'REQUEST_CROSSING' });
  };

  return (
    <button onClick={handleClick} className="pedestrian-button">
      Pedestrian Crossing
    </button>
  );
};

export default PedestrianButton;
