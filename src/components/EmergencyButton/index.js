// EmergencyButton.js
import React, { useContext } from 'react';
import { TrafficLightContext } from '../TrafficLightContext';
import "./index.css"

const EmergencyButton = () => {
  const {state, dispatch } = useContext(TrafficLightContext);

  const handleEmergency = () => {
    if( state.emergencyOverride){
         dispatch({ type: 'EMERGENCY_OVERRIDE' , payload: "green" , emergencyOverride: false });
    }
    else{
      dispatch({ type: 'EMERGENCY_OVERRIDE' , payload: "green" , emergencyOverride: true });
    }
  };

  return (
    <button onClick={handleEmergency} className="emergency-button">
       {state.emergencyOverride ? "Emergency Override Off" :  "Emergency Override On" }
    </button>
  );
};

export default EmergencyButton;
