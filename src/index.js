import React from "react"
import {createRoot} from 'react-dom/client'

import {BoardConfigProvider} from "./Contexts/BoardContext";
import "./quixx-colors.css"

import Quixx from "./Quixx"


createRoot(document.getElementById('root'))
  .render(
    <React.StrictMode>
        <BoardConfigProvider>
            <Quixx/>
        </BoardConfigProvider>
    </React.StrictMode>
  )
