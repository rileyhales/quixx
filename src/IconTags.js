import React from "react";

const homepage = "/quixx"

const SVG_UNDO_ICON = <img alt="Undo Button" src={`${homepage}/arrow-counterclockwise.svg`}/>
const SVG_REDO_ICON = <img alt="Redo Button" src={`${homepage}/arrow-clockwise.svg`}/>
const SVG_RESTART_ICON = <img alt="Restart Button" src={`${homepage}/arrow-repeat.svg`}/>
const SVG_LOCK_ICON = <img alt="Lock group icon" src={`${homepage}/lock-fill.svg`}/>
const SVG_CARET_ICON = <img alt="Start direction arrow" src={`${homepage}/caret-right-fill.svg`}/>

export {SVG_REDO_ICON, SVG_UNDO_ICON, SVG_RESTART_ICON, SVG_LOCK_ICON, SVG_CARET_ICON}