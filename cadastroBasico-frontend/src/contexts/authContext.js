import React, { createContext, useCallback, useEffect } from "react";

import useLocalStorage from "../hooks/useLocalStorage";
import api from "../services/axios";
import { axiosPost } from "../services/http";


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [storageToken, setStorageToken, removeStoreToken] = useLocalStorage("@cadastro: token");

    useEffect(() => {
        if (storageToken) {          
            api.defaults.headers["x-access-token"] = storageToken;
        }
    }, [storageToken]);

    const signIn = useCallback(
        async (username, password) => {
            const obj = {
                email: username,
                senha: password,
            };
            
            const response = await axiosPost("/login", obj);
            
            if (response.status === 200) {
                
                api.defaults.headers["x-access-token"] = response.headers.authorization;
                
                setStorageToken(response.headers.authorization);
            }

            return response.status;
        },
        [setStorageToken]
    );

    const signOut = useCallback(() => {
        removeStoreToken();
    }, [removeStoreToken]);

    return (
        <AuthContext.Provider
            value={{
                signed: storageToken !== null ? true : false,
                storageToken,
                signIn,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
