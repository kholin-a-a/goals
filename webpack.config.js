var HtmlWebpackPlugin = require('html-webpack-plugin');
const AppManifestWebpackPlugin = require('app-manifest-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path = require('path');

module.exports = {
    mode: "development",

    entry: "./src/index.js",

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash].js"
    },

    resolve: {
      modules: [
        path.resolve(__dirname, "src"),
        path.resolve(__dirname, "node_modules")
      ]
    },

    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
              loader: "babel-loader"
            }
          },
          {
            test: /(\.css)$/,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  modules: true
                }
              }
            ]
          },
        ]
    },

    plugins: [
      new CleanWebpackPlugin(),
      
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src/index.html")
      }),

      new AppManifestWebpackPlugin({
        logo: path.resolve(__dirname, 'assets/icon.png'),

        config: {
          appName: "Goals",
          appDescription: "Simple goals tracker",
          developerName: "Alexandr Kholin",
          background: "#2C3E50",
          theme_color: "#34495E",
          start_url: "/",
          version: "0.1"
        },
      }),

      new WorkboxPlugin.GenerateSW({
        include: [/\.(?:html|js)$/]
      })
    ],

    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        compress: true,
        host: '0.0.0.0',
        port: 3000,
        historyApiFallback: true,
        writeToDisk: true
    }
}