import React from "react"
import {createRoot} from 'react-dom/client'

import {BoardConfigProvider} from "./Contexts/BoardContext";
import "./Colors.css"

import Qwixx from "./Qwixx"


createRoot(document.getElementById('root'))
  .render(
    <React.StrictMode>
        <BoardConfigProvider>
            <Qwixx/>
        </BoardConfigProvider>
    </React.StrictMode>
  )
