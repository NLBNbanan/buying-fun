<template>
  <div class="order">
    订单页面
    <ul v-if="orderList.length > 0">
      <li v-for="(item, index) in orderList" :key="item._id">
        <van-checkbox class="checkbox" v-model="item.checked">{{
          item.checked
        }}</van-checkbox>
        订单号:<span v-html="index + 1"></span> UserID:<span>{{
          item.user
        }}</span>
        <van-button type="warning" size="small" @click="delOrder(item._id)"
          >删除</van-button
        >
      </li>
    </ul>
    <div v-else>现在还没有订单哦</div>
    <van-submit-bar class="submit" button-text="结算" @click="onSubmit">
      <van-checkbox v-model="checked">全选</van-checkbox>
      <van-icon name="delete-o" @click="dels" v-show="checked" />
    </van-submit-bar>
  </div>
</template>

<script>
import { reqOrders, delOrderAPI, delOrdermanyAPI } from "@/api/order";
import { Toast } from "vant";
export default {
  data() {
    return {
      orderList: [],
     
    };
  },
  computed: {
    checked: {
      // 一旦触发修改值，就会执行set方法
      set(flag) {
        // console.log(flag);
        // 点击全选把checkbox都加上checked属性和全选状态一直
        this.orderList.map((item) => this.$set(item, "checked", flag));
      },
      get() {
        // 数据删完了那么全选按钮要处于不选中状态
        if (this.orderList.length == 0) {
          return false;
        } else {
          return (
            this.orderList.length ==
            this.orderList.filter((item) => item.checked).length
          );
        }
      },
    },
    // 选中的项
    selectgoods() {
      let selectlist = [];
      this.orderList.filter((item) => {
        // 筛选出选中的项
        if (item.checked) {
          selectlist.push(item._id);
        }
      });
      return selectlist;
    },
  },
  watch: {},

  methods: {
    //结算
    async onSubmit() {
      Toast("结算成功");
    },
    // 删除多个订单
    async dels() {
      // console.log(this.selectgoods);
      const result = await delOrdermanyAPI(this.selectgoods);
      // console.log(result);
      this.initOrders();
    },
    //加载订单
    async initOrders() {
      const result = await reqOrders();
      // console.log(result);
      this.orderList = result.orders;
      // console.log(this.orderList);
    },
    async delOrder(id) {
      const res = await delOrderAPI(id);
      // console.log(res);
      Toast("删除成功");
      this.initOrders();
    },
  },
  created() {
    this.initOrders();
  },
  beforemounted() {
    // console.log(this.orderList);
    if (this.orderList.length < 1) {
      Toast("目前还没有订单哦！");
    }
  },
  components: {},
};
</script>
<style >
.order li {
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}
.order .van-submit-bar__bar{
  justify-content: space-between;
}
</style>
