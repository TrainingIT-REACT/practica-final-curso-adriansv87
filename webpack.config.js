// Librerías const 
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const WorkBoxPlugin = require('workbox-webpack-plugin');

const config = { 
    mode: 'development', // production, none // ... }
    entry: {  // Punto de entrada a tu aplicación
        path:'./src/index.js'
        //vendor: ['react', 'react-dom', 'react-router-dom']
    },
    output: { 
        // path: path.resolve(__dirname, 'build'), // Carpeta de salida 
        // publicPath: "/"

        path: path.resolve(__dirname, 'build'),
        // filename: "[name].js",
        publicPath: "/",
    }, 
    module: { 
        rules: [ 
            {   
                // Define a qué ficheros afecta 
                test: /\.js$/, 
                // Excluye carpetas del proyecto 
                exclude: /node_modules/, 
                // Indica el loader que gestiona el fichero
                // La clave "loader" es un atajo para use: [ "babel-loader" ] 
                loader: "babel-loader"
             }, 
             {
                 test: /\.css$/,
                 // Cuando tenemos más de uno, hay que utilizar "use" 
                 use: ['style-loader', 'css-loader'] 
                } 
            ] 
        },
        plugins: [ 
            new HtmlWebPackPlugin({ 
                template: "./public/index.html", 
                filename: "./index.html" ,
                favicon: "./public/favicon.ico"
            }) ,
            new WorkBoxPlugin.InjectManifest({
            swSrc: './src/sw.js',
            })
        ],
        devServer: {
            contentBase: './build',
            historyApiFallback: true,
            proxy: {
              '/': 'http://localhost:3001'
            }
          },
        devtool: 'source-map',
        optimization: {
            runtimeChunk: 'single',
            usedExports: true,
            sideEffects: false,
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: 'vendor',
                        name: 'vendor',
                        enforce: true,
                        chunks: 'all'
                    }
                }
            }
        }
    }
    
    module.exports = (env, argv) => {
        const isDevelopment = argv.mode === 'development';
        if (isDevelopment) {
            config.devtool = 'eval-source-map';
        } else {
            config.devtool = 'source-map';
        }
        return config;
    };
