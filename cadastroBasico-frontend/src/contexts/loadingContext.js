import React, { createContext, useCallback, useState } from "react";

const LoadingContext = createContext({});

export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    const showLoading = useCallback(() => {
        setLoading(true);
    }, []);

    const hideLoading = useCallback(() => {
        setLoading(false);
    }, []);

    return (
        <LoadingContext.Provider
            value={{
                loading,
                showLoading,
                hideLoading,
            }}
        >
            {children}
        </LoadingContext.Provider>
    );
};

export default LoadingContext;
