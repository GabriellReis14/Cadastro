import React from "react";
import { Route, Redirect } from "react-router-dom";

import useAuth from "../hooks/useAuth";

export const WrapperAuthRoute = ({ component: Component, layout: Layout, ...rest }) => {
    const { signed } = useAuth();

    return (
        <Route
            {...rest}
            render={(props) => {
                return signed ? (
                    <Layout {...props}>
                        <Component {...props} />
                    </Layout>
                ) : (
                    <Redirect to="/login" />
                );
            }}
        />
    );
};
