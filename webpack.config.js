var path = require('path');

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

module.exports = {
    entry: './src/main/js/App.js',
	target: process.env.NODE_ENV === "development" ? "web" : "browserslist",
    cache: true,
    mode: 'development',
    output: {
        path: __dirname,
        filename: './src/main/resources/static/built/bundle.js',
		publicPath: './src/main/resources/static/built'
    },
	devServer: {
		static: {
		  directory: path.resolve(__dirname, './src/main/resources/templates'),
		},
		hot: true,
		port: 8080
	},
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