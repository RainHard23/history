import React from 'react';
import './App.css';
import History from "./components/History/History";
import {mockData} from "./data/dataHistory";


export const App = () => {
  return (
    <div className="App">
      <History historyData={mockData} />
    </div>
  );
}
