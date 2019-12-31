<template>
<div class="roleContainer">
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>权限管理</el-breadcrumb-item>
  <el-breadcrumb-item>角色列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card class="box-card">
  <el-button  type="primary" class="editBtn" @click="addRoleDialogVisible=true">添加角色</el-button>
   <el-table
    :data="RoleList[currentPage]"
    border
    style="width: 100%" stripe>
     <el-table-column type="expand" >
      <template slot-scope="scope">
          <el-row v-for="(tag1,index1) in scope.row.children" :key="tag1.id" class="bd-tp v-center p5" >
              <el-col :span="5">
                  <el-tag closable @close="handleClose(scope.row,tag1.id)" >{{tag1.authName}}</el-tag>
              </el-col>
              <el-col :span="19">
                 <el-row v-for="(tag2,index2) in tag1.children" :key="tag2.id" :class="[index2===0?'p5':'p5 bd-tp']" >
                      <el-col :span="6"><el-tag  closable  type='success' @close="handleClose(scope.row,tag2.id)">{{tag2.authName}}</el-tag></el-col>
                      <el-col :span="18" ><el-tag v-for="tag3 in tag2.children" :key="tag3.id" closable  type='warning' class="m5" @close="handleClose(scope.row,tag3.id)">{{tag3.authName}}</el-tag></el-col>
                  </el-row>
                
                 
              </el-col>
          </el-row>
      </template>
     </el-table-column>
    <el-table-column
      type="index">
    </el-table-column>
    <el-table-column
      prop="roleName"
      label="角色名称"
      width="300">
    </el-table-column>
    <el-table-column
      prop="roleDesc"
      label="角色描述"
      >
    </el-table-column>
    <el-table-column
     
      label="操作" width="300">
      <template slot-scope="scope">
      <el-button type="primary" icon="el-icon-edit" size="mini" @click="getEditRole(scope.row)" >编辑</el-button>
      <el-button type="danger" icon="el-icon-delete" size="mini" @click="delRole(scope.row)" >删除</el-button>
      <el-button type="warning" icon="el-icon-setting" size="mini" @click="getRole(scope.row)">分配权限</el-button>
      </template>
    </el-table-column>
  </el-table>
   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage+1"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
  <!--添加角色-->
  <el-dialog
  title="添加角色"
  :visible.sync="addRoleDialogVisible"
  width="50%" @close="resetForm('addRoleRuleForm')"
  >
  <el-form :model="addRoleRuleForm" :rules="addRoleRules" ref="addRoleRuleForm" label-width="100px" >
  <el-form-item label="角色名称" prop="roleName">
    <el-input v-model="addRoleRuleForm.roleName"></el-input>
  </el-form-item>
  <el-form-item label="角色描述" prop="roleDesc">
    <el-input v-model="addRoleRuleForm.roleDesc"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addRoleDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addRole('addRoleRuleForm')">确 定</el-button>
  </span>
  
</el-dialog>
<!--编辑角色-->

<el-dialog
  title="编辑角色"
  :visible.sync="editRoleDialogVisible"
  width="50%" @close="resetForm('editRoleForm')"
  >
  <el-form ref="editRoleForm" :model="editRoleForm" label-width="80px" :rules="editRoleRules">
  <el-form-item label="角色名称" prop="roleName">
    <el-input v-model="editRoleForm.roleName"></el-input>
  </el-form-item>
   <el-form-item label="角色描述" prop="roleDesc">
    <el-input v-model="editRoleForm.roleDesc"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editRoleDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editRole('editRoleForm')">确 定</el-button>
  </span>
</el-dialog>
<!--分配权限-->
<el-dialog
  title="分配角色"
  :visible.sync="RoleDialogVisible"
  width="50%" @close="resetRole()"
  >
<el-tree
  :data="rolePower"
  show-checkbox
  node-key="id"
  
  :default-checked-keys="defKey"
  :props="defaultProps"
  default-expand-all
  ref="treeRef">
</el-tree>
<span slot="footer" class="dialog-footer">
    <el-button @click="RoleDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="assignRole()">确 定</el-button>
  </span>
</el-dialog>
</div>
    
