import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import RenderSnackbar from './components/snackbar/snackbar';
import SimpleBackdrop from './components/snackbar/snackbar';

ReactDOM.render(
  <React.StrictMode>
    <RenderSnackbar>
      <SimpleBackdrop>
        <App />
      </SimpleBackdrop>
    </RenderSnackbar>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
