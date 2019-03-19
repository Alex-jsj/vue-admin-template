<template>
  <div id="login">
    <!-- 背景特效 -->
    <canvas id="bgCanvas"></canvas>
    <!-- 登录框 -->
    <div class="login-container">
      <!-- text s -->
      <p class="login-title-1">欢迎使用</p>
      <p class="login-title-2"><!-- 体育与健康 -->综合素质智能评价系统</p>
      <!-- <p class="login-title-en">Sports and Health Comprehenslve Quality Intelligent Evaluation System</p> -->
      <!-- en -->
      <img src="../../static/img/login_en.jpg" class="login-title-en">
      <!-- 登录注册切换 -->
      <ul class="login-register-switch">
        <li class="item" :class="{'choose':login_register}" @click="login_register = true">用户登录</li>
        <!-- <li class="float-right item" :class="{'choose':!login_register}" @click="login_register = false">用户注册</li> -->
      </ul>
      <!-- 登录 -->
      <form class="login-box" v-if="login_register">
        <!-- user -->
        <div class="user inp">
          <i class="iconfont icon-user"></i>
          <input v-model.trim="user_text" :class="user_err == ''?'':'no'" type="text" placeholder="请输入账号" @blur="userCheck()" @keyup.enter="submit()">
          <!-- 错误提示语 -->
          <p class="err-text">{{user_err}}</p>
        </div>
        <!-- password -->
        <div class="password inp">
          <i class="iconfont icon-password"></i>
          <input v-model.trim="psd_text" :class="psd_err == ''?'':'no'" :type="show_pwd?'text':'password'" placeholder="请输入密码" @blur="psdCheck()" @keyup.enter="submit()">
          <i class="iconfont icon-chakan" :class="{'show-pwd':show_pwd}" :title="!show_pwd?'显示密码':'隐藏密码'" @click="show_password()"></i>
          <!-- 错误提示语 -->
          <p class="err-text">{{psd_err}}</p>
        </div>
        <router-link to="" class="forget-psd">忘记密码</router-link>
        <el-button class="login-btn" @click="submit()" :loading="loading" size="mini">登&nbsp;&nbsp;&nbsp;录</el-button>
        <!-- 登录说明 -->
        <div class="login-explain" :class="{'explain-open':explain_switch}">
          <div class="explain-box float-left" @click="explain_switch = !explain_switch">
            <i class="iconfont icon-jinggao float-left"></i>
            <span class="float-left explain-text">登录说明</span>
            <div class="zhankai float-left">
              <i class="iconfont icon-xiajiantou"></i>
            </div>
          </div>
          <!-- <p class="register-user float-right" @click="login_register = false">注册账户</p> -->
          <!-- 说明信息 -->
          <ul class="explain-info float-left">
            <li class="item">· 教师 - 账户：身份证号码&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;初始密码：身份证后六位</li>
            <li class="item">· 学生 - 账户：身份证号码&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;初始密码：身份证后六位</li>
            <!-- <li class="item">· 家长 - 家长注册请申请账号</li> -->
            <li class="item">· 请不定期的修改密码以提高安全性</li>
            <li class="item">· 联系电话：0571-88996655 吴老师</li>
          </ul>
        </div>
      </form>
      <!-- 注册 -->
      <form class="register-box" v-else></form>
    </div>
    <!-- 公司信息 -->
    <!-- <div class="company-info">Copyright © 2018, 杭州容博教育科技有限公司 All Rights Reserved.</div> -->
  </div>
</template>

<script>
import http from "@/common/js/http";
import public_api from "@/api/public_api";
import { login } from "@/api/login";
import { getState, setState, removeState } from "@/utils/auth";

