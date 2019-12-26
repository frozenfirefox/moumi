<template>
  <div class="header">
    <Row>
        <Col span="8">
            <a  target="_blank" href="https://sci-hub.tw">
                <Card>
                    <div style="text-align:center">
                        <img style="width: 50px;" src="../assets/image/logo.png">
                        <h3>查阅文献</h3>
                    </div>
                </Card>
            </a>
        </Col>
        <Col span="8">
            <router-link to="/about">
                <Card>
                    <div style="text-align:center">
                        <img style="width: 50px;" src="../assets/image/logo.png">
                        <h3>关于我们</h3>
                    </div>
                </Card>
            </router-link>
        </Col>
        <Col span="8">
            <router-link to="/aiface">
                <Card>
                    <div style="text-align:center">
                        <img style="width: 50px;" src="../assets/image/logo.png">
                        <h3>人脸融合</h3>
                    </div>
                </Card>
            </router-link>
        </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.header{
  margin: 10px;
}
</style>
