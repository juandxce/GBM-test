import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import Layout from "./components/Layout";
import createStore from "./store";

import "./styles/styles.scss";
import "./styles/sliders.scss";

const store = createStore( window.REDUX_DATA );

const jsx = (
    <ReduxProvider store={ store }>
        <Router onUpdate={ ()=>{ console.log("UPDATING ROUTE") }  } >
            <Layout />
        </Router>
    </ReduxProvider>
);

const app = document.getElementById( "app" );
ReactDOM.hydrate( jsx, app );
