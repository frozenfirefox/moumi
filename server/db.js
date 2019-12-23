/*
* @Author: Alpha
* @Date:   2019-12-23 10:39:40
* @Last Modified by:   Alpha
* @Last Modified time: 2019-12-23 12:24:13
*/

'use strict';

// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose');
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://test:test@127.0.0.1:27017/test'); // 地址跟第一步的地址对应。//直接连接数据库

// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error',() => console.log('Mongo connection error'));
db.once('open',() => console.log('Mongo connection successed'));
/************** 定义模式loginSchema **************/
const loginSchema = mongoose.Schema({
        account : String,
        password : String,
        name: String,
    },
    {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

/************** 定义模型Model **************/
const Models = {
    Login : mongoose.model('Login',loginSchema)
}

module.exports = Models;