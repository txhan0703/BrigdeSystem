<template>
  <div class="baseParam-container">
    <div style="position:absolute">
        <el-button type="primary" size="medium">保存当页已填参数</el-button>
      </div>
    <div class="left-form">
      <el-form ref="form" :model="form" label-width="220px">
        <el-form-item label="纵桥向桥塔型式 ">
          <template>
            <el-radio v-model="form.Width" label="1">钻石型</el-radio>
            <el-radio v-model="form.Width" label="2">独柱型</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="横桥向桥塔型式 ">
          <template>
            <el-radio v-model="form.Length" label="1">钻石型</el-radio>
            <el-radio v-model="form.Length" label="2">独柱型</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="①塔顶高度 = ">
          <el-input v-model="form.HeightTop"><template #suffix>m</template></el-input>
        </el-form-item>
        <el-form-item label="②中塔柱顶高度 = ">
          <el-input v-model="form.HeightMid"><template #suffix>m</template></el-input>
        </el-form-item>
        <el-form-item label="③横梁高度 = ">
          <el-input v-model="form.HeightBot"><template #suffix>m</template></el-input>
        </el-form-item>
        <el-form-item label="④中塔柱顶纵桥向间距 = ">
          <el-input v-model="form.DistanceYMid" :disabled="form.Width=='2'"><template #suffix>m</template></el-input>
        </el-form-item>
        <el-form-item label="⑤下塔柱顶纵桥向长度 = ">
          <el-input v-model="form.DistanceYBot" :disabled="form.Width=='2'"><template #suffix>m</template></el-input>
        </el-form-item>
        <el-form-item label="⑥下塔柱底纵桥向长度 = ">
          <el-input v-model="form.DistanceZMid" :disabled="form.Width=='2'"><template #suffix>m</template></el-input>
        </el-form-item>
        <el-form-item label="⑦中塔柱顶横桥向间距 = ">
          <el-input v-model="form.DistanceZBot" :disabled="form.Length=='2'"><template #suffix>m</template></el-input>
        </el-form-item>
        <el-form-item label="⑧下塔柱顶横桥向长度 = ">
          <el-input v-model="form.DistanceZMid" :disabled="form.Length=='2'"><template #suffix>m</template></el-input>
        </el-form-item>
        <el-form-item label="⑨下塔柱底横桥向长度 = ">
          <el-input v-model="form.DistanceZBot" :disabled="form.Length=='2'"><template #suffix>m</template></el-input>
        </el-form-item>
      </el-form>
    </div>   
    <div class="block">
    <el-image :src="src" :fit="'fill'">
      <div slot="placeholder" class="image-slot">
        加载中<span class="dot">...</span>
      </div>
    </el-image>
  </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'bridgeTower',
  computed: {
    ...mapGetters([
      'name',
      'perms'
    ])
  },
  mounted(){
      const loading = this.$loading({
        lock: true,
        text:"图片加载中",
        spinner:'el-icon-loading',
        background: 'rgba(0,0,0,0.7)'
      });
      var that = this;
      var timer = setInterval(()=>{
        if(document.readyState==='complete'){
          loading.close();
          window.clearInterval(timer);
        }
      },500)
    },
  data() {
      return {
        src: require('../../../images/1.png'),
        form: {
          Width: "1",
          Length: "1",
          HeightTop:"",
          HeightMid:"",
          HeightBot:"",
          DistanceYMid:"",
          DistanceYBot:"",
          DistanceZMid:"",
          DistanceZBot:""
        }
      }
    }
}
</script>

<style lang="scss">
.baseParam {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 24px;
    line-height: 46px;
  }
}
.left-form{
  position: absolute;
  left: 8%;
  bottom: 0;
  height: 100%;
  top: 5%;
  .el-input{
    width: 120px;
  }
  .el-form-item{
    margin-top: 25px;
  }
  .el-form-item__label{
      color:black;
      font-size: 18px;
    }
}
.block{
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 460px;
  height: 100%;
  top: 5%;
}
</style>
