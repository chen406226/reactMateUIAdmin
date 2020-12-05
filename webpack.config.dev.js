const {merge} = require('webpack-merge');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const baseWebpackConfig = require('./webpack.config');
// const DashboardPlugin = require('webpack-dashboard/plugin');
// const Dashboard = require('webpack-dashboard');
const path = require('path');

// const dashboard = new Dashboard();
const prod = process.env['NODE_ENV'] === 'production';
console.log("env: " + (!prod ? 'development' : 'production'));
module.exports = merge(baseWebpackConfig, {

    // devtool: 'source-map',
    plugins: [
        // new DashboardPlugin(dashboard.setData),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // new BundleAnalyzerPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
    ],
    devServer: {
        compress: true,
        contentBase: path.join(__dirname, "./dist"),
        publicPath: "/",
        quiet: false,
        hot: true,
        port: 8001,
        open:true,
        disableHostCheck: true,
        // historyApiFallback: {
        //     index: '/index.html'
        // },
        host: 'localhost',
        historyApiFallback: true,
        proxy: {
          '/api': {
              target: 'http://localhost:8889',
              secure: false,
              changeOrigin: true,
              pathRewrite: {
                  '^/api': ''
              },
          },
      },
        // proxy: {
        //     // '/view':'/index.html',
        //     // '/rest':{
        //     //     target: 'http://39.106.212.120:8080',
        //     //     // pathRewrite:{'^/rest':'rest/inventory-service'}
        //     // },
        //     // '/rest/inventory-service': {
        //     //     target: 'http://192.168.2.39:8081',
        //     //     pathRewrite: {'/rest/inventory-service': ''}
        //     // },
        //     '/index.php': {
        //         target: 'http://ltmk.51rz.com',
        //         changeOrigin: true,
        //         // pathRewrite:{'^/api':'/index.php'}
        //     },

        // }

    }
});
