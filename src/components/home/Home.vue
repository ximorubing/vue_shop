<template>
    <el-container>
  <el-header>
      <div class="home_header">
      <img src="../../assets/img/heima.png" alt="">
      <span>电商后台管理系统</span>
      <el-button type="info" @click="logout()">退出</el-button>
      </div>
      
  </el-header>
  <el-container>
    <el-aside width="200px"><el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#333744"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="iconfont icon-user"></i>
          <span>用户管理</span>
        </template>
          <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              <span>用户列表</span>
              </el-menu-item>
          
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="iconfont icon-tijikongjian"></i>
          <span>权限管理</span>
        </template>
          <el-menu-item index="2-1">
              <i class="el-icon-menu"></i>
              <span>角色列表</span></el-menu-item>
          <el-menu-item index="2-2"><i class="el-icon-menu"></i><span>权限列表</span></el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="iconfont icon-3702mima"></i>
          <span>商品管理</span>
        </template>
          <el-menu-item index="3-1"><i class="el-icon-menu"></i><span>商品列表</span></el-menu-item>
          <el-menu-item index="3-2"><i class="el-icon-menu"></i><span>分类参数</span></el-menu-item>
          <el-menu-item index="3-2"><i class="el-icon-menu"></i><span>商品分类</span></el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="iconfont icon-danju"></i>
          <span>订单管理</span>
        </template>
          <el-menu-item index="4-1"><i class="el-icon-menu"></i><span>订单列表</span></el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="iconfont icon-baobiao"></i>
          <span>数据统计</span>
        </template>
          <el-menu-item index="5-1"><i class="el-icon-menu"></i><span>数据报表</span></el-menu-item>
      </el-submenu>
      </el-menu>
      </el-aside>
    <el-main>Main</el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
    
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      logout(){
          window.sessionStorage.clear()
          this.$router.push('/login')
      }
}
}
</script>

<style scoped>
    .el-submenu .iconfont{
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    }
    .el-container{
        width:100%;
        height: 100%;
    }
    .el-menu{
        height: 100%;
    }
    .el-header{
        background-color: #373d41;
        
    }
    .home_header{
        height: 60px;
        display: flex;
        position: relative;
       
    }
    .el-header span{
        font-weight: bold;
        line-height: 60px;
        margin-left: 20px;
        color:#fff;
    }

    .home_header img{
        width:60px;
        height: 60px;
		vertical-align: middle;
    }
    .home_header .el-button{
        position: absolute;
        right:0;
        top:15px;
        width:70px;
        height: 30px;
        
        


    }

    .el-aside{
        background-color: #333744;
    }
</style>