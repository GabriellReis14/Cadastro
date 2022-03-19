import React from "react";
import LoadingScreen from "react-loading-screen";

import { LOADING } from "../../assets/util/constants";
import useLoading from "../../hooks/useLoading";

export const PublicLayout = ({ children }) => {
    const { loading } = useLoading();

    return (
        <LoadingScreen
            loading={loading}
            bgColor={LOADING.bgColor}
            spinnerColor={LOADING.spinnerColor}
            textColor={LOADING.textColor}
            text={LOADING.text}
        >
            {children}
        </LoadingScreen>
    );
};
