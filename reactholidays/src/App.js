import React from 'react';
import Main from './components/main';
import { HolidayContextProvider } from "./context/holiday-context";
import './App.css';

function App() {
  return (
    <HolidayContextProvider>
      <Main />
    </HolidayContextProvider>
  );
}

export default App;
