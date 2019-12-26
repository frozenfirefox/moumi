/*
* @Author: Alpha
* @Date:   2019-12-23 10:39:47
* @Last Modified by:   Alpha
* @Last Modified time: 2019-12-26 17:23:14
*/

// 可能是我的node版本问题，不用严格模式使用ES6语法会报错
"use strict";
const models = require('./db');
const express = require('express');
const router = express.Router();
// 引入文件模块
const fs = require('fs');
// 引入处理路径的模块
const path = require('path');
//引入ai自定义库
const ai = require('./ai')

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

// 创建账号接口
router.post('/api/login/createAccount',(req,res) => {
    // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
    let newAccount = new models.Login({
        account : req.body.account,
        password : req.body.password,
        name: req.body.name,
    });

    // 保存数据newAccount数据进mongoDB
    newAccount.save((err,data) => {
        if (err) {
            res.send(err);
        } else {
            res.send('createAccount successed');
        }
    });
});


// 获取已有账号接口
router.get('/api/login/getAccount',(req,res) => {
    // 通过模型去查找数据库
    models.Login.find((err,data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

//上传图片接口
router.post('/api/upload', (req, res) => {
    console.log(22222222);
    var oldName = req.files[0].path;
    var newName = oldName + path.parse(req.files[0].originalname).ext;

    fs.rename(oldName, newName, (err) => {
        if(err){
            res.send('err');
        }else{
            res.send({'path': newName});
        }
    })
});

router.get('*/public/*', function (req, res) {
    console.log(__dirname + "/" + req.url.replace('api/', ''));
    res.sendFile( __dirname + "/" + req.url.replace('api/', ''));
    // console.log("Request for " + req.url + " received.");
})

//生成新图片
router.post('/api/createMerge', function(req, res){
    //这里边处理；逻辑
    let data = ai.getMergeImg(req.body.template_img, req.body.target_img, res);
});

//人脸检测
router.post('/api/detect', function(req, res){
    console.log(333333333);
    //这里边处理；逻辑
    let data = ai.getDetect(req.body.detect_img, res);
});

/*********************************************开始编写骗子记录************************************************/
router.post('/api/cheat/insert', (req, res) => {
    //这里边编写入库
    let newData = new models.Cheat({
        name: req.body.name,
        code: req.body.code,
        des:  req.body.des,
        from: req.body.from,
    });

    let re = {};
    // 保存数据newAccount数据进mongoDB
    newData.save((err,data) => {
        if (err) {
            re.error_code   = 500;
            re.error_msg    = err;
        } else {
            re.error_code   = 200;
            re.error_msg    = '操作成功';
        }
        res.send(re);
    });
});

router.get('/api/cheat/getData', (req, res) => {
    let re = {};
    models.Cheat.find((err,data) => {
        if (err) {
            re.error_code   = 500;
            re.error_msg    = err;
        } else {
            re.error_code   = 200;
            re.error_msg    = '操作成功';
            re.data         = data;
        }
        res.send(re);
    });
});
module.exports = router;
