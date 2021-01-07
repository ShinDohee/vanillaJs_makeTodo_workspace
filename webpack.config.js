var webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const path = require('path');

module.exports = {
    context: __dirname,
    devtool: 'source-map', // 오류가 발생 햇을 때, 개발자 도구에서 오류가 발생한 지점을 잡아줌
    entry: './js/app.js', // javastript 앱이 시작되는 첫파일 
    mode: 'development',
    output: {
        path: './',
        filename: 'bundle.js'
    }, // 번들 된 결과 파일을 어디에 저장 할 것인지 결정 하는 결정 하는부분
    // entry에서 여러 파일 선택 하면, filename을 설정할때 [name]변수로 사용해, 번들되는 파일 구분

    module: {
        devServer: {
            contentBase: path.join(__dirname, "dist"), //정적 파일을 제공할 경로이다. 절대경로를 사용할 것을 권장
            publicPath: "/", //브라우저를 통해 접근하는 경로이다. 기본값은 '/' 스트링 값
            host: "dev.domain.com", //개발환경에서 도메인을 맞춰야 하는 상황에서 사용한다.
            overlay: true, //빌드시 에러나 경고를 브라우저 화면에 표시여부 
            port: 8080,
            stats: "errors-only", //메시지 수준을 정할 수 있다. 'none', 'errors-only', 'minimal','normal', 'verbose' 등이 있음 
            historyApiFallback: true, //히스토리 API를 사용하는 SPA 개발 시 설정한다. 404가 발생하면 index.html로 리다이렉트
        },
        preLoaders: [{
            test: /\.js$/,
            loader: 'eslint',
            exclude: /(node_modules|bower_components)/
        }],
        loaders: [{
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.js$/,
            loader: 'babel',
            exclude: /(node_modules|bower_components)/,
            query: {
                presets: ['es2015']
            }
        }]
    }, // 설치한 npm  들을 load 할 수 있다. 


    plugins: [

        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
}