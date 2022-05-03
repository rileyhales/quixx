import React, {useContext} from "react"

const AppConfig = React.createContext()

export const useAppConfigContext = () => {
    return useContext(AppConfig)
}

export const AppConfigProvider = ({children}) => {
    const values = {}
    return (
      <AppConfig.Provider value={values}>
          {children}
      </AppConfig.Provider>
    )
}