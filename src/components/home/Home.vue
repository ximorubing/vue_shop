<template>
    <el-container>
  <el-header>
      <div class="home_header">
      <img src="../../assets/img/heima.png" alt="">
      <span>电商后台管理系统</span>
      <el-button type="info" @click="logout()" size="medium">退出</el-button>
      </div>
      
  </el-header>
  <el-container>
    <el-aside :width="isCollapse==true?'56px':'200px'">
      <div class="toggleBtn" @click="toggleCollapse" >|||</div>
        <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#333744"
      text-color="#fff"
      active-text-color="#409eff" unique-opened :collapse="isCollapse" :collapse-transition="false">
      <el-submenu :index="`${item.id}`" v-for="item in MenuList" :key="item.id" > 
        <template slot="title">
          <i :class="iconsObj[item.id]"></i>
          <span>{{item.authName}}</span>
        </template>
          <el-menu-item :index="`${subItem.id}`" v-for="subItem in item.children" :key="subItem.id">
              <i class="el-icon-menu"></i>
              <span>{{subItem.authName}}</span>
              </el-menu-item>
          
      </el-submenu>
        </el-menu>
      </el-aside>
    <el-main>Main</el-main>
  </el-container>
</el-container>
</template>

<script>
import { request } from 'http';
export default {
    data(){
        return{
          MenuList:[],
          iconsObj: {
                '125': 'iconfont icon-user',
                '103': 'iconfont icon-tijikongjian',
                '101': 'iconfont icon-shangpin',
                '102': 'iconfont icon-danju',
                '145': 'iconfont icon-baobiao'
            },
          isCollapse:false

        }

    },
    created(){
        this.getMenuList()

    },
    
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
      },
       async getMenuList(){
        const res= await this.request({
              url:'menus'
              
          })
        console.log(res);
        if(res.meta.status!==200) return this.$message.error(res.meta.msg)
        this.MenuList=res.data;

      },
      toggleCollapse(){
        this.isCollapse=!this.isCollapse
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
        
        border-right:none;
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
    }

    .el-aside{
        background-color: #333744;
    }

    .el-aside .toggleBtn{
       height: 30px;
       background-color:#4a5064;
       color: #fff;
       text-align: center;
       line-height: 30px;
       letter-spacing:4px;

    }
</style>