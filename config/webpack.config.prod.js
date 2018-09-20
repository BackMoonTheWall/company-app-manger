const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: "production",
    devtool: false,
    entry: {
        index: "./src/index.js"
    },
    output: {
        filename: "js/[name].bundle.[chunkhash:8].js",
        path: path.join(__dirname, "../dist")
    },
    module: {
        strictExportPresence: true,
        rules: [
            // {
            //     test: /\.(js|jsx)$/,
            //     enforce: 'pre',
            //     use: "eslint-loader",
            //     include: path.resolve(__dirname, "../src"),
            // },
            {
                test: /\.(js|jsx)$/,
                use: [
                    'thread-loader',
                    'babel-loader'
                ],
                exclude: [
                    /node_modules/
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    // fallback: 'style-loader',
                    use: [
                        {
                            "loader": "css-loader",
                            "options": {
                                minimize: true
                            }
                        },
                    ]
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextWebpackPlugin.extract({
                    // fallback: 'style-loader',
                    use: [
                        {
                            "loader": "css-loader",
                            "options": {
                                minimize: true
                            }
                        },
                        "less-loader"
                    ]
                })
            },
            {
                test: /\.(png|gif|jpg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        outputPath: 'images/'
                    }
                }]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    name: 'commons',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                },
                vendor: { // 抽离第三插件
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: 10
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, "../public", "index.html")
        }),
        new CleanWebpackPlugin(["**"], {
            root: path.join(__dirname, "../dist"),
            verbose: true
        }),
        new ExtractTextWebpackPlugin({
            filename: 'css/[name].[chunkhash:8].css'
        }),
    ]
}