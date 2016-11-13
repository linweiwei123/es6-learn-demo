var path = require("path");
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //提取样式

module.exports = {
    entry: {
        app: ["./src/main.js"],
        vendor: ["angular"]
    },
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "",
        filename: "bundle.js"
    },
    module:{
        loaders:[
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a valid name to reference
                query: {
                    presets: ['es2015']
                }
            },
            { test:/\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
            {
                test: /\.(jpe?g|png|gif)$/,
                loader: 'url?limit=1024&name=img/[name].[ext]'
            },
            {
                test: /\.(woff2?|otf|eot|svg|ttf)\??.*$/i,
                loader: 'file?name=fonts/[name].[ext]'
            },
            {
                test: /\.html$/,
                loader: 'html'
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'index',
            template: './src/index.html',
            inject: 'body'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "scripts/vendor.js"
        }),
        //将样式统一发布到style.css中
        new ExtractTextPlugin("build.css", {
            allChunks: true,
            disable: false
        })

    ],
    devServer:{
        contentBase: './build',
        hot:true,
        inline:true
    }
};