<template>
  <div class="userList">
    <Header />
    <Row style="margin: 5px;">
      <Col span="16" style="text-align: left;text-indent: 10px;font-size:15px">
        列表信息
      </Col>
      <Col style="text-align: right;" span="8"><Button type="primary" @click="new_data">新增</Button></Col>
    </Row>
    <!-- 列表 -->
    <TableIndex :tableRow="tableRow" :tableData="tableData" msg=""/>
    <Modal
        title="录入行骗信息"
        v-model="modal"
        @on-ok="submit"
        @on-cancel="modal = false"
        ok-text="提交"
        cancel-text="取消"
        class-name="vertical-center-modal">
        <!-- //写form表单 -->
        <Input class="form-item" v-model="requestData.name" placeholder="请填写姓名"></Input>
        <Input class="form-item"  v-model="requestData.code" placeholder="请填写代号"></Input>
        <Input class="form-item"  v-model="requestData.des" type="textarea" placeholder="请填写描述信息"></Input>
        <Input class="form-item"  v-model="requestData.from" placeholder="请填写来源"></Input>
    </Modal>
  </div>
</template>

<script>
// @ is an alias to /src
import TableIndex from '@/components/table/Index.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'userList',
  components: {
    TableIndex,
    Header
  },
  data(){
    return {
        tableRow: [
            {
                title: '姓名',
                key: 'name',
            },
            {
                title: '代号',
                key: 'code'
            },
            {
                title: '描述',
                key: 'des',
            },
            {
                title: '来源',
                key: 'from',
            },
            {
                title: '创建时间',
                key: 'createdAt',
            },
        ],
        tableData:[],
        modal: false,
        requestData:{
            name: '',
            code: '',
            des: '',
            from: '',
        },
    }
  },
  mounted(){
    this.getUserData();
  },
  methods:{
    getUserData(){
        this.$axios.get('/api/cheat/getData').then((res) => {
            if(res.data.error_code != 200){
                this.$Message.error(res.data.error_msg);
            }
            this.tableData = res.data.data;
        }).catch((error) => {
            window.console.log(error);
        })
    },
    new_data(){
        this.modal = true;
        this.requestData.name   = '';
        this.requestData.code   = '';
        this.requestData.des    = '';
        this.requestData.from   = '';
    },
    submit(){
        //判断数据是否全部录入
        if(this.requestData.name == ''){
            this.$Message.info('请填写姓名');
            return;
        }
        if(this.requestData.code == ''){
            this.$Message.info('请填写代号');
            return;
        }
        if(this.requestData.des == ''){
            this.$Message.info('请填写描述信息');
            return;
        }
        if(this.requestData.from == ''){
            this.$Message.info('请填写信息来源');
            return;
        }

        this.$axios.post('/api/cheat/insert', this.$qs.stringify(this.requestData)).then((res) => {
            if(res.data.error_code != 200){
                this.$Message.error(res.data.error_msg);
                return;
            }
            this.$Message.success(res.data.error_msg);
            // this.loading = false;
            // window.console.log(this.merge_img, 222);
        }).catch((error) => {
            window.console.log(error);
        })
    },
  }
}
</script>



<style scoped>
img
{
    position:relative;
    animation:mymove 5s infinite;
    -webkit-animation:mymove 5s infinite; /*Safari and Chrome*/
}

@keyframes mymove
{
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
}

@-webkit-keyframes mymove /*Safari and Chrome*/
{
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
}
.vertical-center-modal .form-item{
    margin: 5px;
}
</style>