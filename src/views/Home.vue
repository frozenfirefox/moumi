<template>
  <div class="home">
    <Header />
    <img class="circle" alt="Vue logo" src="../assets/image/logo.png">
    <HelloWorld msg="欢迎登陆火星火箭！"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    Header
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