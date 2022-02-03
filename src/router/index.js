import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "../pages/header";
import Main from "../pages/main";

function Routes() {
    return (
        <BrowserRouter>
            <Header />
            <Route exact path="/" component={Main} />
        </BrowserRouter>
    );
}

export default Routes;
