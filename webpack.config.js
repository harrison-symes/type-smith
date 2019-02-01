const path = require('path');
const webpack = require("webpack")
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CheckerPlugin = require("awesome-typescript-loader").CheckerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entries = {
    index: "./src/index.tsx",
    
    welcome: "./src/pages/Welcome.tsx",
    
    main: "./src/pages/Main.tsx",
    
    pregame: "./src/pages/PreGame.tsx",
    
    game: "./src/pages/Game.tsx"
}

module.exports = {
    entry: entries,
    mode: "development",
    stats: "minimal",
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        // root: path.resolve('./src'),
        // moduleDirectories: ['node_modules']
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].js',
        sourceMapFilename: '[name].[hash:8].map',
        chunkFilename: '[id].[hash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "awesome-typescript-loader",
                        options: { configFileName: "tsconfig.client.json" }
                    },
                    {
                        loader: "tslint-loader",
                        options: {
                            emitErrors: true,
                            failOnHint: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader?sourceMap" // compiles Sass to CSS
                }]
            }
        ]
    },
    optimization: {
        // minimizer: [new UglifyJsPlugin()],
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: {
            chunks: "all",
            name: "common",
            minChunks: 3
        },
        concatenateModules: false
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // new webpack.ProvidePlugin({
        //     React: "react",
        //     ReactDOM: "react-dom"
        // }),
        new ForkTsCheckerWebpackPlugin()
    ],
    devtool: 'source-map'
}
