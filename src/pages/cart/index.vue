<template>
  <div class="cart">
    <div class="good-list" v-if="list.length > 0">
      <div class="goods" v-for="data in list" :key="data._id">
        <van-checkbox class="checkbox" v-model="data.checked"
          >复选框{{ data.checked }}</van-checkbox
        >
        <img class="goods-img" :src="data.product.coverImg" alt="" />
        <div class="goods-info">
          <p>{{ data.product.name }}</p>
          <span>{{ data.product.price }}</span>
          <span @click="updatePro(data.product._id, 1)">+</span>
          {{ data.quantity }}
          <span @click="data.quantity > 1 && updatePro(data.product._id, -1)"
            >-</span
          >
          <!-- 删除的是购物车数据，需要传购物车id -->
          <span v-if="data.checked" @click="del(data._id)">删除</span>
        </div>
      </div>
    </div>
    <div v-else>购物车空空如也</div>
    <van-submit-bar
      :price="sumPrice * 100"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checked">全选</van-checkbox>
      <van-icon name="delete-o" @click="dels" v-show="checked" />
    </van-submit-bar>
  </div>
</template>

<script>
import {
  reqCartListAPI,
  addToCart,
  reqDeletecartAPI,
  reqDeletecartsAPI,
} from "@/api/cart";
import { reqSaveOrderAPI } from "@/api/order";
import { Toast } from "vant";
export default {
  data() {
    return {
      list: [],
    };
  },
  computed: {
    checked: {
      // 一旦触发修改值，就会执行set方法
      set(flag) {
        // console.log(flag);
        // 点击全选把checkbox都加上checked属性和全选状态一直
        this.list.map((item) => this.$set(item, "checked", flag));
      },
      get() {
        // 数据删完了那么全选按钮要处于不选中状态
        if (this.list.length == 0) {
          return false;
        } else {
          return (
            this.list.length == this.list.filter((item) => item.checked).length
          );
        }
      },
    },
    // 选中的项
    selectgoods() {
      let selectlist = [];
      this.list.filter((item) => {
        // 筛选出选中的项
        if (item.checked) {
          selectlist.push(item._id);
        }
      });
      return selectlist;
    },
    // 选中的购物车
    selectcart() {
      let selectlist = [];
      this.list.filter((item) => {
        // 筛选出选中的项
        if (item.checked) {
          selectlist.push({
            quantity: item.quantity,
            product: item._id, // 购物车的id
            price: item.product.price,
          });
        }
      });
      return selectlist;
    },
    // 计算中
    sumPrice() {
      // pre初始值为0  cur表示数组对象中的当前项
      return this.list
        .filter((data) => data.checked)
        .reduce((pre, cur) => {
          return (pre += cur.product.price * cur.quantity);
        }, 0);
    },
  },
  watch: {},

  methods: {
    async getcartlist() {
      const result = await reqCartListAPI();
      // console.log(result);
      this.list = result;
    },
    async updatePro(id, num) {
      const result = await addToCart(id, num);
      // console.log(result);
      // 1 再次调接口  2 在前端把购物车数量修改一下即可
      // this.getcartlist();
      this.list.forEach((data) => {
        if (data.product._id == id) {
          data.quantity += num;
        }
      });
    },
    async del(id) {
      const result = await reqDeletecartAPI(id);
      // console.log(result);
      this.getcartlist(); // 删除成功再次调用购物车列表接口
    },
    // 删除多个
    async dels() {
      // console.log(this.selectgoods);
      const result = await reqDeletecartsAPI(this.selectgoods);
      this.getcartlist();
    },
    // 提交订单
    async onSubmit() {
      // 判断一下有没有收货人相关信息
      const receiver = this.$store.state.address.receiver;
      const regions = this.$store.state.address.regions;
      const address = this.$store.state.address.address;
      if (receiver && regions && address) {
        // 执行提交订单,提交订单必须有选中项
        if (this.selectcart.length) {
          const result = await reqSaveOrderAPI({
            receiver,
            regions,
            address,
            orderDetails: this.selectcart,
          });
          // console.log(result);
          this.$router.push("/order");
        } else {
          Toast("请选择购物车");
        }
      } else {
        // 跳转到添加收货人信息页面
        this.$router.push("/address");
      }
    },
  },
  created() {
    this.getcartlist();
  },
  mounted() {},
  components: {},
};
</script>
<style scoped>
.good-list {
  padding-bottom: 50px;
}
.goods {
  display: flex;
  height: 100px;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 15px;
}
.checkbox {
  width: 20px;
  height: 20px;
}
.goods-img {
  width: 80px;
  height: 80px;
}
.goods-info {
  flex: 1;
}
.van-submit-bar{
  bottom: 50px;
}
</style>
