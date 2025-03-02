import { createContext, useContext, useState } from "react";



export const AppearanceProvider = ({ children }) =>{
      
      const [btnFill, setbtnFill] = useState("");
      const [btnOutline, setbtnOutline] = useState("");
      const [btnShadow, setbtnShadow] = useState("");
   

      return(
        <AppeContext.Provider
            value={{
                Layout,
                setLayout,
                InputFontColor,
                setInputFontColor,
                
                setbtnShadow,
                inputFont,
                setinputFont,
                theme,
                setTheme
            }}
        >
            {children}
        </AppeContext.Provider>
      )
}

export const useArance = () =>useContext(ApnceContext);