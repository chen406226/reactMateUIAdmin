const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const path = require( 'path' );
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const HappyPack = require('happypack')
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

let env = process.env.NODE_ENV||'development'

module.exports = {
   context: __dirname,
   mode: env,
//    entry: './src/index.js',
//    entry: {
//        main:["babel-polyfill", './src/index.js']
//    }, //babel6
   entry: {
       main:["@babel/polyfill", './src/index.js'],
       login:["@babel/polyfill", './src/login.js'],
   }, //babel7
   output: {
      path: path.resolve( __dirname, 'dist' ),
      filename: 'js/[name].js',
      publicPath: '/',
      chunkFilename: 'js/chunk/[name]-[id].common.js'
   },
   module: {
      rules: [
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            // use:['babel-loader']
            use: {
                loader: 'happypack/loader?id=happyBabel',
            }
        },
        {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            // use:['babel-loader']
            use: {
                loader: 'ts-loader',
            }
        },
         {
            test: /\.css$/,
            // exclude: /node_modules/,
            use: [
                'style-loader',
                'css-loader',
                {
                  loader: 'postcss-loader',
                  options: {
                    postcssOptions: {
                      plugins: [
                        [
                          'postcss-preset-env',
                          {
                            // Options
                          },
                        ],
                      ],
                    },
                  },
                },
              ],
            // use: ['style-loader', 'css-loader'],
         },
        //  {
        //     test: /\.css$/,
        //     // exclude: /node_modules/,
        //     use: ExtractTextPlugin.extract({
        //         fallback: "style-loader",
        //         use: ['css-loader','postcss-loader']
        //     }),
        // },
        {
            test: /\.less$/,
            use: [
                // {   loader: MiniCssExtractPlugin.loader,
                //     options: {
                //         esModule: true,
                //     },
                // },
                'style-loader',
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                },
              },
              'postcss-loader',
              {
                loader: 'less-loader',
                options: {
                  sourceMap: true,
                },
              },
            ],
          },
        {
            test: /\.(png|jpg|jpeg|gif|svg)(\?[\s\S]+)?$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        publicPath: '/assets/',
                        outputPath: 'assets/'
                    },
                }
            ]
        },
        {
            test: /\.(eot|woff|woff2|ttf|svg)(\?[\s\S]+)?$/,
            loader: 'url-loader',
            options: {
                limit: 100,
                name: '[name].[ext]',
                publicPath: '/fonts/',
                outputPath: 'fonts/'
            },
            exclude: /node_modules/,
        },
]
   },
   plugins: [
        // new ExtractTextPlugin({filename: 'css/[name].[hash].css', allChunks: true}),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:8].css',
            chunkFilename: '[id].css',
          }),
      new HtmlWebPackPlugin({
         template: path.resolve( __dirname, 'public/index.html' ),
         filename: 'index.html',
         chunks: ['main','vendor','react','react-dom'],
         inject: true,
      }),
      new HtmlWebPackPlugin({
         template: path.resolve( __dirname, 'public/index.html' ),
         chunks: ['login','vendor','react','react-dom'],

         filename: 'login.html',
         inject: true,
      }),
        new HappyPack({
            //用id来标识 happypack处理那里类文件
          id: 'happyBabel',
          //如何处理  用法和loader 的配置一样
          loaders: [{
            // loader: 'babel-loader?cacheDirectory=true',
            loader: 'babel-loader?cacheDirectory=false',
          }],
          //共享进程池
          threadPool: happyThreadPool,
          //允许 HappyPack 输出日志
          verbose: false,
        }),
   ],
   resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            views: path.resolve(__dirname, 'src/views'),
            assets: path.resolve(__dirname, 'src/assets'),
            variables: path.resolve(__dirname, 'src/variables'),
            components: path.resolve(__dirname, 'src/components'),
            // components: path.resolve(__dirname, 'src/Components/'),

            // api: path.resolve(__dirname, 'src/Api/'),
            // constants: prod
            //     ? path.resolve(__dirname, 'src/constants/system-profile-prod.json')
            //     : path.resolve(__dirname, 'src/constants/system-profile-dev.json'),
        },
        extensions: ['.js', '.jsx', 'css', 'less','.scss'],
    },
    optimization: {
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            // chunks: "async",
            chunks: "all",
            // minSize: 30000,
            // minChunks: 1,
            // maxAsyncRequests: 5,
            // maxInitialRequests: 3,
            // automaticNameDelimiter: '~',
            // name: true,
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.less$/,
                    chunks: 'all',
                    enforce: true,
                  },
                // common: {
                //     chunks: "initial",
                //     name: "common",
                //     minChunks: 2,
                //     maxInitialRequests: 5,
                //     minSize: 0
                // },
                // 'react': {
                //     chunks: "initial",
                //     name: "react",
                //     test:/react/,
                //     priority:10,
                //     minChunks: 2,
                //     maxInitialRequests: 5,
                //     minSize: 0
                // },
                // 'moment': {
                //     chunks: "initial",
                //     name: "moment",
                //     test:/moment/,
                //     priority:12,
                //     minChunks: 2,
                //     maxInitialRequests: 5,
                //     minSize: 0
                // },
                // 'react-dom': {
                //     chunks: "initial",
                //     name: "react-dom",
                //     priority:11,
                //     test:/react-dom/,
                //     minChunks: 2,
                //     maxInitialRequests: 5,
                //     minSize: 0
                // },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                    // priority: -10
                },
                // vendor: {
                //     chunks: "initial",
                //     name: "vendor",
                //     priority: 10,
                //     enforce: true
                // }
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            },
            
        }
    },
};