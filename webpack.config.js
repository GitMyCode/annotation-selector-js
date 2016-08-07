// webpack.config.js
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var Webpack = require('webpack')

module.exports = {
    entry: [
        "./Content/app/index.js",
        "./Content/app/bindings/binding.annotationSelector.js",
        "./Content/app/bindings/binding.bindHtml.js",
        "./Content/app/bindings/binding.hintAnnotation.js",
        "./Content/app/components/component.addAnnotation.js",
        "./Content/app/components/component.editAnnotation.js",
        "./Content/app/components/component.feedback.js",
        "./Content/app/components/component.select.js",
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            {
                test: /\.html$/,
                loader: "html?config=otherHtmlLoaderConfig"
            }
        ]
    }
};