<template>
  <div id="app">
    <!-- <div id="nav">
        <Menu mode="horizontal" theme="light" active-name="2">
            <MenuItem name="1">
                <Icon type="ios-paper" />
                <a  target="_blank" href="https://sci-hub.tw">文献查询</a>
            </MenuItem>
            <MenuItem name="2">
                <Icon type="ios-people" />
                <router-link to="/about">关于我们</router-link>
            </MenuItem>
            <MenuItem name="3">
                <Icon type="ios-people" />
                <router-link to="/userList">用户列表</router-link>
            </MenuItem>
            <MenuItem name="4">
                <Icon type="ios-paper" />
                <router-link to="/aiface">人脸融合</router-link>
            </MenuItem>
            <Submenu name="3">
                <template slot="title">
                    <Icon type="ios-stats" />
                    统计分析
                </template>
                <MenuGroup title="使用">
                    <MenuItem name="3-1">新增和启动</MenuItem>
                    <MenuItem name="3-2">活跃分析</MenuItem>
                    <MenuItem name="3-3">时段分析</MenuItem>
                </MenuGroup>
                <MenuGroup title="留存">
                    <MenuItem name="3-4">用户留存</MenuItem>
                    <MenuItem name="3-5">流失用户</MenuItem>
                </MenuGroup>
            </Submenu>
            <MenuItem name="4">
                <Icon type="ios-construct" />
                综合设置
            </MenuItem>
        </Menu>
    </div> -->
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
