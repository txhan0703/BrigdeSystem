<template>
    <div class="baseParam-container">
      <div style="position:absolute">
          <el-button type="primary" size="medium">保存当页已填参数</el-button>
        </div>
      <div class="left-form-tab">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="1.求解模态： ">
          <el-checkbox-group v-model="ruleForm.mode">
          <el-checkbox label="L1">纵向正对称屈曲模态</el-checkbox>
          <el-checkbox label="L2">纵向反对称屈曲模态</el-checkbox>
          <el-checkbox label="L3">横向正对称屈曲模态</el-checkbox>
          <el-checkbox label="L4">横向反对称屈曲模态</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item :rules="rules.e" prop="rank" style="margin-top:5%;" label="2.模态阶数 ">
            <el-input v-model="ruleForm.rank"></el-input>
          </el-form-item>

          <div style="margin-top:5%;">
            <span style="color:black;font-size: 20px;font-weight:bold;">3.屈曲系数范围</span>
            <el-row>
            <el-col :span="4">
          <el-form-item :rules="rules.e" prop="range.min">
            <el-input v-model="ruleForm.range.min"></el-input>
           </el-form-item>
        </el-col>
        <el-col :span="1">
            <span style="color:black;font-size: 20px; height: 60px; line-height: 60px; text-align: center;">~</span>
           </el-col>
           
           <el-col :span="4">
           <el-form-item :rules="rules.e" prop="range.max">
            <el-input  v-model="ruleForm.range.max"></el-input>
          </el-form-item>
          </el-col>
        </el-row>
        </div>

          <div style="margin-top:5%;">
          <span style="color:black;font-size: 20px;font-weight:bold;">4.屈曲模态函数多项式次数</span>
          <el-form-item :rules="rules.e" prop="multi.mainline">
            <span style="color:black;font-size: 16px;">主梁 &nbsp;&nbsp;&nbsp;</span>   <el-input v-model="ruleForm.multi.mainline"></el-input>
          </el-form-item>
          <el-form-item :rules="rules.e" prop="multi.upper">
            <span style="color:black;font-size: 16px;">上塔柱 &nbsp;&nbsp;&nbsp;</span>    <el-input v-model="ruleForm.multi.upper"></el-input>
          </el-form-item>
          <el-form-item :rules="rules.e" prop="multi.down">
            <span style="color:black;font-size: 16px;">中塔柱 &nbsp;&nbsp;&nbsp;</span>    <el-input v-model="ruleForm.multi.down"></el-input>
          </el-form-item>
          <el-form-item :rules="rules.e" prop="multi.down">
            <span style="color:black;font-size: 16px;">下塔柱 &nbsp;&nbsp;&nbsp;</span>    <el-input v-model="ruleForm.multi.down"></el-input>
          </el-form-item>
        </div>
      </el-form>
      </div>   
      <div class="block_down">

     </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  import { MessageBox } from 'element-ui';
  
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
      var validatePass = (rule, value, callback) => {
        console.log(value)
          if (!value) {
            return callback(new Error('不能为空'));
          }
          if (!value.match(/^[0-9]+([.]{1}[0-9]+){0,1}$/)) {
              callback(new Error('请输入数字值'));
          }
          setTimeout(() => {
            if (!value.match(/^[0-9]+([.]{1}[0-9]+){0,1}$/)) {
              callback(new Error('请输入数字值'));
            }
          }, 1000);
        };
        return {
          rowIndex: 0,
          columnIndex: 0,
          src: require('../../../images/6中塔柱.png'),
          rules: {
            e: [
              { validator: validatePass, trigger: 'blur' }
            ],
            mainline: [
              { validator: validatePass, trigger: 'blur' }
            ]
          },
          ruleForm:{
            mode:
            [],
            rank:'',
            range:{
                min: '',
                max: ''
            },
            multi:{
                mainline: '',
                upper: '',
                down: ''

            }
        }
        }
      },
      methods:{
        beforeRouteLeave:(to, from, next) => {
        
        MessageBox.confirm('未保存本页数据，是否保存', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                next()
            }).catch(() => {
                // 用户点击了取消按钮，取消对应操作
            });

        },
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
  .left-form-tab{
    position: absolute;
    left: 4%;
    width: 100%;
    height: 100%;
    top: 12%;
    overflow-y:auto;

    .el-input{
      width: 120px;
    }
    .el-form-item{
      margin-top: 12px;
    }
    .el-form-item__label{
        color:black;
        font-size: 20px;
      }
  }
  .block_down{
    position: absolute;
    left: 60%;
    bottom: 0;
    width: 30%;

    top: 5%;
  }
  </style>
  