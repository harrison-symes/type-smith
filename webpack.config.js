const path = require('path');
const webpack = require("webpack")
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CheckerPlugin = require("awesome-typescript-loader").CheckerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        // root: path.resolve('./src'),
        // moduleDirectories: ['node_modules']
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.min.js'
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
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.ProvidePlugin({
            React: "react",
            ReactDOM: "react-dom"
        }),
        new ForkTsCheckerWebpackPlugin()
    ],
    devtool: 'source-map'
}
