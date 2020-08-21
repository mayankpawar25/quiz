const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = env => {
    var config = {
        entry: {
            CreateView: "./src/creationView/CreateView.js",
            ResponseView: "./src/responseView/ResponseView.js",
            DetailView: "./src/resultView/DetailView.js",
        },
        module: {
            rules: [{
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.html?$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }]
                }

            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        output: {
            filename: "[name].js",
            path: path.resolve(__dirname, 'output/js')
        },
        plugins: [
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin([{
                    from: 'actionManifest.json',
                    to: path.resolve(__dirname, 'output')
                },
                {
                    from: 'actionModel.json',
                    to: path.resolve(__dirname, 'output')
                },
                {
                    from: 'views',
                    to: path.resolve(__dirname, 'output')
                },
                {
                    from: 'assets',
                    to: path.resolve(__dirname, 'output')
                }
            ]),
        ]
    };

    if (env.mode === 'dev') {
        config.mode = 'development';
        config.devtool = 'cheap-module-source-map';
    } else {
        config.mode = 'production'
    }

    if (env.watch === 'true') {
        config.watch = true;
    } else {
        config.watch = false;
    }

    return config;
}