/*
* @Author: Alpha
* @Date:   2019-12-25 14:32:54
* @Last Modified by:   Alpha
* @Last Modified time: 2019-12-25 17:47:00
*/

'use strict';

/************** 定义模型Model **************/
const axios = require('axios');
const qs = require('qs');
// 引入文件模块
const fs = require('fs');

const merge_path = __dirname+'/public/merge';

axios.defaults.headers = {
  "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
};

const url = 'https://aip.baidubce.com/rest/2.0/face/v1/merge?access_token=';

const token = '24.152710fc4b9bd9af755af4e9dc06d024.2592000.1579833659.282335-18103623';

const Ai = {
    getBase64: function(url){
        let file = fs.readFileSync(url);
        var base64Str = new Buffer(file).toString('base64');
        return base64Str;
    },
    getMergeImg: function(path1, path2, response){
        let httpurl = url+token;
        //处理下base64
        let oldbase = this.getBase64(path1);
        let newbase = this.getBase64(path2);

        let params = {
            image_template: {"image": oldbase, "image_type": 'BASE64', "quality_control": "NONE"},
            image_target: {"image": newbase, "image_type": 'BASE64', "quality_control": "NONE"},
        };
        axios.post(httpurl, qs.stringify(params)).then((res) => {
            if(!fs.existsSync(merge_path)){
                fs.mkdirSync(merge_path);
            }
            let name = new Date().getTime();
            //这里处理一下图片吧
            fs.writeFileSync(merge_path+"/"+name+".jpg", new Buffer(res.data.result.merge_image, 'base64'));
            response.send({merge_img: "/public/merge/"+name+".jpge"});
            return res.data;
        }).catch((error) => {
            console.log(error);
        })
    },
}

module.exports = Ai;