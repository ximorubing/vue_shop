<template>
    <div class="userContanier">
        <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>
    
<el-card class="box-card">
  <el-row>
  <el-col :span="12"><div class="grid-content bg-purple"><el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserlist" >
    <el-button slot="append" icon="el-icon-search" @click="getUserlist"></el-button>
  </el-input></div></el-col>
  
  <el-col :span="12"><div class="grid-content bg-purple-light">
    <el-button  type="primary" class="editBtn" @click="addDialogVisible=true">添加用户</el-button>
    </div></el-col>
    
 
</el-row>
 
  
    
    <el-table
    :data="UserList"
    border
    style="width: 100%">
    <el-table-column
      type="index">
    </el-table-column>
    <el-table-column
      prop="username"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="180">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="电话">
    </el-table-column>
    <el-table-column
      prop="role_name"
      label="角色">
    </el-table-column>
    <el-table-column
      
      label="状态" prop="mg_state">
      <template slot-scope="scope">
      <el-switch
  v-model="scope.row.mg_state" @change="changeState(scope.row)"
  >
</el-switch>
      </template>
    </el-table-column>
    <el-table-column
     
      label="操作" width="180">
      <template slot-scope="scope">
      <el-button type="primary" icon="el-icon-edit" size="mini" @click="getEditUser(scope.row)"></el-button>
      <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUser(scope.row)"></el-button>
      <el-button type="warning" icon="el-icon-setting" size="mini" @click="showRole(scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  <!--添加用户对话框-->
    <el-dialog
  title="添加用户"
  :visible.sync="addDialogVisible"
  width="50%" @close="resetAddUser('addRuleForm')"
  >
  <el-form :model="addForm" :rules="addFormRules" ref="addRuleForm" label-width="70px" >
  <el-form-item label="用户名" prop="username">
    <el-input v-model="addForm.username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="addForm.password" type="password"></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email">
    <el-input v-model="addForm.email"></el-input>
  </el-form-item>
  <el-form-item label="手机" prop="mobile">
    <el-input v-model="addForm.mobile"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser('addRuleForm')">确 定</el-button>
  </span>
</el-dialog>
<!--编辑用户对话框-->
<el-dialog
  title="修改用户"
  :visible.sync="editDialogVisible"
  width="50%" @close="resetAddUser('editUserForm')"
  >
  
  <el-form :model="editUserForm" :rules="editUserrules" ref="editUserForm" label-width="70px" >
    <el-form-item label="用户名" prop="username">
    <el-input v-model="editUserForm.username" disabled></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email">
    <el-input v-model="editUserForm.email"></el-input>
  </el-form-item>
  <el-form-item label="手机号" prop="mobile">
    <el-input v-model="editUserForm.mobile"></el-input>
  </el-form-item>
  </el-form>

  <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editUser('editUserForm')">确 定</el-button>
  </span>
</el-dialog>
<!--分配角色对话框-->
<el-dialog
  title="分配角色"
  :visible.sync="roleDialogVisible"
  width="50%"
  >
  <p>当前用户名：{{editUserForm.username}}</p>
  <p>当前的角色：{{editUserForm.role_name}}</p>
 
  
    <el-select placeholder="请选择" v-model="value" >
      <el-option
      v-for="item in roles"
      :key="item.id"
      :label="item.roleName"
      :value="item.id">
    </el-option>
    
  </el-select>
  
  
  <span slot="footer" class="dialog-footer">
    <el-button @click="roleDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editRole">确 定</el-button>
  </span>
</el-dialog>
</el-card>

    </div>
    
