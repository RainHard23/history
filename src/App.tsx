import React from 'react';
import './styles/_bolirplate.css';
import "swiper/css"
import "swiper/css/navigation"
import "./index.css"
import {History} from "./components/History";
import {testData} from "./data/dataHistory";

export const App = () => {
  return (
    <div className="App">
      <History data={testData} />
    </div>
  );
}
