<template>
  <div id="app">
    <van-nav-bar v-if="$route.meta.isShowTopbar"
      :title="$route.meta.title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <router-view />
    <van-tabbar route v-if="$route.meta.isShowFooter">
      <van-tabbar-item replace :to="{ name: 'Home' }" icon="home-o"
        >首页</van-tabbar-item
      >
      <van-tabbar-item replace :to="{ name: 'Fenlei' }" icon="more-o"
        >分类</van-tabbar-item
      >
      <van-tabbar-item replace :to="{ name: 'Cart' }" icon="shopping-cart-o"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item replace :to="{ name: 'Mine' }" icon="friends-o"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  methods:{
     //导航栏
    onClickLeft() {
      this.$router.go(-1);
    },
  },
  created() {
    // vuex持久化处理
    const token = localStorage.getItem("token") || undefined;
    this.$store.commit("user/changetoken", token);
    // 收货人信息
    const receiver = localStorage.getItem("receiver");
    const regions = localStorage.getItem("regions");
    const address = localStorage.getItem("address");
    this.$store.commit("address/changeinfo", {
      receiver,
      regions,
      address,
    });
  },
};
</script>

<style>
#app{
  padding: 8px;
}
</style>
