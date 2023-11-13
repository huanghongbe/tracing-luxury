import React from 'react'
import ReactDOM from 'react-dom'
import './stash/index.css'
// import { render } from 'react-dom'
// import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css' /* 顺序要在 App 之前, 不然它会覆盖 App.css 样式 */
import App from './stash/App'
// import configureStore from './store/configureStore'

//FORMER INDEX.JS
// const store = configureStore()

// ReactDOM.render(
//   <Provider store={configureStore()}>

//     <App />

//   document.getElementById('root')
// )

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);