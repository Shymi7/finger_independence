import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import "./index.css"
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";

import trainingReducer from "./utils/Training.ts";

const store = configureStore({
    reducer:{
        training: trainingReducer
    },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>,
)
