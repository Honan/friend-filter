const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: './dist'
    },
    entry: {
        main: './src/index.js',
        about: './src/about.new.js'
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, './dist')
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            // {
            //     test: /\.hbs/,
            //     exclude: /(node_modules|bower_components)/,
            //     loader: 'handlebars-loader',
            // }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html'
        }),
        new ExtractTextPlugin("styles.css")
    ]
};