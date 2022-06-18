import React, {Suspense, lazy} from "react"

import LoadingScreen from "./LoadingScreen"

import "./Quixx.css"
import "./QuixxColors.css"
import "./QuixxSizes.css"

const ControlBar = lazy(() => import("./Components/BoardMenu/BoardMenu"))
const ScoreGroups = lazy(() => import("./Components/ScoreGroups/ScoreGroups"))
const MenuGroup = lazy(() => import("./Components/Controls/Controls"))

export default function Quixx() {
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