import React, { useContext} from 'react';
import { TrafficLightContext } from '../TrafficLightContext';
import './index.css'; 

const TrafficLight = () => {
  const { state } = useContext(TrafficLightContext);
  
     
  return (
    
    <div className="traffic-light">
      <div className={`light ${state.currentLight === 'red' ? 'red' : ''}`}></div>
      <div className={`light ${state.currentLight === 'yellow' ? 'yellow' : ''}`}></div>
      <div className={`light ${state.currentLight === 'green' ? 'green' : ''}`}></div>
      <div className="countdown">{state.timer}s</div>
    </div>
     
   
  );
};

export default TrafficLight;
