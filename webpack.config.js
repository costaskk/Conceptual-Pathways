const path = require('path');

module.exports = {
    module: {
      rules: [
          {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader',
            ]
        },
      ],
    },
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        static: {
          directory: path.join(__dirname, 'static'),
          publicPath: '/',
        },
        compress: true,
        port: 9000,
      },
  };