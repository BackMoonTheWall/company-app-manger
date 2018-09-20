const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: 'cheap-module-source-map',
    entry: {
        index: "./src/index.js"
    },
    output: {
        filename: "js/[name].bundle.js",
        path: path.join(__dirname, "../dist")
    },
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                use: "eslint-loader",
                include: path.resolve(__dirname, "../src"),
            },
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: 'thread-loader',
                        options: {
                            poolTimeout: Infinity // keep workers alive for more effective watch mode
                        },
                    },
                    'babel-loader'
                ],
                exclude: [
                    /node_modules/
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader",
                ]
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
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
    devServer: {
        host: '0.0.0.0',
        port: 8889,
        contentBase: path.join(__dirname, "../public"),
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, "../public", "index.html")
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CaseSensitivePathsPlugin()
    ]
}