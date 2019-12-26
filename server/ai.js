/*
* @Author: Alpha
* @Date:   2019-12-25 14:32:54
* @Last Modified by:   Alpha
* @Last Modified time: 2019-12-26 13:06:14
*/

'use strict';

/************** 定义模型Model **************/
const axios = require('axios');
const qs = require('qs');
// 引入文件模块
const fs = require('fs');
const path = require('path');

const merge_path = __dirname+'/public/merge';

axios.defaults.headers = {
  "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
};

const url = 'https://aip.baidubce.com/rest/2.0/face/v1/merge?access_token=';

const token = '24.152710fc4b9bd9af755af4e9dc06d024.2592000.1579833659.282335-18103623';
//人脸检测api
const url_detect = 'https://aip.baidubce.com/rest/2.0/face/v3/detect?access_token=';

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
            let re = {};
            // console.log(res.data);
            if(res.data.error_code != 0){
                //处理错误的返回
                re.error_code   = res.data.error_code;
                re.error_msg    = res.data.error_msg;
                response.send(re);
                return false;
            }

            //处理正常的返回
            if(!fs.existsSync(merge_path)){
                fs.mkdirSync(merge_path);
            }

            let name = path.parse(path1).name+'_'+path.parse(path2).name;
            let pic_path = merge_path+"/"+name+".jpg";

            //这里处理一下图片吧
            fs.writeFileSync(pic_path, new Buffer(res.data.result.merge_image, 'base64'));
            re.error_code = 200;
            re.merge_img  = '/public/merge/'+name+".jpg";
            response.send(re);
            return true;
        }).catch((error) => {
            console.log(error);
        })
    },
    getDetect: function(path1, response){
        let httpurl = url_detect+token;
        let imgbase64 = this.getBase64(path1);
        let params = {
            image: imgbase64,
            image_type: "BASE64",
            face_field: "age,beauty,expression,face_shape,gender,glasses,landmark,landmark150,race,quality,eye_status,emotion,face_type",
        };

        axios.post(httpurl, qs.stringify(params)).then((res) => {
            let re = {};
            // console.log(res.data);
            if(res.data.error_code != 0){
                //处理错误的返回
                re.error_code   = res.data.error_code;
                re.error_msg    = res.data.error_msg;
                response.send(re);
                return false;
            }

            res.data.error_code = 200;
            response.send(res.data);
            return true;
        }).catch((error) => {
            console.log(error);
        })
    },
}

module.exports = Ai;
