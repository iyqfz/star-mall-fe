var webpack             = require('webpack');
var ExtractTextPlugin   = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin   = require("html-webpack-plugin");

//环境变量配置，dev / online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';

//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name,title){
    return {
        template : './src/view/' + name + '.html',  //html原始的模板
        filename : 'view/' + name + '.html',        //目标文件的位置
        favicon  : './favicon.ico',
        title    : title,
        inject   : true,                        
        hash     : true,
        chunks   : ['common',name]                  //需要打包的模块
    }
};
//webpack config
var config = {
    // devServer: {
    //     host: 'localhost.charlesproxy.com',
    // },
    entry: {
        'common'                                 : ['./src/page/common/index.js'],
        'index'                                  : ['./src/page/index/index.js'],
        'list'                                   : ['./src/page/list/index.js'],
        'detail'                                 : ['./src/page/detail/index.js'],
        'cart'                                   : ['./src/page/cart/index.js'],
        'order-confirm'                          : ['./src/page/order-confirm/index.js'],
        'order-list'                             : ['./src/page/order-list/index.js'],
        'order-detail'                           : ['./src/page/order-detail/index.js'],
        'payment'                                : ['./src/page/payment/index.js'],
        'user-login'                             : ['./src/page/user-login/index.js'],
        'user-register'                          : ['./src/page/user-register/index.js'],
        'user-pass-reset'                        : ['./src/page/user-pass-reset/index.js'],
        'user-center'                            : ['./src/page/user-center/index.js'],
        'user-center-update'                     : ['./src/page/user-center-update/index.js'],
        'user-pass-update'                       : ['./src/page/user-pass-update/index.js'],
        'result'                                 : ['./src/page/result/index.js'],
        'about'                                  : ['./src/page/about/index.js'],
        'customer-service'                       : ['./src/page/customer-service/index.js'],
        'customer-service-form'                  : ['./src/page/customer-service-form/index.js']
    },
    output: {
        path       : './dist/',         //文件存放的位置
        publicPath : 'dev' === WEBPACK_ENV ? '/dist/' : '//static.iyqrj.com/star-mall-fe/dist/',   //访问的路径
        filename   : 'js/[name].js'
    },
    externals : {
        'jquery' : 'window.jQuery'
    },
    module : {
        loaders : [
            { test: /\.css$/, loader : ExtractTextPlugin.extract("style-loader","css-loader") },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader : 'url-loader?limit=100&name=resource/[name].[ext]' },
            { 
                test: /\.string$/, 
                loader: 'html-loader',
                query : {
                    minimize : true,    //告诉htmlLoader，加载文件时做最小化的压缩
                    removeAttributeQuotes : false    //指定是否要删除属性上的引号，false:不删除引号。引起问题的地方：新增地址处出现斜杠
                }
            }
        ]
    },
    resolve : {
        alias : {   //自己写的模块引用的别名
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image'
        }
    },
    plugins : [
        // 独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js' //路径基于output->path
        }),
        // 把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        //html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('list','商品列表页')),
        new HtmlWebpackPlugin(getHtmlConfig('detail','商品详情页')),
        new HtmlWebpackPlugin(getHtmlConfig('cart','购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm','订单确认')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list','订单列表')),
        new HtmlWebpackPlugin(getHtmlConfig('order-detail','订单详情')),
        new HtmlWebpackPlugin(getHtmlConfig('payment','订单支付')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update','修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
        new HtmlWebpackPlugin(getHtmlConfig('about','关于麦乐')),
        new HtmlWebpackPlugin(getHtmlConfig('customer-service','售后管理')),
        new HtmlWebpackPlugin(getHtmlConfig('customer-service-form','订单售后'))
        
    ]
};

if('dev' === WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/'); 
}

module.exports = config;