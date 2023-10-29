import React, {Suspense, lazy} from "react"

import LoadingScreen from "./LoadingScreen"

import "./Qwixx.css"
import "./Colors.css"
import "./Sizes.css"

const ControlBar = lazy(() => import("./Components/BoardMenu/BoardMenu"))
const ScoreGroups = lazy(() => import("./Components/ScoreGroups/ScoreGroups"))
const MenuGroup = lazy(() => import("./Components/Controls/Controls"))

export default function Qwixx() {
    return (
      <Suspense fallback={<LoadingScreen message={"Loading App..."}/>}>
          <div className={"app-container"}>
              <ControlBar/>
              <div className={"groups"}>
                  <ScoreGroups/>
                  <MenuGroup/>
              </div>
          </div>
      </Suspense>
    )
}