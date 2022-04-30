import React from "react"

import "./Modal.css"

const classModalShow = "expand"
const classModalHide = "collapse"
const classModalWrapper = "modal-wrapper"
const classModalContent = "modal-content"
const classModalHeader = "modal-head"
const classModalTitle = "modal-title"
const classModalBody = "modal-body"
const classModalFooter = "modal-footer"
const classButton = "modal-btn"
const classDarkMode = "dark"

export default function Modal({visible, setVisible, title, children, darkMode}) {
    const wrapperCSS = [classModalWrapper]
      .concat(visible ? classModalShow : classModalHide)
      .concat(darkMode ? classDarkMode : "")
    const contentCSS = darkMode ? classModalContent + " " + classDarkMode : classModalContent

    return (
      <div className={wrapperCSS.join(" ")} onClick={(event) => {
          if (event.target.classList[0] === classModalWrapper) setVisible(a => !a)
      }}>
          <div className={contentCSS}>

              <div className={classModalHeader}>
                  <h2 className={classModalTitle}>{title}</h2>
              </div>

              <div className={classModalBody}>
                  {children}
              </div>

              <div className={classModalFooter}>
                  <button className={classButton} onClick={() => {setVisible(a => !a)}}>Close</button>
              </div>
          </div>
      </div>
    )

}

Modal.defaultProps = {
    darkMode: false,
    title: null,
    children: null
}