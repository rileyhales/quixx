import React, {lazy} from "react";

import preval from 'preval.macro'

const Modal = lazy(() => import("../Modal/Modal"))

const buildDate = preval`module.exports = new Date()`

export default function HelpMenu({visible, setVisible}) {

    return (
      <Modal visible={visible} setVisible={setVisible} title={"About"}>
          <>
              <div><a href={"https://hales.app"}>&copy; Riley Hales</a></div>
              <div>Updated: {new Date(buildDate).toLocaleString()}</div>
              <div>Version: {process.env.REACT_APP_VERSION}</div>
              <hr/>
              <div className={"modal-body-divider"}>Quixx Trixx Power Ups</div>
              <ul>
                  <li>Time Travel: Score a number you previously skipped</li>
                  <li>Re-roll: Re-roll any number of die, but only 1 time</li>
                  <li>Color Blind: Score with any two die on any color group</li>
                  <li>Skip: Skip your turn</li>
              </ul>
          </>
      </Modal>
    )
}