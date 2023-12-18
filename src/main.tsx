import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
// @ts-ignore
import App from './App'
// @ts-ignore
import AppContextProvider from './reducers/AppContextProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AppContextProvider>
    <App />
  </AppContextProvider>
)

// todo
// 1. datatable