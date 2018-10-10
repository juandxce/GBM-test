import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";
import { connect } from "react-redux";
import { fetchChartsData } from "../../store";

class LoadingPage extends Component {
    
    componentDidMount(){
        setTimeout(() => {
            this.cargando=false;
        }, 5000);
    }

    render() {
        return (
            <div>
                <Carousel className="carousel__fails" statusFormatter={ ( i, t ) => `${i} de ${t}`}
                infiniteLoop={ true }
                showThumbs={ false } >
                    <div>
                        <img src="./images/mantenimiento.png"/>
                        <p className="legend">"Sitio en mantenimiento..."</p>
                    </div>
                    <div>
                        <img src="./images/error.png"/>
                        <p className="legend">"Errores 404 D:"</p>
                    </div>
                    <div>
                        <img src="./images/hovers.png"/>
                        <p className="legend">"Hovers que se activan, pero con links no clickeables"</p>
                    </div>
                    <div>
                        <img src="./images/ux.png"/>
                        <p className="legend">"Me saca del sitio en vez de abrirlo en una nueva ventana"</p>
                    </div>
                </Carousel>
            </div>
        )
    }

}

LoadingPage.serverFetch = fetchChartsData; // static declaration of data requirements
const mapStateToProps = state => (
    {
        drawerOpen: state.drawerOpen,
        tooltipsData: state.tooltipsData,
    }
);

const mapDispatchToProps = {
    fetchChartsData,
};

export default connect( mapStateToProps, mapDispatchToProps )( LoadingPage );
