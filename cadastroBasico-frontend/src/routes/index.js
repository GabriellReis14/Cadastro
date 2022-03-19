import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import { WrapperAuthRoute } from "./WrapperAuthRouter";
import { WrapperRoute } from "./WrapperRoute";
import { PrivateLayout } from "../layout/PrivateLayout";
import { PublicLayout } from "../layout/PublicLayout";

import { LoginPage } from "../pages/Login";
import { Dashboard } from "../components/Dashboard";
import { Pessoas } from "../pages/Pessoas";
import { NewRegister } from "../pages/Login/newRegister";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <WrapperRoute exact path="/login" layout={PublicLayout} component={LoginPage} />
                <WrapperRoute exact path="/register" layout={PublicLayout} component={NewRegister} />
                <WrapperAuthRoute exact path="/" layout={PrivateLayout} component={Dashboard} />
                <WrapperAuthRoute exact path="/pacientes" layout={PrivateLayout} component={Pessoas} />
            </Switch>
        </BrowserRouter>
    );
}
