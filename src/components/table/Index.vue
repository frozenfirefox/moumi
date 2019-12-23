<template>
  <div class="hello">
    <h1>{{msg}}</h1>
    <Table border :columns="tableRow" :data="tableData"></Table>
  </div>
</template>

<script>
export default {
  name: 'TableIndex',
  props: {
    msg: String,
    tableData: [Array, Object],
    tableRow: Array,
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
</style>
