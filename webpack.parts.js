const path = require("path");
const webpack = require("webpack");

exports.loadSCSS = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.scss$/,
                include,
                exclude,

                use: ["style-loader", "css-loader", "sass-loader"]
            },
        ],
    },
});

exports.devServer = ({ port } ={}) => ({
    devServer: {
        contentBase: path.join(__dirname, "public/"),
        stats: "errors-only",
        port,
        publicPath: "http://localhost:7777/dist/",
        hotOnly: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
});