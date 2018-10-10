import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Highcharts from "highcharts";
import { fetchChartsData } from "../../store";

class Home extends React.Component {
    constructor( props ) {
        super( props );
    }

    render() {
        return (
            <div id="homepage" className="page-wrapper page">
                <div id="chart-ipc" className="container clearfix"></div>
            </div>
        );
    }

    componentDidMount() {
        window.scrollTo( {
            top: 0,
            behavior: "smooth"
        });

        const IPCdataOBJ=this.props.chartsData.IPC.resultObj;
        console.log("mynum:",new Date(IPCdataOBJ[0].Fecha).getTime());
        console.log("IPCdataOBJ",IPCdataOBJ);

        let chartIPC = Highcharts.chart('chart-ipc', {
            chart: {
                zoomType: 'x'
            },
            xAxis: {
                type: 'datetime',
                tickInterval: 3600 * 1000,
                categories: IPCdataOBJ.map( dato => dato.Fecha.substring( 11, 16 ) ),
                labels: {
                    enabled: false, // default is true
                }
            },
            yAxis: {
                title: {
                    text: null
                    
                },
                labels: {
                    formatter: function () {
                        return (String(this.value).substring(0,2)+"k")
                    },
                },
                opposite: true,
                gridLineWidth: 0,
                minorGridLineWidth: 0
            },
            title: {
                text: "IPC"
            },
            tooltip: {
                shared: true,
                valueSuffix: ' $',
                dateTimeLabelFormats:{
                    millisecond: '%H:%M',
                }
            },
            plotOptions: {
                area: {
                    marker: {
                        radius: 1
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            series: [
                {   type: 'area',
                    name: 'Price',
                    data: IPCdataOBJ.map( dato => dato.Precio )
                }
            ]
        });
}
}

Home.serverFetch = fetchChartsData; // static declaration of data requirements
const mapStateToProps = state => (
    {
        drawerOpen: state.drawerOpen,
        chartsData: state.chartsData,
    }
);

const mapDispatchToProps = {
    fetchChartsData,
};

export default connect( mapStateToProps, mapDispatchToProps )( Home );