</template>
<script>
export default {

    data(){
        return{
            RoleList:[],
            addRoleDialogVisible:false,
            addRoleRuleForm:{
                roleName:'',
                roleDesc:''
            },
            addRoleRules:{
              roleName:   [
            { required: true, message: '请填写角色名称', trigger: 'blur' }
          ],
          roleDesc:   [
            { required: true, message: '请填写角色描述', trigger: 'blur' }
          ]


            },
            total:0,
            pageSize:2,
            currentPage:0,
            editRoleDialogVisible:false,
            roleId:0,
            editRoleForm:{
              roleName:'',
              roleDesc:''
            },
            editRoleRules:{
               roleName:   [
            { required: true, message: '请填写角色名称', trigger: 'blur' }]
            },
            defaultProps: {
          children: 'children',
          label: 'authName'
        },
        RoleDialogVisible:false,
        rolePower:[],
        defKey:[]






        }

    },
    created(){
        this.getRoleList()
    },
    methods:{
        async getRoleList(){
            const res=await this.request({
                url:'roles'
            })
            for(var i=0,len=res.data.length;i<len;i+=this.pageSize){
                this.RoleList.push(res.data.slice(i,i+this.pageSize))
            }
            this.total=res.data.length
        },
        //新增角色
        addRole(formName){
            this.$refs[formName].validate(async valid =>{
                if(!valid) return

                
                const res=await this.request({
                url:'roles',
                method:'post',
                data:this.addRoleRuleForm
            })
            
            if(res.meta.status!==201) return this.$message.error("添加角色失败")
            this.$message.success("添加角色成功")
            this.addRoleDialogVisible=false
            this.currentPage=0
            this.getRoleList()
            

                
            })
            

        },
        //获取角色信息
        getEditRole(userinfo){
          this.editRoleDialogVisible=true
          this.roleId=userinfo.id


        },
        //编辑角色
        editRole(formName){
          this.$refs[formName].validate(async valid =>{
            if(!valid) return
            const res=await this.request({
              url:`roles/${this.roleId}`,
              method:'put',
              data:this.editRoleForm
            })
          
            if(res.meta.status!==200) return this.$message.error("编辑角色失败")
            this.$message.success('编辑角色成功')
            
            this.editRoleDialogVisible=false
            this.RoleList=[]
            this.getRoleList()
          })

        },
        //删除角色
        delRole(userinfo){
          this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const res=await this.request({
            url:`roles/${userinfo.id}`,
            method:'delete'
          })
          console.log(res)
          if(res.meta.status!==200) return this.$message.error('角色删除失败')
          this.$message.success('角色删除成功')
          this.currentPage=0
         this.RoleList=[]
        this.getRoleList()
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })        
        })

        },
        //获取权限id
        getDefKey(node,arr){
          if(!node.children) return arr.push(node.id)
          node.children.forEach(item => {
            this.getDefKey(item,arr)
            
          })
        },
        //获取角色授权数据
        async getRole(userinfo){
           this.roleId=userinfo.id
            const res=await this.request({
              url:'rights/tree'
            })
            console.log(res)
            this.rolePower=res.data
            this.RoleDialogVisible=true
            this.getDefKey(userinfo,this.defKey)

        },
        //分配角色
        async assignRole(){
          
          
          const keys=[
              ...this.$refs.treeRef.getCheckedKeys(),
              ...this.$refs.treeRef.getHalfCheckedKeys()

          ]
          const idStr=keys.join(',')
          const res=await this.request({
            url:`roles/${this.roleId}/rights`,
            method:'post',
            data:{rids:idStr}


          })
          if(res.meta.status!==200) return this.$message.error("分配权限失败")
          this.$message.success("分配权限成功")
          this.RoleDialogVisible=false
          this.RoleList=[]
          this.getRoleList()
          

        },
        //重置数据
        resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //重置分配角色权限
      resetRole(){
        this.defKey=[]

      },
      handleSizeChange(val) {
        this.pageSize=val
        this.RoleList=[]
        this.getRoleList()
      },
      handleCurrentChange(val) {
        this.currentPage=val-1
         this.RoleList=[]
        this.getRoleList()
      },
      handleClose(tag,rightId){
        this.$confirm('此操作将永久删除该角色权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const res=await this.request({
            url:`roles/${tag.id}/rights/${rightId}`,
            method:'delete'
          })
          if(res.meta.status!==200) return this.$message.error(res.meta.msg)
          this.$message.success(res.meta.msg)
          tag.children=res.data
          
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })        
        })
        

      }


    }

    
}
</script>
<style scoped>
.p5{
    padding:5px 0;
    
}
.m5{
    margin:5px
}

.bd-tp{
    border-top:1px solid #eee;
}
.bd-bm{
    border-bottom:1px solid #eee;

}
.v-center{
    display: flex;
    align-items: center;
}


</style>