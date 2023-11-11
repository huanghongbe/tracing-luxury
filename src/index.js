import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './components/App'
import 'bootstrap/dist/css/bootstrap.css'
import configureStore from './store/configureStore'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
);