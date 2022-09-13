var path = require('path');

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

module.exports = {
    entry: './src/main/js/App.js',
	target: process.env.NODE_ENV === "development" ? "web" : "browserslist",
    cache: true,
    mode: isDevelopment ? 'development' : 'production',
    output: {
        path: path.resolve(__dirname, 'src/main/resources/static'),
        filename: 'bundle.js',
    },
	devServer: {
		static: {
		  directory: path.resolve(__dirname, 'src/main/resources/static'),
		},
        hot: true,
		port: 3000,
        proxy: {
            '/api': 'http://localhost:8080',
        },
	},
    target: 'web',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }]
            }
        ]
    }
};