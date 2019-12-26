/*
* @Author: Alpha
* @Date:   2019-12-23 14:48:59
* @Last Modified by:   Alpha
* @Last Modified time: 2019-12-26 12:57:42
*/

'use strict';

module.exports = {
    // baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',
    devServer: {
        port: 8080, // 端口号
	host: '0.0.0.0',
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        proxy: { // 配置跨域
            '/api': {
                target: 'http://192.168.0.104:8088',
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        },
    }
}
