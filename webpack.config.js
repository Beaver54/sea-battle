const path = require("path");
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        port: 3001,
        hot: isDev,
    },
    resolve: {
        alias: {
            //'@': path.resolve(__dirname, 'src'),
        }
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'style.mini.css',
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['dist'] },
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {

                        },
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ],
                        plugins: [
                            [
                                "@babel/plugin-proposal-class-properties",
                                {
                                    "loose": true
                                }
                            ]
                        ]
                    }
                }
            },
            {
                test: /\.(ttf|woff|woff2|eot|svg)$/,
                use: ['file-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                    context: './src/images',
                    outputPath: 'images',
                    publicPath: '/images',
                },
            },
        ]
    },
    optimization: {
        minimize: isProd,
        minimizer: [
            new CssMinimizerPlugin(),
        ]
    }
};