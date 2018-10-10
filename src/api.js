import fetch from "isomorphic-fetch";
// import { config } from "./config";

const url=`http://dev.m22.mx:${"3000"}`;

export function getChartsData() {
    return fetch( "https://www.gbm.com.mx/Mercados/ObtenerDatosGrafico?empresa=IPC" )
        .then( res => res.json( ) )
        .then( res => {
          // console.log("res,",res);
          return res
        } );
}
