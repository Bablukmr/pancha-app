import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import SideMenu from './sideMenu1.jsx'
import FileUploder from './fileUploder.jsx'
import TablePage from './tablePage.jsx'
import Notification from './Components/notification.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {/* <SideMenu/> */}
    {/* <TablePage/> */}
    {/* <Notification/> */}
  </React.StrictMode>,
)
