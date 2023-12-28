import React from "react";
import { Link } from "react-router-dom";

import Header from "./Header";
import MainPanel from "./MainPanel";
import Footer from "./Footer";

import "./css/style.css"

function Main() {

    return (
        <React.Fragment>
            <div>
                <Header />
            </div>
            <div>
                <MainPanel />
            </div>
            <div>
                <Footer />
            </div>
        </React.Fragment>
    );
}

export default Main;
