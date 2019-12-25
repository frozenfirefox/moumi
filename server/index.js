/*
* @Author: Alpha
* @Date:   2019-12-23 10:39:35
* @Last Modified by:   Alpha
* @Last Modified time: 2019-12-25 14:48:05
*/

'use strict';

// 引入编写好的api
const api = require('./api');
// 引入文件模块
const fs = require('fs');
// 引入处理路径的模块
const path = require('path');
// 引入处理post数据的模块
const bodyParser = require('body-parser')
// 引入Express
const express = require('express');
const app = express();

const multer = require('multer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//解析post文件
var objMulter = multer({dest:'./public/upload'})
app.use(objMulter.any());

app.use(api);
// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, '../dist')))
// 因为是单页应用 所有请求都走/dist/index.html
app.get('*', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
    res.send(html)
})

var port = 8088

// 监听8088端口
app.listen(port);
console.log('success listen…………'+port+',访问地址\r\n http://192.168.0.104:'+port);