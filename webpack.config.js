module.exports = {
    target: "electron-renderer",
    entry: {
        settings: './pages/src/settings.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + "/pages/dist"
    },
    watchOptions: {
        ignored: /node_modules/
    },
    module: {
        rules: [
            {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: [
                    [
                        "import", {
                        "libraryName": "antd",
                        "libraryDirectory": "es",
                        "style": "css" // `style: true` 会加载 less 文件
                        }
                    ],
                    ["@babel/plugin-proposal-class-properties"]
                ]
                }
            }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ]
    }
}