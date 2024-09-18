// TrafficLightContext.js
import React, { createContext, useReducer, useEffect } from 'react';

// Initial State
const initialState = {
  currentLight: 'green',
  pedestrianRequested: false,
  emergencyOverride: false,
 
  timer: 10,  // Countdown for the current light
};

// Actions
const CHANGE_LIGHT = 'CHANGE_LIGHT';
const REQUEST_CROSSING = 'REQUEST_CROSSING';
const EMERGENCY_OVERRIDE = 'EMERGENCY_OVERRIDE';
const RESET_TIMER = 'RESET_TIMER';
const UPDATE_TIMER = 'UPDATE_TIMER';

// Reducer
function reducer(state, action) {
  switch (action.type) {
    case CHANGE_LIGHT:
      return {
        ...state,
        currentLight: action.payload,
        timer: action.timer,
      };
    case REQUEST_CROSSING:
      return {
        ...state,
        pedestrianRequested: true,
      };
    case EMERGENCY_OVERRIDE:
      return {
        ...state,
        emergencyOverride: action.emergencyOverride,
        currentLight: action.payload,
        
      };
    case RESET_TIMER:
      return {
        ...state,
        pedestrianRequested: false,
        emergencyOverride: false,
      };
      case UPDATE_TIMER:
      return {
        ...state,
        timer: action.payload,
      };
    default:
      return state;
  }
}

// Context
export const TrafficLightContext = createContext();

export const TrafficLightProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let timerId;
    if (!state.pedestrianRequested && !state.emergencyOverride) {
      // Normal light sequence
      timerId = setInterval(() => {
        if (state.timer > 1) {
          dispatch({ type: UPDATE_TIMER, payload: state.timer - 1 });
        } else {
          changeLight(dispatch, state.currentLight);
        }
      }, 1000);
    }
    else if (state.pedestrianRequested && !state.emergencyOverride){
      timerId = setInterval(() => {
        if (state.timer > 1) {

          dispatch({ type: UPDATE_TIMER, payload: state.timer - 1 });

        } else if (state.timer === 1 && state.currentLight !== "red" ) {
         
          dispatch({type: CHANGE_LIGHT, payload: "red", timer: 12});
          
        }else if(state.timer === 1 && state.currentLight === "red")  {
          
          dispatch({type: RESET_TIMER});
    
        }
        
      }, 1000);
    }
    return () => clearTimeout(timerId);
  }, [state]);

  return (
    <TrafficLightContext.Provider value={{ state, dispatch }}>
      {children}
    </TrafficLightContext.Provider>
  );
};

// Helper function to change the light
function changeLight(dispatch, currentLight) {
  switch (currentLight) {
    case 'green':
      dispatch({ type: CHANGE_LIGHT, payload: 'yellow', timer: 3 });
      break;
    case 'yellow':
      dispatch({ type: CHANGE_LIGHT, payload: 'red', timer: 7 });
      break;
    case 'red':
      dispatch({ type: CHANGE_LIGHT, payload: 'green', timer: 10 });
      break;
    default:
      break;
  }
}
