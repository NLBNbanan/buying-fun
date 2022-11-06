<template>
  <div class="detail" v-if="detail">
    <van-nav-bar
      title="商品详情"
      left-text="返回"
      right-text="购物车"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <h3>{{ detail.name }}</h3>
    <img :src="detail.coverImg" width="100%" height="220px" alt="" />
    <p>价格:{{ detail.price }}</p>
    <div class="detailImg" v-html="detail.content"></div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        @click="onClickRight"
      />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-button
        type="danger"
        text="添加到购物车"
        @click="addcart(detail._id)"
      />
    </van-goods-action>
  </div>
</template>

<script>
import { reqDetail } from "../../api/product";
import { addToCart } from "../../api/cart";
import { Toast } from "vant";
export default {
  data() {
    return {
      id: "",
      detail: null,
    };
  },
  computed: {},
  watch: {},
  methods: {
    //导航栏
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push({
        name: "Cart",
      });
    },
    // 获取详情
    async getDetail(id) {
      const result = await reqDetail(id);
      // console.log(result);
      this.detail = result;
    },
    // 添加购物车
    async addcart(id) {
      const result = await addToCart(id);
      // console.log(result);
      Toast("添加购物车成功");
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.getDetail(this.id);
  },
  mounted() {},
  components: {},
};
</script>
<style >
.detailImg{
  margin: 0 ;
  padding: 0;
}
.detailImg p {
  margin: 0;
}
.detailImg p img{
  font-size: 0;
  padding: 0;
  width: 100%;
  /* height: 220px; */
}

</style>
