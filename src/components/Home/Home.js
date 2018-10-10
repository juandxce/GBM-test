import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Highcharts from "highcharts";
import { fetchChartsData } from "../../store";

class Home extends React.Component {

    render() {
        let text=`
        
        This is the challenge made up to level 2. I'm a little sleepy, so I'm gonna wrap things up:
        Maybe I was too ambitious with the deliverable and failed to meet the expectations. 
        The project is a React/Redux app rendered 
        in the server with express as the "backend". After the loading page, there is a carousel of images 
        with the observations that I made from your sebsite ( <a>https://www.gbm.com.mx</a> )
        Is this my best work? absolutely not, If I didn't had so little free time (about 1 - 2  hours a day) The result 
        would have been awesome!.
        Level 2- “Let’s Rock”:
        I would go with Oauth 2, something like 'angular-oauth2-oidc'
        
        Then implement it:

        import { OAuthService, OAuthEvent } from 'angular-oauth2-oidc';
        this.oauthService.userinfoEndpoint = this.baseURL+'rest/user?version='+this.config.version;
        this.oauthService.clientId = 'clientidabunchoflettersandnumerswasd';
        this.oauthService.dummyClientSecret = 'clientsecretabunchoflettersandnumerswasd';
        this.oauthService.events.subscribe(({type}:OAuthEvent)=>{
            switch (type) {
            case 'token_expires':
                this.oauthService.refreshToken();
            break;
            }
        });
        this.oauthService.fetchTokenUsingPasswordFlow(user,password)
        .then((resp:any)=>{
            this.oauthService.loadUserProfile()
        }
        .
        . 
        .

        For the "bonus" I would go with our backend developer and ask him for the functionality, then implement it on the browser as client-side
        validation can be bypassed pretty easily
        I hope that the loading page helps you to improve your site, best regards.`;
        return (
            <div id="homepage" className="page-wrapper page">
                <div id="chart-ipc" className="container clearfix"></div>
                <br />
                <Link className="page__link" to="/loading-page">Loading page</Link>
                <h1>Hello</h1>
                <p className="text-wrap">
                {text}
                </p>
            </div>
        );
    }

    componentDidMount() {
        if(this.props.chartsData.IPC.resultObj){
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
