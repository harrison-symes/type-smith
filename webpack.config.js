const path = require('path');
const webpack = require("webpack")
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CheckerPlugin = require("awesome-typescript-loader").CheckerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/index.tsx",
    stats: "minimal",
    // devtool: "cheap-module-eval-source-map",
    
    resolve: {
        extensions: ['.js', '.jsx', '.tsx', '.ts'],
    },
    output: {
        path: path.join(__dirname, './dist/'),
        // filename: "bundle.min.js",
        // path: __dirname,
        filename: "bundle.js",
        pathinfo: true,
        // publicPath: "./dist/"
        // chunkFilename: "[name].js?x=[chunkhash]",
        // pathinfo: true,
        // publicPath: "/Scripts/dist/"
        // filename: 'bundle.min.js',
        // pathinfo: false
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "awesome-typescript-loader",
                        options: {configFileName: "tsconfig.client.json"}
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
            // {
            //     test: /\.tsx?$/,
            //     loader: 'awesome-typescript-loader'
            // },
            // {
            //     test: /\.(ts|tsx)$/,
            //     use: [
            //         {
            //             loader: 'awesome-typescript-loader',
            //             options: {
            //                 silent: true,
            //                 useBabel: true,
            //                 babelOptions: {
            //                     compact: process.env.NODE_ENV === 'production',
            //                     highlightCode: true,
            //                 },
            //                 babelCore: '@babel/core',
            //                 useCache: true,
            //             },
            //         },
            //     ],
            // },
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
        new webpack.ContextReplacementPlugin(/moment[\\\/]lang$/, /^\.\/(en)$/),
        new CheckerPlugin(),
        new ForkTsCheckerWebpackPlugin()
    ],
    devtool: 'source-map'
}
