<template>
  <el-row class="tac">
    <el-col>
      <h5>导航栏</h5>
      <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <el-menu-item index="1" class="float_left">
          <a href="/#/Json2Struce">
            <i class="el-icon-menu"></i>
            <span slot="title">Json生成Go Struct</span>
          </a>
        </el-menu-item>

        <el-menu-item index="2" class="float_left">
          <a href="/#/BeautifulJson">
            <i class="el-icon-menu"></i>
            <span slot="title">Json美化</span>
          </a>
        </el-menu-item>


        <el-menu-item index="3" class="float_left">
          <a href="/#/Sql2Struct">
            <i class="el-icon-menu"></i>
            <span slot="title">SQL生成GO Struct</span>
          </a>
        </el-menu-item>

        <el-menu-item index="4" class="float_left">
          <a href="/#/About">
            <i class="el-icon-menu"></i>
            <span slot="title">关于ToolsBox</span>
          </a>
        </el-menu-item>


      </el-menu>
    </el-col>

  </el-row>
</template>


<style scoped>
  .float_left{
    float: left;
  }

</style>


<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
