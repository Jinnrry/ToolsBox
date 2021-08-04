<template>
  <div id="app">

    <el-container>
      <el-header class="header">
        <vheader/>
      </el-header>

      <el-container>

        <el-aside width="200px">
          <navmenu></navmenu>
        </el-aside>
        <el-main style="text-align: left;">
          <router-view/>
        </el-main>
      </el-container>


    </el-container>

  </div>
</template>

<script>
  import NavMenu from '@/components/NavMenu'
  import Header from '@/components/Header'

  export default {
    name: "App",
    components: {
      'navmenu': NavMenu,
      'vheader': Header
    }
  }

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  body {
    margin: 0;
    padding: 0;
  }

  .header {
    background-color: #409EFF;
    color: #fff;
    line-height: 60px;
  }


  a, a:link, a:visited, a:hover, a:active {
    text-decoration: none;
    color: inherit;
  }
</style>
