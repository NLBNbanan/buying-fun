<template>
  <div class="revise">
    <van-form @submit="onSubmit">
      <van-field name=avatar v-model="avatar" label="更换头像">
        <template #input>
          <img
            :src="avatar"
            alt=""
            width="80px"
            height="80px"
            @click="selImg"
          />
          <input
            type="file"
            name="avatar"
            style="display: none"
            ref="fileTag"
            @change="selEnd"
          />
        </template>
      </van-field>
      <van-field
        v-model="nickName"
        name="nickName"
        label="昵称"
        placeholder="昵称"
        :rules="[{ required: true, message: '请填写昵称' }]"
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
import { getUserAPI } from "../../api/mine";
import { uploadAvatarAPI, changeinfoAPI } from "../../api/reviseuserinfo";
import { Toast } from 'vant';
export default {
  data() {
    return {
      avatar:
        "https://img1.baidu.com/it/u=3632810533,3280769536&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
      userName: "",
      nickName: "",
      id: "",
      // uploader: [{ url: "https://img01.yzcdn.cn/vant/leaf.jpg" }],
    };
  },
  computed: {},
  watch: {},

  methods: {
    onSubmit(values) {
      // console.log(values)
      console.log(values)
      let data = values
      console.log(data)
      changeinfoAPI(data).then(res=>{
        // console.log(res)
        Toast(res.message)
        this.$router.push({name:'Mine'})
      }) 
      
    },
    //选择图片
    selImg() {
      this.$refs.fileTag.click();
    },
    selEnd() {
      // console.log(this.$refs.fileTag.files[0]);
      let formData = new FormData();
      formData.append("file", this.$refs.fileTag.files[0]);
      uploadAvatarAPI(formData).then(res=>{
         this.avatar = 'http://lanlianhua.work:3009'+res.info
        //  console.log(this.avatar )
      })
    },
    async getUserInfo() {
      const res = await getUserAPI();
      // console.log(res);
      this.avatar = res.avatar;
      this.userName = res.userName;
      this.id = res._id;
      this.nickName = res.nickName;
      // console.log(res);
    },
  },
  created() {
    this.getUserInfo();
    //  console.log(this.$route.params.id)
  },
  mounted() {},
  components: {},
};
</script>
<style scoped></style>
