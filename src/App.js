import "./App.css"
import React from 'react';
import { TrafficLightProvider } from './components/TrafficLightContext';
import TrafficLight from './components/TrafficLight';
import PedestrianButton from './components/PedestrianButton';
import EmergencyButton from './components/EmergencyButton';

function App() {
  return (
    <TrafficLightProvider>
      <div className="wrapper">
        <h1 className = "traffic-light-title">Traffic Light Simulator</h1>
        <TrafficLight />
        <div className = "button-container">
        <PedestrianButton />
        <EmergencyButton />
        </div>
      </div>
    </TrafficLightProvider>
  );
}

export default App;
