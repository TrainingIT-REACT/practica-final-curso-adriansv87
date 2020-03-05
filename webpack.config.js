// Librerías const 
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = { 
    mode: 'development', // production, none // ... }
    entry: './src/index.js', // Punto de entrada a tu aplicación

    // Otras configuraciones 
    devServer: { 
        // Carpeta de salida 
        contentBase: './build', 
        // Forzamos a que todas las peticiones se respondan con index.html 
        historyApiFallback: true 
    },
    output: { 
        path: path.resolve(__dirname, 'build'), // Carpeta de salida 
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
                filename: "./index.html" 
            }) 
        ] 
    };