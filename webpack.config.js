const path = require("path");
const merge = require("webpack-merge");
const parts = require("./webpack.parts");

const PORT = process.env.PORT || 7777;

const commonConfig = merge([
    {
        entry: "./src/index.js",
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules)/,
                    loader: "babel-loader",
                    options: { presets: ["@babel/env"] }
                },
            ],
        },
        resolve: { 
            extensions: ["*", ".js", ".jsx"],
            alias: { 'react-dom': '@hot-loader/react-dom'  } 
        },
        output: {
            path: path.resolve(__dirname, "dist/"),
            publicPath: "/dist/",
            filename: "bundle.js"
        },
    }
]);


const productionConfig = merge([]);

const developmentConfig = merge([
    parts.devServer(PORT),
    parts.loadSCSS()
])


module.exports = mode => {
    if (mode === "production") {
        return merge(commonConfig, productionConfig, { mode });
    }

    return merge(commonConfig, developmentConfig, { mode });
}