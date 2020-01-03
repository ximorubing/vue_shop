<template>
<div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>商品管理</el-breadcrumb-item>
  <el-breadcrumb-item>商品分类</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card class="box-card">
       <el-button  type="primary" class="editBtn" @click="getAddCate()">添加分类</el-button>
       <tree-table :data='cateList' :columns="columns" :selection-type='false' :expand-type='false' border :show-row-hover='false'
       show-index index-text="#" class="cateTable"
       >
       <template slot='isok' scope="scope">
           <i class="el-icon-success" v-if="scope.row.cat_deleted===false" style="color:lightgreen"></i>
           <i class="el-icon-error" v-else style="color:red"></i>
       </template>
       <template slot="order" scope="scope">
           <el-tag v-if="scope.row.cat_level==0" size="mini">一级</el-tag>
          <el-tag v-else-if="scope.row.cat_level==1" type="success" size="mini">二级</el-tag>
           <el-tag v-else type="warning" size="mini">三级</el-tag>
       </template>
       <template slot="opt">
           <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
           <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>

       </template>

       </tree-table>
        <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
  <!--添加分类-->
  <el-dialog
  title="添加分类"
  :visible.sync="addCateDialogVisible"
  width="50%" @close="resetAddCate('addCateRef')"
  >
  <el-form :model="addCateForm" :rules="addCateRules" ref="addCateRef" label-width="80px" >
  <el-form-item label="分类名称" prop="cat_name">
    <el-input v-model="addCateForm.cat_name"></el-input>
  </el-form-item>
  
  <el-form-item label="父级分联">
      <el-cascader
      popper-class="popper"
    v-model="parentCate"
    :options="parentCateList"
    :props="props"
    @change="handleChange" clearable ></el-cascader>
    </el-form-item> 
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addCateDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addGoodsCate('addCateRef')">确 定</el-button>
  </span>
</el-dialog>
</div>
    
</template>
<script>
export default {
    data(){
        return{
            queryInfo:{
                type:'',
                pagenum:1,
                pagesize:5
            },
            cateList:[],
            columns:[
                {label: '分类名称',
                prop: 'cat_name'},
                {
                   label: '是否有效',
                prop: 'cat_deleted' ,
                type:'template',
                template:'isok'
                },
                {
                   label: '排序',
                prop: 'cat_level',
                type:'template',
                template:'order'

                },
                {
                   label: '操作',
                    type:'template',
                template:'opt'
                
                }

            ],
            total:0,
            addCateDialogVisible:false,
            addCateForm:{
                cat_name:'',
                cat_pid:0,
                cat_level:0
            },
            addCateRules:{
                cat_name: [
            { required: true, message: '请输入分类名称', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],

            },
            parentCateList:[],
            parentCate:[],
            props:{
                expandTrigger: 'hover',
                value:'cat_id',
                label:'cat_name',
                children:'children',
                checkStrictly: true
                


            }
            

        }
    },
    created(){
        this.getCate()
    },
    methods:{
        //获取所有分类父层级
        async getAddCate(){
            const res=await this.request({
                url:'categories',
                params:{
                    type:2
                   
                }
            })
            if(res.meta.status!==200) return this.$message.error('获取商品分类失败')
            
            this.parentCateList=res.data
            console.log(res.data)
            
            
            this.addCateDialogVisible=true

        },
        async getCate(){
            const res=await this.request({
                url:'categories',
                params:this.queryInfo
            })
            if(res.meta.status!==200) return this.$message.error('获取商品分类失败')
            this.cateList=res.data.result
            this.total=res.data.total

        },
        handleSizeChange(val) {
         this.queryInfo.pagesize=val
         this.getCate()
      },
      handleCurrentChange(val) {
        
        this.queryInfo.pagenum=val
        this.getCate()
      },
      handleChange(){
          console.log(this.parentCate)
          if(this.parentCate.length>0){
            this.addCateForm.cat_pid=this.parentCate[this.parentCate.length-1]
            this.addCateForm.cat_level=this.parentCate.length

          }else{
              this.addCateForm.cat_pid=0
              this.addCateForm.cat_level=0
          }

      },
      //添加分类
      addGoodsCate(formName){
          this.$refs[formName].validate( async valid=>{
              if(!valid) return
              const res=await this.request({
                  url:'categories',
                  method:'post',
                  data:this.addCateForm
              })
              if(res.meta.status!==201) return this.$message.error('添加分类失败')
              this.$message.success('添加分类成功')
              this.getCate()
              this.addCateDialogVisible=false
              console.log(res)
          })


      },
      //重置添加分类
      resetAddCate(formName){
          this.$refs[formName].resetFields()
            this.parentCate = []
            this.addCateForm.cat_pid=0
              this.addCateForm.cat_level=0

      }
    }
    
}
</script>
<style scoped>
.cateTable{
    margin:15px 0;
}
.el-cascader {
    width: 100%;
}


</style>