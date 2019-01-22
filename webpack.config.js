const path = require('path');
const webpack = require("webpack")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const pageEntries = {
    Welcome: "./src/pages/Welcome.tsx",
    PreGame: "./src/pages/PreGame.tsx",
    Main: "./src/pages/Main.tsx",
}

const entry = {
    ...pageEntries,
    react: ["./src/index.tsx"],
    sass: ["./src/sass/main.scss"],
    reducers: ["./src/reducers/index.ts"],
}

module.exports = {
    entry: "./src/index.tsx",
    // stats: "minimal",
    resolve: {
        extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: "bundle.js",
        // chunkFilename: "[name].js?x=[chunkhash]",
        pathinfo: true,
        // publicPath: "/Scripts/dist/"
        // filename: 'bundle.min.js',
        // pathinfo: false
    },
    module: {
        rules: [
            {
                test: /\.svg/,
                use: {
                    loader: 'svg-url-loader',
                    options: {}
                }
            },
            // {
            //     test: /\.(js|jsx)$/,
            //     exclude: /node_modules/,
            //     loader: 'babel-loader'
            // },
            // {
            //     test: /\.tsx?$/,
            //     loader: 'awesome-typescript-loader',
            //     exclude: /node_modules/
            // },
            {
                test: /\.(ts|tsx)$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            silent: true,
                            useBabel: true,
                            babelOptions: {
                                compact: process.env.NODE_ENV === 'production',
                                highlightCode: true,
                            },
                            babelCore: '@babel/core',
                            useCache: true,
                        },
                    },
                ],
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
            chunks: "all"
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new ForkTsCheckerWebpackPlugin()
    ],
    devtool: 'source-map'
}
