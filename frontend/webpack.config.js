const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    watchOptions: {
        ignored: /node_modules/,
    },
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                    limit: 200000 // Max file size = 200kb
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: "./src/index.html"
            }
        )
    ]
}