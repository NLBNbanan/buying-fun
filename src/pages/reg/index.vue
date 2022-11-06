<template>
  <div class="reg">
    <van-uploader :after-read="afterRead" />
    <img :src="imgurl" v-if="imgurl" alt="" width="80" height="80" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="userName"
        name="userName"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <p class="toLogin"><span @click="toLogin">已有账号，我要登陆</span></p>

      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >立即注册</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { reqRegister } from "../../api/user"; // @==src
import { Toast } from "vant";
export default {
  data() {
    return {
      userName: "",
      password: "",
      imgurl: "",
    };
  },
  computed: {},
  watch: {},

  methods: {
    async onSubmit(values) {
      const result = await reqRegister({ ...values, avatar: this.imgurl });
      //   console.log("submit", result);
      if (result.code == "success") {
        Toast("注册成功");
        this.$router.push("/login");
      }
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file); // 返回一个base64格式的图片
      this.imgurl = file.content;
    },
     toLogin(){
      this.$router.push({
        name:"Login",
      })
    },
  },
  created() {},
  mounted() {},
  components: {},
};
</script>
<style scoped>
.reg {
  text-align: center;
}
.toLogin{
  line-height: 14px;
  text-align: right;
}
.toLogin span{
  font-size: 12px;
  cursor: pointer;
  color: blueviolet;
  margin-right: 10px;
}
</style>
