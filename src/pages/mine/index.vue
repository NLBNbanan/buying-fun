<template>
  <div class="mine">
    <div class="userInfo">
      <!-- 头像 -->
      <img :src="avatar" alt="头像" />
      <!-- 用户名 -->
      <p class="username">
        你好，<span>{{ nickName }}</span
        >!
      </p>
    </div>
    <van-cell-group>
      <van-cell title="修改个人信息" is-link :to="{ name: 'ReviseUserInfo' }" />
      <van-cell :to="{ name: 'Order' }" title="我的订单" is-link />
      <van-cell :to="{ name: 'EditPass' }" title="修改密码" is-link />
      <van-cell
       
        @click="exit"
        title="退出登录"
        is-link
      />
    </van-cell-group>
  </div>
</template>

<script>
import { getUserAPI } from "../../api/mine";
import { removeToken } from "@/util/auth";
export default {
  data() {
    return {
      avatar: "",
      userName: "",
      nickName: "",
      id: "",
    };
  },
  computed: {},
  watch: {},

  methods: {
    async getUserInfo() {
      const res = await getUserAPI();
      // console.log(res);
      this.avatar = res.avatar;
      this.userName = res.userName;
      this.id = res._id;
      this.nickName = res.nickName;
      console.log(res);
    },
    exit() {
      //清除cookies
      removeToken();
      //清除vuex中的status
      this.$store.commit('user/changetoken','')
      this.$router.push({
        name:'Login'
      })
    },
  },
  created() {
    this.getUserInfo();
  },
  mounted() {},
  components: {},
};
</script>
<style scoped>
.mine img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.userInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
}
.username {
  text-align: center;
}
</style>
