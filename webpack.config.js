const dev = process.env.NODE_ENV !== "production";
const path = require( "path" );
const { BundleAnalyzerPlugin } = require( "webpack-bundle-analyzer" );
const FriendlyErrorsWebpackPlugin = require( "friendly-errors-webpack-plugin" );
const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );
const CopyWebpackPlugin = require( "copy-webpack-plugin" );

const plugins = [
    new FriendlyErrorsWebpackPlugin(),
    new CopyWebpackPlugin( [ { from: "../assets", to: "../dist" } ], {} ),
];

if ( !dev ) {
    plugins.push( new BundleAnalyzerPlugin( {
        analyzerMode: "static",
        reportFilename: "webpack-report.html",
        openAnalyzer: false,
    } ) );

}
plugins.push( new MiniCssExtractPlugin( {
        filename: dev ? "[name].css" : "[name].css",
        chunkFilename: dev ? "[id].css" : "[id].css",
    } ) );

module.exports = {
    mode: dev ? "development" : "production",
    context: path.join( __dirname, "src" ),
    devtool: dev ? "source-map" : "source-map",
    entry: {
        app: "./client.js",
    },
    resolve: {
        modules: [
            path.resolve( "./src" ),
            "node_modules",
        ],
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                loaders: [
                    dev ? MiniCssExtractPlugin.loader : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
            },
        ],
    },
    // output: {
    //     path: path.resolve( __dirname, "dist" ),
    //     filename: "[name].bundle.js",
    // },
    plugins,
};