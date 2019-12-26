<template>
  <div class="aiface">
    <Header />
    <Row justify="center">
        <Col span="8" offset="3">
            <Upload class="template_img"
                type="drag"
                action="/api/upload"
                :on-success="success"
                :show-upload-list="false"
                >
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>上传模板图片</p>
                    <img v-if="template_img" :src="'/api/'+template_img" />
                </div>
            </Upload>
        </Col>
        <Col span="8" offset="1">
            <Upload class="target_img"
                type="drag"
                action="/api/upload"
                :on-success="success2"
                :show-upload-list="false"
                >
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>上传目标图片图片</p>
                    <img v-if="target_img" :src="'/api/'+target_img" />
                </div>
            </Upload>
        </Col>
    </Row>
    <Row justify="center">
        <Col span="24">
            <span style="color: red;">#tip:选择上传模板图片，然后选择上传目标图片，最后点击合成，即可生成融合照片！</span>
        </Col>
    </Row>
    <div class="create">
        <Button type="success" :loading="loading" @click="create_code">
            <span v-if="loading">生成中</span>
            <sapn v-else>生成合照</sapn>
        </Button>
    </div>

    <div class="merge_img" v-if="merge_img">
        <img style="height: 200px" :src="'/api/'+merge_img" />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'aiface',
  data(){
    return {
        merge_img: '',
        template_img: '',
        target_img: '',
        loading: false,
    }
  },
  components: {
    Header
  },
  mounted(){
    this.getUserData();
  },
  methods:{
    getUserData(){
        this.$axios.get('/api/login/getAccount').then((res) => {
            this.tableData = res.data;
        }).catch((error) => {
            window.console.log(error);
        })
    },
    success(response){
        this.template_img = response.path;
    },
    success2(response){
        this.target_img = response.path;
    },
    create_code(){
        if(this.template_img == ''){
            this.$Message.info('请上传模板照片');
            return false;
        }

        if(this.target_img == ''){
            this.$Message.info('请上传目标照片');
            return false;
        }

        this.loading = true;
        this.$axios.post('/api/createMerge', this.$qs.stringify({
            template_img: this.template_img,
            target_img: this.target_img,
        })).then((res) => {
            if(res.data.error_code != 200){
                this.$Message.error(res.data.error_msg);
            }
            this.merge_img = res.data.merge_img;
            this.loading = false;
            window.console.log(this.merge_img, 222);
        }).catch((error) => {
            window.console.log(error);
        })
    },
  }
}
</script>



<style scoped>
.aiface{
    padding: 20px;
    background: #6793c194;
}
.template_img{
    height: 400px;
}
.template_img img{
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