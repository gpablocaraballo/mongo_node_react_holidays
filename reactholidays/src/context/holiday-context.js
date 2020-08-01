import React, { useReducer, createContext } from "react";

export const HolidayContext = createContext();
const current = {
    "anio": "",
    "dia": "",
    "id": "",
    "info": "",
    "mes": "",
    "motivo": "",
    "tipo": "",
    "_id": ""
};
const initialState = {
  holidays: [],
  loading: false,
  error: false,
  current:current
};
const reducer = (state, action) => {
    switch (action.type) {
    case "CURRENT":
        return {
            ...state,
            current:action.payload
        };
    case "CLEAN_CURRENT":
        return {
            ...state,
            current:current
        };    
    case "ADD_HOLIDAY":
        return {
            ...state,
            holidays: [...state.holidays, action.payload]
        };
    case "FILL_HOLIDAY":
        return {
            ...state,
            holidays: action.payload
        };    
    case "DEL_HOLIDAY":
        return {
            ...state,
            holidays: state.holidays.filter(holiday => holiday._id !== action.payload)        
        };
    case "LOADING":
        return {
            ...state,
            loading:action.payload
        };
    case "ERROR":
        return {
            ...state,
            error:action.payload
        };
    default:
        throw new Error();
    }
};

export const HolidayContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <HolidayContext.Provider value={[state, dispatch]}>
      {props.children}
    </HolidayContext.Provider>
  );
};