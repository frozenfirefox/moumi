<template>
  <div class="userList">
    <div><Button type="primary">新增</Button></div>
    <TableIndex :tableRow="tableRow" :tableData="tableData" msg="用户列表"/>
  </div>
</template>

<script>
// @ is an alias to /src
import TableIndex from '@/components/table/Index.vue'

export default {
  name: 'userList',
  components: {
    TableIndex
  },
  data(){
    return {
        tableRow: [
            {
                title: '用户名',
                key: 'account',
            },
            {
                title: '密码',
                key: 'password'
            },
            {
                title: '姓名',
                key: 'name',
            },
        ],
        tableData:[]
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
    }
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
</style>