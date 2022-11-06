<template>
  <div class="address">
    <van-address-edit
      :area-list="areaList"
      :address-info="addressInfo"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
import { areaList } from "@vant/area-data";
export default {
  data() {
    return {
      areaList,
      addressInfo: {
        name: "111",
        tel: "13656323032",
        province: "河南省",
        city: "郑州市",
        addressDetail: "莲花街",
        isDefault: true,
        postalCode: "471900",
        areaCode: "110000",
        areaCode: "110100",
        areaCode: "110102",
      },
    };
  },
  computed: {},
  watch: {},

  methods: {
    onSave(obj) {
      Toast("save");
      // console.log(obj);
      this.$store.commit("address/changeinfo", {
        receiver: obj.name, // 用户名
        regions: obj.province + "-" + obj.city + "-" + obj.county, // 地区
        address: obj.addressDetail, // 地址
      });
      // 数据持久化
      localStorage.setItem("receiver", obj.name);
      localStorage.setItem(
        "regions",
        obj.province + "-" + obj.city + "-" + obj.county
      );
      localStorage.setItem("address", obj.addressDetail);
      // 跳转到购物车页面
      this.$router.push("/cart");
    },
    onDelete() {
      Toast("delete");
    },
    onChangeDetail(val) {},
  },
  created() {
    // console.log(this.areaList);
  },
  mounted() {},
  components: {},
};
</script>
<style scoped></style>
