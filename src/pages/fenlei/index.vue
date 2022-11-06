<template>
  <div class="fenlei">
    <van-sidebar v-model="activeKey">
      <van-sidebar-item
        :title="item.name"
        v-for="item in categories"
        :key="item._id"
        @click="getProductsByCategory(item.name)"
      />
    </van-sidebar>
    <!-- 右边的代码 -->
    <div class="fenlei_r">
      <ul>
        <li
          v-for="item in products"
          :key="item._id"
          @click="godetail(item._id)"
        >
          <img :src="item.coverImg" width="60" height="60" alt="" />
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { loadcategorys, loadProductsByCategory } from "../../api/fenlei";
export default {
  data() {
    return {
      activeKey: 0,
      categories: [],
      products: [],
    };
  },
  computed: {},
  watch: {},

  methods: {
    // 获取分类列表
    async initcategorys() {
      const result = await loadcategorys();
      // console.log(result);
      this.categories = result.categories;
      // 获取默认数据
      this.getProductsByCategory(this.categories[0].name);
    },
    // 获取分类对应的商品
    async getProductsByCategory(name) {
      const result = await loadProductsByCategory(name);
      // console.log("分类对应的商品", result);
      this.products = result.products;
    },
    // 点击跳转详情页
    godetail(id) {
      this.$router.push("/detail/" + id);
    },
  },
  created() {
    this.initcategorys();
  },
  mounted() {},
  components: {},
};
</script>
<style scoped>
.fenlei .van-sidebar {
  width: 20%;
  float: left;
}
.fenlei_r {
  float: left;
  width: 80%;
  box-sizing: border-box;
}
.fenlei_r ul {
  overflow-x: hidden;
}
.fenlei_r li {
  float: left;
  width: 33.33%;
  box-sizing: border-box;
  text-align: center;
  padding: 10px;
}
.fenlei_r li span {
  font-size: 12px;
  display: block;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
}
.fenlei_r li img {
  display: block;
  margin: 0 auto;
}
</style>
