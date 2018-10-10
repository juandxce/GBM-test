import express from "express";
import path from "path";
import fetch from "isomorphic-fetch";
import mysql from "mysql";
import helmet from "helmet";
var expressSanitizer = require('express-sanitizer');



import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles'




import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import Helmet from "react-helmet";
import routes from "./routes";
import Layout from "./components/Layout";
import createStore from "./store";

var bodyParser = require('body-parser');

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use( express.static( path.resolve( __dirname, "../dist" ) ) );
app.use( express.static( path.resolve( __dirname, "../dinamic_assets" ) ) );
app.use(expressSanitizer());

app.get( "/*", ( req, res ) => {
    const context = { };
    const store = createStore( {
        showNavbar: false,
        drawerOpen: false,
        navbarMenuOpen: false,
        pageState: { apartmentTypeIndex: 0, isDialogOpen: false },
    } );


    const dataRequirements =
        routes
            .filter( route => matchPath( req.url, route ) ) // filter matching paths
            .map( route => route.component ) // map to components
            .filter( comp => comp.serverFetch ) // check if components have data requirement
            .map( comp => store.dispatch( comp.serverFetch( req.url ) ) ); // dispatch data requirement

    Promise.all( dataRequirements ).then( ( ) => {
          /*------ Necessary components to render material-ui styles in the server--*/
          const sheetsRegistry = new SheetsRegistry();
          const sheetsManager = new Map();
          const generateClassName = createGenerateClassName();
          const theme = createMuiTheme({});
          /*---End necessary components to render material-ui styles in the server--*/
        const jsx = (
          <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
            <MuiThemeProvider sheetsManager={sheetsManager} theme={theme}>
              <ReduxProvider store={ store }>
                  <StaticRouter context={ context } location={ req.url }>
                      <Layout />
                  </StaticRouter>
              </ReduxProvider>
            </MuiThemeProvider>
          </JssProvider>
        );
        const reactDom = renderToString( jsx );
        const reduxState = store.getState( );
        const helmetData = Helmet.renderStatic( );
        const css = sheetsRegistry.toString();

        res.writeHead( 200, { "Content-Type": "text/html" } );
        res.end( htmlTemplate( reactDom, reduxState, helmetData, css ) );
    } );
} );

/* ----------------POST-REQUESTS----------------*/

/* ------------END-POST-REQUESTS----------------*/

app.listen( 3000, () => console.log( `listening on port ${"config.port=3000"}` ) );

function htmlTemplate( reactDom, reduxState, helmetData, css ) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>React SSR</title>
            <link rel="stylesheet" href="/app.css">
            ${ helmetData.title.toString( ) }
            ${ helmetData.meta.toString( ) }
            <link rel="shortcut icon" type="image/png" href="/icons/favicon.ico"/>
            <style id="jss-server-side">${ css }</style>
        </head>
        <body>
            <div id="app">${ reactDom }</div>
            <script>
                window.REDUX_DATA = ${ JSON.stringify( reduxState ) }
            </script>
            <script src="/app.js"></script>
        </body>
        </html>
    `;
}
