<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
import { requestLogin, getMenu } from "../api/api";
//import NProgress from 'nprogress'
export default {
  data() {
    return {
      logining: false,
      ruleForm2: {
        account: "", //test
        checkPass: "" //12345678
      },
      rules2: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" }
          //{ validator: validaePass }
        ],
        checkPass: [
          { required: true, message: "请输入密码", trigger: "blur" }
          //{ validator: validaePass2 }
        ]
      },
      checked: true
    };
  },
  created() {
    let leng = this.$router.options.routes.length;
    this.$router.options.routes.splice(3, leng - 3);
  },
  methods: {
    handleReset2() {
      this.$refs.ruleForm2.resetFields();
    },
    handleSubmit2(ev) {
      var _this = this;
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          //_this.$router.replace('/table');
          this.logining = true;
          // this.$Progress.start();
          var loginParams = {
            strUser: this.ruleForm2.account,
            strPwd: this.ruleForm2.checkPass
          };
          requestLogin(loginParams).then(result => {
            this.logining = false;
            // this.$Progress.finish();
            let { message, bRes, user, menu, Ticket } = result;
            if (bRes !== true) {
              this.$message({
                message: message,
                type: "error"
              });
            } else {
              sessionStorage.setItem("user", JSON.stringify(user));
              sessionStorage.setItem("Ticket", Ticket);
              this.GetMenuData(menu);
              this.$router.push({ path: "/index" });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    GetMenuData(data) {
      data.map(item => {
        item.component = resolve => require([`./Home`], resolve);
        item.children.map(_item => {
          _item.component = resolve =>
            require(["./" + _item.MenuPath], resolve);
          _item.routeObj = {
            path: _item.path,
            name: _item.name
          };
        });

        this.$router.options.routes.push(item);
      });
      sessionStorage.routes = JSON.stringify(data);
      this.$router.addRoutes(this.$router.options.routes);
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>