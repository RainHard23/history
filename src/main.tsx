import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/_bolirplate.css';

import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import {App} from "./App";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