export default {
  name: "login",
  data() {
    return {
      // 说明信息展开关闭
      explain_switch: false,
      // 登录注册切换
      login_register: true,
      // 显示密码
      show_pwd: false,
      // 用户名
      user_text: "",
      // 密码
      psd_text: "",
      // 用户名错误提示语
      user_err: "",
      // 密码错误提示语
      psd_err: "",
      // 防止重复提交
      loading: false,
      // 定时器
      timer: null
    };
  },
  components: {},
  created: function() {
    // 判断登录状态
    // this.check_login();
  },
  mounted: function() {
    // 背景特效
    this.bg_canvas();
  },
  methods: {
    // 背景特效
    bg_canvas: function() {
      //定义画布宽高和生成点的个数
      var WIDTH =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth; //width
      var HEIGHT =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight; //height
      var POINT = 30;

      var canvas = document.getElementById("bgCanvas");
      (canvas.width = WIDTH), (canvas.height = HEIGHT);
      var context = canvas.getContext("2d");
      (context.strokeStyle = "rgba(255,255,255,0.3)"),
        (context.strokeWidth = 1),
        (context.fillStyle = "rgba(255,255,255,0.2)");
      var circleArr = [];
      //线条：开始xy坐标，结束xy坐标，线条透明度
      function Line(x, y, _x, _y, o) {
        (this.beginX = x),
          (this.beginY = y),
          (this.closeX = _x),
          (this.closeY = _y),
          (this.o = o);
      }
      //点：圆心xy坐标，半径，每帧移动xy的距离
      function Circle(x, y, r, moveX, moveY) {
        (this.x = x),
          (this.y = y),
          (this.r = r),
          (this.moveX = moveX),
          (this.moveY = moveY);
      }
      //生成max和min之间的随机数
      function num(max, _min) {
        var min = arguments[1] || 0;
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
      // 绘制原点
      function drawCricle(cxt, x, y, r, moveX, moveY) {
        var circle = new Circle(x, y, r, moveX, moveY);
        cxt.beginPath();
        cxt.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
        cxt.closePath();
        cxt.fill();
        return circle;
      }
      //绘制线条
      function drawLine(cxt, x, y, _x, _y, o) {
        var line = new Line(x, y, _x, _y, o);
        cxt.beginPath();
        cxt.strokeStyle = "rgba(255,255,255," + o + ")";
        cxt.moveTo(line.beginX, line.beginY);
        cxt.lineTo(line.closeX, line.closeY);
        cxt.closePath();
        cxt.stroke();
      }
      //初始化生成原点
      function init() {
        circleArr = [];
        for (var i = 0; i < POINT; i++) {
          circleArr.push(
            drawCricle(
              context,
              num(WIDTH),
              num(HEIGHT),
              num(20, 2),
              num(10, -10) / 40,
              num(10, -10) / 40
            )
          );
        }
        draw();
      }
      //每帧绘制
      function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < POINT; i++) {
          drawCricle(context, circleArr[i].x, circleArr[i].y, circleArr[i].r);
        }
        for (var i = 0; i < POINT; i++) {
          for (var j = 0; j < POINT; j++) {
            if (i + j < POINT) {
              var A = Math.abs(circleArr[i + j].x - circleArr[i].x),
                B = Math.abs(circleArr[i + j].y - circleArr[i].y);
              var lineLength = Math.sqrt(A * A + B * B);
              var C = 1 / lineLength * 7 - 0.009;
              var lineOpacity = C > 0.03 ? 0.03 : C;
              if (lineOpacity > 0) {
                drawLine(
                  context,
                  circleArr[i].x,
                  circleArr[i].y,
                  circleArr[i + j].x,
                  circleArr[i + j].y,
                  lineOpacity
                );
              }
            }
          }
        }
      }
      //调用执行
      init();
      // 将定时器申明在window方便清除
      this.timer = setInterval(function() {
        for (var i = 0; i < POINT; i++) {
          var cir = circleArr[i];
          cir.x += cir.moveX;
          cir.y += cir.moveY;
          if (cir.x > WIDTH) cir.x = 0;
          else if (cir.x < 0) cir.x = WIDTH;
          if (cir.y > HEIGHT) cir.y = 0;
          else if (cir.y < 0) cir.y = HEIGHT;
        }
        draw();
      }, 16);
    },
    // 显示密码
    show_password: function() {
      this.show_pwd = !this.show_pwd;
    },
    // 验证用户名
    userCheck: function() {
      let reg = /^[0-9a-zA-Z_]{1,20}$/; //1-18位数字字母下划线
      if (this.user_text == "") {
        this.user_err = "用户名不能为空!";
        return false;
      } else if (!reg.test(this.user_text)) {
        this.user_err = "用户名应为1-20位数字/字母/下划线!";
        return false;
      } else {
        this.user_err = "";
        return true;
      }
    },
    // 验证密码
    psdCheck: function() {
      let reg = /^[0-9a-zA-Z_]{3,18}$/; //3-18位数字字母下划线
      if (this.psd_text == "") {
        this.psd_err = "密码不能为空!";
        return false;
      } else if (!reg.test(this.psd_text)) {
        this.psd_err = "密码应为3-18位数字/字母/下划线!";
        return false;
      } else {
        this.psd_err = "";
        return true;
      }
    },
    // 登录
    submit: function() {
      let that = this;
      that.userCheck();
      that.psdCheck();
      if (that.userCheck() && that.psdCheck()) {
        that.loading = true;
        let data = {
          code: that.user_text,
          pwd: that.psd_text
        };
        login(data).then(res => {
          that.loading = false;
          if (res.data.code == 200) {
            setState(1);//设置状态为已登录
            if (res.data.data.DEFAULTROLE === "R0001") {
              this.$router.push({ path: "/pages/admin/index" });
            }
            if (res.data.data.DEFAULTROLE === "R0002") {
              this.$router.push({ path: "/pages/school_admin/index" });
            }
            if (res.data.data.DEFAULTROLE === "R0003") {
              this.$router.push({ path: "/pages/teach_admin/index" });
            }
            if (res.data.data.DEFAULTROLE === "R0004") {
              this.$router.push({ path: "/pages/teach_admin/index" });
            }
            if (res.data.data.DEFAULTROLE === "R0005") {
              this.$router.push({ path: "/pages/stu_admin/index" });
            }
          }
        });
      }
    }
  },
  destroyed: function() {
    // 离开时清除canvas背景图的定时器
    clearInterval(this.timer);
  }
};
</script>
<style lang="less">
#login {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: url("../../static/img/login_background@2x.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  #bgCanvas {
    position: absolute;
    top: 0;
    left: 0;
  }
  .login-container {
    z-index: 999;
    margin: 0 auto;
    width: 11.45rem;
    min-height: 47vh;
    background: #fff;
    box-shadow: 0.13rem 0.13rem 0.63rem 0rem rgba(179, 179, 179, 0.25);
    border-radius: 0.2rem;
    overflow: hidden;
    padding: 0 1.13rem;
    padding-bottom: 1.85vh;
    .login-title-1 {
      font-size: 0.5rem;
      color: #4771ff;
      text-align: center;
      margin-top: 4.7vh;
      font-family: "黑体";
    }
    .login-title-2 {
      width: 100%;
      height: 0.75rem;
      font-size: 0.55rem;
      color: #4771ff;
      text-align: center;
      margin-top: 1.29vh;
      font-family: "黑体";
      text-align: justify;
      &::after {
        content: " ";
        display: inline-block;
        width: 100%;
      }
    }
    /*  .login-title-en {
      font-size: 0.3rem;
      color: #4771ff;
      text-align: center;
      white-space: nowrap;
      position: absolute;
      left: 50%;
      transform: translateX(-50%) scale(0.72);
      font-family: "黑体";
    } */
    .login-title-en {
      display: block;
      width: 100%;
      margin: 0 auto;
    }
    .login-register-switch {
      width: 80%;
      margin: 0 auto;
      margin-top: 4vh;
      &::after {
        content: "";
        display: block;
        visibility: hidden;
        clear: both;
      }
      .item {
        width: 3.4rem;
        font-size: 0.4rem;
        color: #4771ff;
        text-align: center;
        cursor: pointer;
        margin: 0 auto;
        &::after {
          content: "";
          display: block;
          width: 100%;
          height: 0;
          background: #4771ff;
          margin-top: 0.74vh;
        }
        &:hover {
          &::after {
            height: 0.19vh;
          }
        }
      }
      .choose {
        &::after {
          height: 0.19vh;
        }
      }
    }
    // 登录框样式
    .login-box {
      width: 100%;
      margin-top: 2.22vh;
      .user,
      .password {
        width: 100%;
        height: 1rem;
        position: relative;
        input {
          width: 100%;
          height: 100%;
          font-size: 0.4rem;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          padding-left: 1rem;
          line-height: 1.1rem;
          border-radius: 0.1rem;
          border: 1px solid rgba(217, 217, 217, 1);
        }
        .yes {
          border: 1px solid #4771ff;
        }
        .no {
          border: 1px solid rgb(235, 51, 51);
        }
        .icon-user,
        .icon-password {
          color: rgba(0, 0, 0, 0.25);
          position: absolute;
          top: 50%;
          left: 0.3rem;
          transform: translateY(-50%);
          font-size: 0.5rem;
          z-index: 2;
        }
        .icon-user {
          top: 45%;
        }
        .err-text {
          position: absolute;
          font-size: 0.3rem;
          color: rgb(235, 51, 51);
          right: 0;
          bottom: -0.45rem;
        }
      }
      .password {
        margin-top: 2.22vh;
        .icon-chakan {
          color: #4a4a4a;
          position: absolute;
          top: 45%;
          right: 0.3rem;
          transform: translateY(-50%);
          font-size: 0.5rem;
          cursor: pointer;
          transition: all 0.3s;
        }
        .show-pwd {
          color: #4771ff;
        }
      }
      .forget-psd {
        color: #4771ff;
        font-size: 0.35rem;
        text-align: right;
        display: block;
        margin: 2vh 0;
      }
      .login-btn {
        width: 100%;
        // height: 1rem;
        font-size: 0.4rem;
        color: #fff;
        // line-height: 1rem;
        text-align: center;
        background: rgba(71, 113, 255, 1);
        border-radius: 0.1rem;
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
          background: rgba(71, 113, 255, 0.9);
        }
      }
      .login-explain {
        width: 100%;
        margin-top: 2vh;
        &::after {
          content: "";
          display: block;
          visibility: hidden;
          clear: both;
        }
        .explain-box {
          height: 0.55rem;
          cursor: pointer;
          &:hover {
            .zhankai {
              .icon-xiajiantou {
                transform: translateX(-50%) translateY(-55%) translateZ(0)
                  scale(0.5) rotate(180deg);
              }
            }
          }
          .icon-jinggao {
            color: #ff4b61;
            font-size: 0.38rem;
            line-height: 0.55rem;
            margin-right: 0.15rem;
          }
          .explain-text {
            font-size: 0.35rem;
            color: #989898;
            line-height: 0.55rem;
            margin-right: 0.15rem;
          }
          .zhankai {
            width: 0.35rem;
            height: 0.35rem;
            border-radius: 0.05rem;
            border: 1px solid #989898;
            cursor: pointer;
            position: relative;
            top: 0.1rem;
            .icon-xiajiantou {
              color: #989898;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translateX(-50%) translateY(-50%) translateZ(0)
                scale(0.5) rotate(0);
              transition: all 0.3s;
            }
          }
        }
        .register-user {
          height: 0.55rem;
          color: #4771ff;
          font-size: 0.35rem;
          display: block;
          cursor: pointer;
          line-height: 0.55rem;
        }
        .explain-info {
          width: 100%;
          border-top: 1px solid #d9d9d9;
          margin-top: 0;
          padding: 0;
          opacity: 0;
          // transition: opacity 0.3s, padding 0.3s, margin-top 0.3s;
          transition: all 0.3s;
          .item {
            width: 100%;
            height: 0;
            font-size: 0.3rem;
            color: #636363;
            line-height: 0.53rem;
            white-space: nowrap;
            opacity: 0;
            overflow: hidden;
            transition: all 0.3s;
          }
        }
      }
      // 说明信息展开
      .explain-open {
        .explain-box {
          .zhankai {
            .icon-xiajiantou {
              transform: translateX(-50%) translateY(-55%) translateZ(0)
                scale(0.5) rotate(180deg);
            }
          }
        }
        .explain-info {
          padding: 1.03vh 0;
          margin-top: 1.2vh;
          opacity: 1;
          .item {
            height: 0.53rem;
            opacity: 1;
          }
        }
      }
    }
    // 注册框样式
    .register-box {
      width: 100%;
      margin-top: 2.22vh;
    }
  }
  .company-info {
    position: absolute;
    left: 50%;
    bottom: 5.75vh;
    transform: translateX(-50%);
    color: #fff;
    font-size: 0.3rem;
    white-space: nowrap;
  }
}
</style>


