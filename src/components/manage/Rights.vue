<template>
<div class="rightContainer">
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>权限管理</el-breadcrumb-item>
  <el-breadcrumb-item>权限列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card class="box-card">
       <el-table
    :data="rightlist"
    border
    style="width: 100%">
     <el-table-column
      type="index">
    </el-table-column>
    <el-table-column
      prop="authName"
      label="权限名称"
      width="300">
    </el-table-column>
    <el-table-column
      prop="path"
      label="路径"
      width="300">
    </el-table-column>
    <el-table-column
      prop="level"
      label="权限等级">
      <template slot-scope="scope">
          <el-tag v-if="scope.row.level==0">一级</el-tag>
          <el-tag v-if="scope.row.level==1" type="success">二级</el-tag>
           <el-tag v-if="scope.row.level==2" type="warning">三级</el-tag>
          
      </template>
    </el-table-column>
  </el-table>
  </el-card>
</div>
    
</template>
<script>
export default {
    data(){
        return{
            rightlist:[]

        }
    },
    created(){
        this.getRightlist()

    },
    methods:{
        async getRightlist(){
            const res=await this.request({
                url:'rights/list'
            })
            console.log(res)
            if(res.meta.status!==200) return this.$message.error("获取权限列表失败")
            this.rightlist=res.data


        }

    }
    
}
</script>
<style scoped>

</style>