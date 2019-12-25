<template>
  <div class="aiface">
    <div class="all">
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

            <div class="merge_img" v-if="merge_img">
                合成照片：
                <img style="width: 400px; height: 400px" :src="'/api/'+merge_img" />
            </div>
    </div>
    <div class="create">
        <Button type="primary" @click="create_code">生成合照</Button>
    </div>


  </div>
</template>

<script>

export default {
  name: 'aiface',
  data(){
    return {
        merge_img: '',
        template_img: '',
        target_img: '',
    }
  },
  mounted(){
    this.getUserData();
  },
  methods:{
    getUserData(){
        this.$axios.get('/api/login/getAccount').then((res) => {
            this.tableData = res.data;
        }).catch((error) => {
            console.log(error);
        })
    },
    success(response){
        this.template_img = response.path;
    },
    success2(response){
        this.target_img = response.path;
    },
    create_code(){
        this.$axios.post('/api/createMerge', this.$qs.stringify({
            template_img: this.template_img,
            target_img: this.target_img,
        })).then((res) => {
            this.merge_img = res.data.merge_img;
        }).catch((error) => {
            console.log(error);
        })
    },
  }
}
</script>



<style scoped>

.template_img{
    width: 300px;
    height: 200px;
}
.template_img img{
    width: 100px;
    height: 100px;
}

.target_img{
    width: 300px;
    height: 200px;
}
.target_img img{
    width: 100px;
    height: 100px;
}
.all{
    display: flex;
}
.merge_img{

}
.merge_img .img{
    width: 200px !important;
    height: 200px !important;
}
</style>