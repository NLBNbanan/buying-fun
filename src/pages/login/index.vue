<template>
  <div class="reg">
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
      <p class="toReg"><span @click="toRegist">没有账号，我要注册</span></p>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >点击登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { reqLogin } from "../../api/user"; // @==src
import { setToken } from "@/util/auth";
import { Toast } from "vant";
export default {
  data() {
    return {
      userName: "bytewang",
      password: "123456",
    };
  },
  computed: {},
  watch: {},

  methods: {
    async onSubmit(values) {
      const result = await reqLogin(values);
      console.log("submit", result);
      if (result.code == "success") {
        // 把token存一下，将来需要放进请求头
        // 在cookie中存一份儿 在vuex中存一份儿
        setToken(result.token);
        this.$store.commit("user/changetoken", result.token);// vuex数据持久化
        Toast("登陆成功");
        this.$router.push("/");
      }
    },
    toRegist(){
      this.$router.push({
        name:"Reg",
      })
    }
  },
  created() {},
  mounted() {},
  components: {},
};
</script>
<style scoped>

.toReg{
  line-height: 14px;
  text-align: right;
}
.toReg span{
  font-size: 12px;
  cursor: pointer;
  color: blueviolet;
  margin-right: 10px;
}
</style>
