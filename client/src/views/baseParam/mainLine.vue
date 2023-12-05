<template>
    <div class="baseParam-container">
      
      <div class="top-form">
        <div style="position:absolute">
        <el-button type="primary" size="medium">保存当页已填参数</el-button>
      </div>
        <el-form ref="form" :model="ruleForm.form1" label-width="200px" style="padding-left: 100px;">
          <el-form-item label="L1 = ">
            <el-input v-model="ruleForm.form1.L1"></el-input>
          </el-form-item>
          <el-form-item label="L2 = ">
            <el-input v-model="ruleForm.form1.L2"></el-input>
          </el-form-item>
          <el-form-item label="L3 = ">
            <el-input v-model="ruleForm.form1.L3"></el-input>
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
      <span class="bottom_span">支座布置</span>
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
      <span class="bottom_span_2">其他纵向约束</span>
      <el-form ref="ruleForm.form3" :model="ruleForm.form3" label-width="120px" style="padding-top:10px">
        <el-form-item>
          <el-radio v-model="ruleForm.form3.yes" :label="true">是</el-radio>
          <div v-if="ruleForm.form3.yes===true" style="display: inline-block;">
            <span style="font-size:18px;">刚度：</span>
            <el-input v-model="ruleForm.form3.gangdu" style="width: 80px;display: inline-block;"></el-input>
          </div>
          <el-radio class="el-radio_2" v-model="ruleForm.form3.yes" :label="false">否</el-radio>
        </el-form-item>
      </el-form>
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
          src: require('../../../images/2.jpg'),
          ruleForm:{
            form1: {
            L1:"",
            L2:"",
            L3:"",
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
  .top-form{
    position: fixed;
    margin-top: 0;
    width: 100%;
    height: 20%;
    .el-input{
      width: 120px;
    }
    .el-form-item{
      margin-top: 0px;
      display: inline-block;
    }
    .el-form-item__label{
        color:black;
        font-size: 20px;
      }
  }
  .block_mainline{
    position: absolute;
    top: 10%;
    left: 20%;
    width: 62%;
    height: 40%;
  }
  .block_mainline_bottom{
    position: absolute;
    bottom:0;
    margin-bottom: 0;
    overflow-y: scroll;
    margin-left: 100px;
    height:260px;
    width:80%;
    .left_part{
      width:40%;
      float: left;
      .bottom_span{
      padding-top: 30px;
      color:black;
      font-size: 30px;
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
      margin-right:20%;
      width:40%;
      float: right;
      .bottom_span_2{
      padding-top: 30px;
      color:black;
      font-size: 30px;
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
  