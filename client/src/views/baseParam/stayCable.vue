<template>
    <div class="baseParam-container">
      <div style="position:absolute">
        <el-button type="primary" size="medium">保存当页已填参数</el-button>
      </div> 
      <div class="block_stayCable">
      <el-image :src="src" :fit="'fill'">
        <div slot="placeholder" class="image-slot">
          加载中<span class="dot">...</span>
        </div>
      </el-image>
        </div>
    <div class="block_stayCable_bottom">
      <div class="left_part">
      <el-form ref="form1" :model="form1" :rules="rules1" label-width="200px" style="padding-top:10px">
        <el-form-item prop="biankua" label="边跨斜拉索数： ">
            <el-input
            style="width:60px"
                v-model="form1.biankua">
            </el-input>
        </el-form-item>
      </el-form>
      </div>
      <div class="right_part">
        <el-form ref="form2" :model="form2" :rules="rules2" label-width="200px" style="padding-top:10px">
        <el-form-item  prop="zhongkua" label="中跨斜拉索数： ">
            <el-input
            style="width:60px"
                v-model="form2.zhongkua">
            </el-input>
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
        var checkForm = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(Number(value))) {
            callback(new Error('请输入数字值'));
          } 
        }, 500);
      };
        return {
          src: require('../../../images/3.png'),
          form1:{
            biankua: 10,
          },
          form2:{
            zhongkua:10,
          },
          
        rules1: {
           biankua: [
            { validator: checkForm, trigger: 'blur' }
          ]
        },
        rules2: {
          zhongkua: [
            { validator: checkForm, trigger: 'blur' }
          ]
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
  .block_stayCable{
    position: absolute;
    top: 10%;
    left: 14%;
    width: 72%;
    height: 400px;
  }
  .block_stayCable_bottom{
    position: absolute;
    bottom:0;
    margin-left: 100px;
    height:120px;
    width:100%;
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
  