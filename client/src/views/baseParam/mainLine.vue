<template>
    <div class="baseParam-container">
      
      <div class="leftop-form">
        <div style="position:absolute">
        <el-button type="primary" size="medium">保存当页已填参数</el-button>
      </div>

      <div style="position:absolute;margin-top: 10%;margin-left:15%">        <span style="color:black;font-size: 23px;font-weight:bold;">1.主梁参数</span></div>
        <el-form ref="form" :model="ruleForm.form1" label-width="250px" style="padding-left: 0px;padding-top: 10%;">
          <el-form-item label="过渡墩到辅助墩距离L1 = ">
            <el-input v-model="ruleForm.form1.L1"><template #suffix>m</template></el-input>
          </el-form-item>
          <el-form-item label="辅助墩到桥塔支座距离L2 = ">
            <el-input v-model="ruleForm.form1.L2"><template #suffix>m</template></el-input>
          </el-form-item>
          <el-form-item label="桥塔支座到跨中距离L3 = ">
            <el-input v-model="ruleForm.form1.L3"><template #suffix>m</template></el-input>
          </el-form-item>
          <el-form-item label="主梁高度 = ">
            <el-input v-model="ruleForm.form1.height"><template #suffix>m</template></el-input>
          </el-form-item>
          <el-form-item label="桥塔支座偏心距离 = ">
            <el-input v-model="ruleForm.form1.offset"><template #suffix>m</template></el-input>
          </el-form-item>
        </el-form>
      </div>   
      
      <div class="block_mainline">
      <el-image :src="src" :fit="'fill'">
        <div slot="placeholder" class="image-slot">
          加载中<span class="dot">...</span>
        </div>
      </el-image>
        </div>
    <div class="block_mainline_bottom">
      <div class="left_part">
      <span class="bottom_span">2.支座布置</span>
      <el-form ref="ruleForm.form2" :model="ruleForm.form2" label-width="120px" style="padding-top:10px">
        <el-form-item label="竖向 ： ">
          <el-checkbox-group v-model="ruleForm.form2.shuxiang">
          <el-checkbox label="L1">过渡墩</el-checkbox>
          <el-checkbox label="L2">辅助墩</el-checkbox>
          <el-checkbox label="L3">桥塔支座</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="横向 ：  ">
          <el-checkbox-group v-model="ruleForm.form2.hengxiang">
          <el-checkbox label="L1">过渡墩</el-checkbox>
          <el-checkbox label="L2">辅助墩</el-checkbox>
          <el-checkbox label="L3">桥塔支座</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="纵向 ：  ">
          <el-checkbox-group v-model="ruleForm.form2.zongxiang">
          <el-checkbox label="L1">过渡墩</el-checkbox>
          <el-checkbox label="L2">辅助墩</el-checkbox>
          <el-checkbox label="L3">桥塔支座</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      </div>
      <div class="right_part">
        <div style="padding-left:30px">
      <span class="bottom_span_2">3.其他纵向约束</span>
      <el-form ref="ruleForm.form3" :model="ruleForm.form3" label-width="120px" style="padding-top:10px;padding-left:-20px">
        <el-form-item>
          <el-radio v-model="ruleForm.form3.yes" :label="true">是</el-radio>
          <div v-if="ruleForm.form3.yes===true" style="display: inline-block;">
            <span style="font-size:18px;">刚度：</span>
            <el-input v-model="ruleForm.form3.gangdu" style="width: 80px;display: inline-block;"><template #suffix>N/m</template></el-input>
          </div>
          <el-radio class="el-radio_2" v-model="ruleForm.form3.yes" :label="false">否</el-radio>
        </el-form-item>
      </el-form>
      </div>
      </div>
    </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  
  export default {
    name: 'mainLine',
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
          src: require('../../../images/2.png'),
          ruleForm:{
            form1: {
            L1:"",
            L2:"",
            L3:"",
            height: 1,
            offset: 1,
          },
          form2:{
            shuxiang:
            [],
            hengxiang:
            [],
            zongxiang:
            []
          },
          form3:{
            yes: true,
            gangdu:""
          }},
          
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
      font-size: 30px;
      line-height: 46px;
    }
  }
  .leftop-form{
  position: absolute;
  left: 3%;
  bottom: 0;
  height: 100%;
  top: 5%;
  .el-input{
    width: 120px;
  }
  .el-form-item{
    margin-top: 30px;
  }
  .el-form-item__label{
      color:black;
      font-size: 18px;
    }
}
  .block_mainline{
  position: absolute;
  left: 40%;
  width: 760px;
  height: 100%;
  top: 3%;
}
  .block_mainline_bottom{
    position: absolute;
    bottom:0;
    margin-bottom: 0;
    overflow-y: scroll;
    margin-left: 5%;
    height:260px;
    width:90%;
    .left_part{
      width:50%;
      float: left;
      .bottom_span{
      padding-top: 30px;
      color:black;
      font-size: 23px;
      font-weight:bold;
    }


    .el-form-item__label{
        color:black;
        font-size: 20px;
      }
      .el-checkbox{
        margin-left:30px;
      }
      .el-checkbox__label{
        color:black;
        font-size: 20px;
      }
    }
    .right_part{
      width:40%;
      float: left;
      .bottom_span_2{
      padding-top: 30px;
      color:black;
      font-size: 23px;
      font-weight:bold;
    }
    .el-form-item__label{
        color:black;
        font-size: 20px;
      }
      .el-radio_2{
        display: block;
        padding-top:20px;
      }
      .el-radio__label{
        color:black;
        font-size: 20px;
      }
    }

    

  }
  </style>
  