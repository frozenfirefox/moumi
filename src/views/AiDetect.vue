<template>
  <div class="aidetect">
    <Header />
    <Row justify="center">
        <Col span="8" offset="8">
            <Upload class="detect_img"
                type="drag"
                action="/api/upload"
                :on-success="success"
                :show-upload-list="false"
                >
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>上传检测颜值照片</p>
                    <img v-if="detect_img" :src="'/api/'+detect_img" />
                </div>
            </Upload>
        </Col>
    </Row>
    <Row justify="center">
        <Col span="24">
            <span style="color: red;">#tip:选择上传检测颜值照片，点击检测！</span>
        </Col>
    </Row>
    <div class="create">
        <Button type="success" :loading="loading" @click="create_code">
            <span v-if="loading">检测中</span>
            <sapn v-else>检测</sapn>
        </Button>
    </div>

    <div class="merge_img" v-if="detect_info != ''">
        年龄：{{detect_info.face_list[0].age}}<br/>
        性别：{{detect_info.face_list[0].gender.type}}<br/>
        脸型： {{detect_info.face_list[0].face_shape.type}}<br/>
        表情： {{detect_info.face_list[0].emotion.type}}<br/>
        颜值评分：{{detect_info.face_list[0].beauty}} （0-100，越高越美）<br/>
        进化完整度：{{detect_info.face_list[0].face_probability}} （0-1，越高进化度越高）<br/>

        专家建议：{{detect_info.face_list[0].beauty > 30 ? '小有姿色':'颜值乃天定'}}<br/>
    </div>

  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'AiDetect',
  data(){
    return {
        detect_info: '',
        detect_img: '',
        loading: false,
    }
  },
  components: {
    Header
  },
  mounted(){
  },
  methods:{
    success(response){
        this.detect_img = response.path;
    },
    create_code(){
        if(this.detect_img == ''){
            this.$Message.info('请上传模板照片');
            return false;
        }

        this.loading = true;
        this.$axios.post('/api/detect', this.$qs.stringify({
            detect_img: this.detect_img,
        })).then((res) => {
            if(res.data.error_code != 200){
                this.$Message.error(res.data.error_msg);
            }
            this.detect_info = res.data.result;
            this.loading = false;
        }).catch((error) => {
            window.console.log(error);
        })
    },
  }
}
</script>



<style scoped>
.aidetect{
    padding: 20px;
    background: #6793c194;
}
.detect_img{
    height: 400px;
}
.detect_img img{
    height:200px;
}

.target_img{
    height: 400px;
}
.target_img img{
    height: 200px;
}
.all{
    display: flex;
}
.merge_img{
    margin-top: 20px;
}
</style>