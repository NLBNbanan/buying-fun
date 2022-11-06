<template>
  <div class="home">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#ff0000">
      <van-swipe-item v-for="item in banners" :key="item._id">
        <img :src="item.coverImg" alt="" />
      </van-swipe-item>
    </van-swipe>
    <!-- 商品列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="product_list">
        <ul class="ul_product">
          <li
            v-for="item in products"
            :key="item._id"
            @click="godetail(item._id)"
          >
            <img :src="item.coverImg" alt="" />
            <div class="product_r">
              <h3>{{ item.name }}</h3>
              <p>{{ item.price }}</p>
            </div>
          </li>
        </ul>
      </div>
    </van-list>
  </div>
</template>

<script>
import { reqBanners, reqProducts } from "../../api/product";
export default {
  data() {
    return {
      banners: [],
      products: [],
      page: 1,
      finished: false, // 如果为true表示数据加载完毕，拉到底不能再执行onLoad方法了
      loading: false, // 用于控制加载中...
    };
  },
  computed: {},
  watch: {},

  methods: {
    async initBanners() {
      const result = await reqBanners();
      //   console.log(result);
      this.banners = result.products;
    },
    async initProducts() {
      this.loading = true; // 开启
      const result = await reqProducts({ page: this.page });
      this.loading = false; //关闭
      // 需要把获取的数据加到原来的数据之后
      this.products = [...this.products, ...result.products];
      if (result.products.length < 10) {
        // 说明是最后一页了
        this.finished = true; // 最后一页之后不能再调用接口了
      } else {
        // 不是最后一页
        this.page++;
      }
    },
    // 加载数据
    onLoad() {
      // 初始化商品列表
      this.initProducts();
    },
    // 跳转详情
    godetail(id) {
      this.$router.push("/detail/" + id);
    },
  },
  created() {
    // 初始化轮播图
    this.initBanners();
  },
  mounted() {},
  components: {},
};
</script>
<style scoped>
.home {
  padding-bottom: 40px;
}
.my-swipe,
.my-swipe img {
  height: 220px;
}
.my-swipe img {
  width: 100%;
}
.ul_product li {
  display: flex;
  padding: 10px;
}
.ul_product li img {
  width: 80px;
  height: 80px;
}
.ul_product li .product_r {
  padding-left: 10px;
  flex: 1;
}
.ul_product li .product_r h3 {
  font-weight: normal;
  font-size: 14px;
  color: #888;
}
.product_list {
  padding-bottom: 0px;
}
</style>
