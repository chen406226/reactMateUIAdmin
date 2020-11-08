const {merge} = require('webpack-merge');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const baseWebpackConfig = require('./webpack.config');
// const DashboardPlugin = require('webpack-dashboard/plugin');
// const Dashboard = require('webpack-dashboard');
const path = require('path');

// const dashboard = new Dashboard();
console.log("env: " +  process.NODE_ENV);
module.exports = merge(baseWebpackConfig, {
    plugins: [
        // new DashboardPlugin(dashboard.setData),
        // new webpack.NamedModulesPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        new BundleAnalyzerPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
    ],
});
