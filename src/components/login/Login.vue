<template>
    <div class="login-container">
      
    <div class="login_box">
      <div class="avatar-box">
      <img src="../../assets/img/logo.png" alt="">
      </div>
      <div class="form_box">
    <el-form  :model="ruleForm" :rules="rules" ref="ruleForm">
  <el-form-item prop="name">
    <el-input v-model="ruleForm.name" ><i slot="prefix" class="iconfont icon-user"></i></el-input>
  </el-form-item>
  <el-form-item prop="password" >
    <el-input v-model="ruleForm.password"><i slot="prefix" class="iconfont icon-3702mima"></i></el-input>
  </el-form-item>
  </el-form>
      </div>
  <div class="login-button">
    <el-button type="primary">登录</el-button>
    <el-button type="info" @click="resetForm('ruleForm')">重置</el-button>
  </div>
    </div>
    </div>
    
</template>

<script>
export default {
    
    data(){
      return{
        ruleForm:{
          name:'',
          password:''

        },
        rules:{
        name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
          ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
          ]
      }     
    }
    
},
methods:{
  resetForm(formName) {
        this.$refs[formName].resetFields();
      }
}
}
</script>

<style scoped>

@import '../../assets/font/iconfont.css';

.login-container{
    height: 100%;
    background-color:#2b4b6b;
}
.login_box{
  width:450px;
  height: 300px;
  background-color: #ffffff;
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
  border-radius: 3px;
  padding: 100px 30px 30px;
  box-sizing: border-box;
  position: relative;

} 
.avatar-box{
  position: absolute;
  width:130px;
  height: 130px;
  top: 0;
  left: 50%;
  background-color: #ffffff;
  transform: translate(-50%,-50%);
  border-radius: 50%;
  border:1px solid #eee;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
}
.avatar-box img{
  height: 100%;
  height: 100%;
  border-radius: 50%;
  background: #eee;
}

 .login-button{
   position: absolute;
   right: 30px;
 }

</style>