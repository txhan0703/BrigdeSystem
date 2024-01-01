<template>
  <div class="baseParam-container">
    <div style="position:absolute">
        <el-button type="primary" size="medium">保存当页已填参数</el-button>
      </div>
    <div class="left-form">
      <el-form ref="form" :model="form" label-width="200px">
        <el-form-item label="塔顶高度 = ">
          <el-input v-model="form.HeightTop"><template #suffix>m</template></el-input>
        </el-form-item>
        <el-form-item label="中塔柱顶高度 = ">
          <el-input v-model="form.HeightMid"><template #suffix>m</template></el-input>
        </el-form-item>
        <el-form-item label="横梁高度 = ">
          <el-input v-model="form.HeightBot"><template #suffix>m</template></el-input>
        </el-form-item>
        <el-form-item label="中塔柱顶纵桥向间距 = ">
          <el-input v-model="form.DistanceYMid"><template #suffix>m</template></el-input>
        </el-form-item>
        <el-form-item label="下塔柱顶纵桥向长度 = ">
          <el-input v-model="form.DistanceYBot"><template #suffix>m</template></el-input>
        </el-form-item>
        <el-form-item label="中塔柱顶横桥向间距 = ">
          <el-input v-model="form.DistanceZMid"><template #suffix>m</template></el-input>
        </el-form-item>
        <el-form-item label="下塔柱顶横桥向长度 = ">
          <el-input v-model="form.DistanceZBot"><template #suffix>m</template></el-input>
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
    margin-top: 40px;
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
