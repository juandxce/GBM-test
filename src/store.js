import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import { getChartsData } from "./api";

/*--------------------ACTIONS--------------------*/

export const fetchChartsData = routeType => dispatch =>
{
    return Promise.all([getChartsData()]).then( result => {
        // console.log("res ipc:",result);
        result[0].indice="IPC"
        dispatch(storeChartData(result[0]));

        let tooltips=[];

        const maximoVolumen = Math.max.apply(Math, result[0].resultObj.map( o =>  o.Volumen )) || 0;
        const minimoVolumen = Math.min.apply(Math, result[0].resultObj.map( o =>  o.Volumen )) || 0;
        
        const maximoPrecio = Math.max.apply(Math, result[0].resultObj.map( o =>  o.Precio )) || 0;
        const minimoPrecio = Math.min.apply(Math, result[0].resultObj.map( o =>  o.Precio )) || 0;
        
        const maximoPorcentaje = Math.max.apply(Math, result[0].resultObj.map( o =>  o.Porcentaje )) || 0;
        const minimoPorcentaje = Math.min.apply(Math, result[0].resultObj.map( o =>  o.Porcentaje )) || 0;

        let horaInicio = new Date(result[0].resultObj[0].Fecha).toLocaleTimeString().split(":");
        delete horaInicio[2];
        horaInicio = horaInicio.join(":");
        console.log("values:",maximoVolumen,minimoVolumen,maximoPrecio,minimoPrecio,maximoPorcentaje,minimoPorcentaje);
        console.log("hi:",horaInicio);
        tooltips[0]=`Máximo volumen alcanzado desde las ${horaInicio}: ${maximoVolumen} `;
        tooltips[1]=`Minimo volumen alcanzado desde las ${horaInicio}: ${minimoVolumen} `;
        tooltips[2]=`Máximo volumen alcanzado desde las ${horaInicio}: $${maximoPrecio} `;
        tooltips[3]=`Minimo volumen alcanzado desde las ${horaInicio}: $${minimoPrecio} `;
        tooltips[4]=`Máximo porcentaje alcanzado desde las ${horaInicio}: ${maximoPorcentaje} `;
        tooltips[5]=`Minimo porcentaje alcanzado desde las ${horaInicio}: ${minimoPorcentaje} `;
        dispatch(storeTooltipsData(tooltips));
    });
}

export const storeChartData = ( data ) => ( {
    type: "STORE_CHART_DATA",
    payload: data,
} );

export const storeTooltipsData = ( data ) => ( {
    type: "STORE_TOOLTIPS_DATA",
    payload: data,
} );

export const closeDialog = () => ( {
    type: "CLOSE_DIALOG_MODAL"
} );

export const openDialog = () => ( {
    type: "OPEN_DIALOG_MODAL"
} );

export const closeDrawer = ( ) => ( {
    type: "CLOSE_DRAWER",
} );

export const openDrawer = ( ) => ( {
    type: "OPEN_DRAWER",
} );

export const toggleTabToolbar = ( ) => ( {
    type: "TOGLE_TAB_TOOLBAR",
} );

export const closeTab = elem => ( {
    type: "CLOSE_TAB",
    payload: elem,
} );

/* ----------------END ACTIONS-------------------- */

/* -------------------- REDUCERS -------------------- */

const sideDrawerReducer = ( state = false, action ) => {
    switch ( action.type ) {
        case "OPEN_DRAWER":
            return true;
        case "CLOSE_DRAWER":
            return false;
        default: return state;
    }
};
const navbarReducer = ( state = false, action ) => {
    switch ( action.type ) {
        case "HIDE_NAVBAR":
            return false;
        case "SHOW_NAVBAR":
            return true;
        default: return state;
    }
};
const chartsDataReducer = ( state = {}, action ) => {
    switch ( action.type ) {
        case "STORE_CHART_DATA":
            return Object.assign( {}, state, { [ action.payload.indice ]: action.payload } );
        case "STORE_TOOLTIPS_DATA":
            return Object.assign( {}, state, { tooltips: action.payload } );
        default: return state;
    }
};

const navbarMenuOpenReducer = ( state, action ) => {
    // console.log("action1:",action);
    switch ( action.type ) {
        case "TOGLE_TAB_TOOLBAR":
            return !state;
        case "CLOSE_TAB":
            if ( action.payload.contains && action.payload.contains( event.target ) ) {
                return state;
            }
            return false;
        default: return false;
    }
};
/* ----------------END REDUCERS-------------------- */

const reducer = combineReducers( {
    drawerOpen: sideDrawerReducer,
    showNavbar: navbarReducer,
    form: formReducer,
    navbarMenuOpen: navbarMenuOpenReducer,
    chartsData: chartsDataReducer,
} );
// compose(applyMiddleware( thunkMiddleware ),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() )
export default initialState => createStore( reducer, initialState, compose( applyMiddleware( thunkMiddleware ) ) );
