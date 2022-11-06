<template>
  <div class="editPasss">
    <van-form @submit="onSubmit">
      <van-field
        v-model="oldPassword"
        name="oldPassword"
        type="password"
        label="旧密码"
        placeholder="旧密码"
        :rules="[{ required: true, message: '请填写旧密码' }]"
      />
      <van-field
        v-model="password"
        name="password"
        type="password"
        label="新密码"
        placeholder="新密码"
        :rules="[{ required: true, message: '请填写新密码' }]"
      />
     

      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >点击提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { editPassAPI } from "../../api/editPass";
import { Toast } from "vant";

export default {
  data() {
    return {
      oldPassword: "",
      password: "",
   
    };
  },
  computed: {},
  watch: {},

  methods: {
   async onSubmit(values) {
      // console.log(values);
      const res = await editPassAPI(values)
      // console.log(res)
      Toast(res.message);
      this.$router.go(-1)
    },
  },
  created() {},
  mounted() {},
  components: {},
};
</script>
<style scoped>
</style>