</template>
<script>
import { userInfo } from 'os'
export default {
    data(){
        return{
          queryInfo:{
            query:'',
            pagenum:1,
            pagesize:2


          },
          UserList:[],
          total:0,
          editUserForm:{},
        addDialogVisible:false,
        editDialogVisible:false,
        delteDialogVisible:false,
        roleDialogVisible:false,
        roles:[],
        value: '',
        addForm:{
          username:'',
          password:'',
          email:'',
          mobile:''
         

        },
        addFormRules:{
          username:[{ required: true, message: '请输入用户名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
          ],
          email:[
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            {validator:(rule,value,cb)=>{
            let regEmail=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
            if(regEmail.test(value)){
              cb()
            }
              cb(new Error('输入合法邮箱号'))
            },trigger: 'blur'}
            
          ],
          mobile:[
            { required: true, message: '请输入手机号', trigger: 'blur' },
            {validator:(rule,value,cb)=>{
            let regMobile=/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
            if(regMobile.test(value)){
              cb()
            }
              cb(new Error('输入合法手机号'))
            },trigger: 'blur'}
          ]
        },
       
        editUserrules:{
           email:[
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            {validator:(rule,value,cb)=>{
            let regEmail=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
            if(regEmail.test(value)){
              cb()
            }
              cb(new Error('输入合法邮箱号'))
            },trigger: 'blur'}
            
          ],
          mobile:[
            { required: true, message: '请输入手机号', trigger: 'blur' },
            {validator:(rule,value,cb)=>{
            let regMobile=/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
            if(regMobile.test(value)){
              cb()
            }
              cb(new Error('输入合法手机号'))
            },trigger: 'blur'}
          ]

        }
        
        
        
        

        }
    },
    created(){
        this.getUserlist()

    },
    methods:{
      //获取用户信息
        async getUserlist(){

           const res= await this.request({
                url:'users',
                params:
                    this.queryInfo
                
            })

            

            if(res.meta.status!==200) return this.$message.error(res.meta.msg)
            this.UserList=res.data.users
            this.total=res.data.total

        },
        // 监听switch开关状态改变
        async changeState(userinfo){
          const res=await this.request({
            method:'put',
            url:`users/${userinfo.id}/state/${userinfo.mg_state}`
          })
          if(res.meta.status!==200) return this.$message.error(res.meta.msg)
          return this.$message.success(res.meta.msg)
          
          
        

        },
        //重置添加新用户表单
        resetAddUser(formName){
            this.$refs[formName].resetFields();
        },
        //获取编辑用户信息
        async getEditUser(userinfo){
          const res=await this.request({
            method:'get',
            url:`users/${userinfo.id}`
          })
          if(res.meta.status!==200) return this.$message.error(res.meta.msg)
          console.log(res)
          this.editUserForm=res.data
          this.editDialogVisible=true
          },
          
         

        
        //删除用户
        removeUser(userinfo){
          this.$confirm('此操作将永久删除该用户,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async ()=> {
            const res=await this.request({
              url:`users/${userinfo.id}`,
              method:'delete'
            })
         
            if(res.meta.status!==200) return this.$message.error("删除用户失败")
   
          this.$message({
            type: 'success',
            message: '删除用户成功!'
          })
          this.queryInfo.pagenum = 1
          this.getUserlist()

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

        },

        //获取角色列表
        async getRoleUsers(){
          const res=await this.request({
            url:"roles"
          })
          if(res.meta.status!==200) return this.$message.error("获取信息失败")
        this.roles=res.data
        this.roleDialogVisible=true


        },
        //分配角色
        showRole(userinfo){
          this.editUserForm=userinfo
          console.log(this.editUserForm)
          this.getRoleUsers()
        },
        async editRole(){
          if(!this.value) return this.$message.error("请选择分配角色")
          console.log(this.value)
          const res=await this.request({
            url:`users/${this.value}/role`,
            method:'put',
            data:{
              
              rid:this.editUserForm.rid
            }
          })
          console.log(res)
          if(res.meta.status!==200)return this.$message.error("分配角色失败")
          this.$message.success("分配角色成功")
         //this.roleDialogVisible=false
          //this.getUserlist()
          

        },
        //编辑用户信息
        editUser(formName){
          this.$refs[formName].validate(async valid=>{
            if(!valid) return
            const res=await this.request({
              method:'put',
              url:`users/${this.editUserForm.id}`,
              data:{
                email:this.editUserForm.email,
                mobile:this.editUserForm.mobile
              }

            })

            if(res.meta.status!==200) return this.$message.error(res.meta.msg)
            this.$message.success(res.meta.msg)
            this.editDialogVisible=false
            this.getUserlist()
          })

        },
        //删除用户
       async deleteUser(){
            const res=await this.request({
              url:`users/${this.editUserForm.id}`,
              method:'delete'
            })
            if(res.meta.status!==200) return this.$message.error(res.meta.msg)
            this.$message.success(res.meta.msg)
            this.delteDialogVisible=false
            this.getUserlist()

        },
        //添加新用户
        addUser(formName) {

        this.$refs[formName].validate( async valid => {
          if (!valid) return
            const res=await this.request({
              method:'post',
              url:'users',
              data:this.addForm
            })
            
           if(res.meta.status!==201) return this.$message.error(res.meta.msg)
           this.$message.success(res.meta.msg)
           this.addDialogVisible=false
           this.getUserlist()

          
          
        })
      },
        handleSizeChange(val) {
        this.queryInfo.pagesize=val
        this.getUserlist()
      },
      handleCurrentChange(val) {
        this.queryInfo.pagenum=val
        this.getUserlist()
      }
    }
    
}
</script>

<style scoped>

    .el-breadcrumb{
        font-size: 12px;
        margin-bottom: 20px;
    }
    .el-card__header{
        border-bottom:none !important;
    }

    .el-col .editBtn{
      margin-left:20px;
    }

    .el-row{
      margin-bottom: 20px;
    }

    .el-pagination{
      margin-top: 20px;
    }
    .deleteTip{
      text-align: center;
      font-size: 16px;
      color:red;

    }
  
</style>