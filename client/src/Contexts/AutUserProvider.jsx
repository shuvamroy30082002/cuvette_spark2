import React,{ createContext, useState } from "react";

export const AuthUserContext = createContext();



    return(
        <AuthUserContext.Provider value={{userAuth, setUserAuth}}>
            {children}
        </AuthUserContext.Provider>
    )
};