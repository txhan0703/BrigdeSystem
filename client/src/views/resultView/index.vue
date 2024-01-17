<template>
    <div class="baseParam-container">
            <div style="position:absolute">
       <div style="padding-left: 4%;" v-if="isCalculating"><i class="el-icon-loading"></i><span style="font-size: 15px;color:gray">计算模块正在计算中，启动时间：2024-01-18 17:57:36</span></div> 
      <div style="padding-left: 4%;margin-top:10px;width:150%;">
        <span style="font-size: 15px;color:gray;">页面展示结果计算时间：2024-01-18 08:57:36</span>
        <el-button>查看当前结果对应参数</el-button>
      </div>
      </div>

      <div style="position:absolute; float:right; right: 100px;">
        <el-button type="primary"  @click="calculate()">启动计算</el-button>
          <el-button type="primary" size="medium" @click="viewHistory()">查看历史计算结果</el-button>
      </div>
      <div class="left-form-tab-result">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-table
        :data="ruleForm.tableData"
        :border="true"
        style="width: 100%">
      <el-table-column
        prop="h"
        label="阶数"
        width="150">
        <template slot-scope="scope">
          {{ruleForm.tableData[scope.$index].h}}
        </template>
      </el-table-column>
      <el-table-column
        prop="s"
        label="屈曲荷载系数"
        width="150">
        <template slot-scope="scope">
          {{ruleForm.tableData[scope.$index].s}}
        </template>
      </el-table-column>
      <el-table-column
        prop="tdir"
        label="方向"
        width="150">
        <template slot-scope="scope">
          {{ruleForm.tableData[scope.$index].tdir}}
        </template>
      </el-table-column>
      <el-table-column
        prop="mdir"
        label="对称性"
        width="150">
        <template slot-scope="scope">
          {{ruleForm.tableData[scope.$index].mdir}}
        </template>
      </el-table-column>
      <el-table-column
        prop="re"
        label="结果"
        width="150">
        <template slot-scope="scope">
          <el-button @click="viewResult(scope.$index)">查看结果</el-button>
   <!--trigger属性值：hover、click、focus 和 manual-->
    <el-image v-show="resultShow[scope.$index]" slot="reference" :src="resultSrc+'/Girder'+scope.$index+'.png'" style="width: 100px;height: 100px; cursor:pointer" :fit="'cover'"> </el-image>
        </template>
      </el-table-column>
       </el-table>
      </el-form>
      </div>   
      <div class="block_down_result">
      <el-image :src="src" :fit="'cover'">
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
          isCalculating: true,
          rowIndex: 0,
          columnIndex: 0,
          src: require('../../../images/11全桥图片.png'),
          resultSrc: "../../../../../matlab",
          resultShow: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
          rules: {
            e: [
              { validator: validatePass, trigger: 'blur' }
            ]
          },
          ruleForm:{
            tableData:[
          {
            h: 1,
            s: 7.2594,
            tdir: "纵桥向",
            mdir: "反对称",
            edit: true
          }, {
            h: 2,
            s: 8.0258,
            tdir: "纵桥向",
            mdir: "正对称",
            edit: true
          }, {
            h: 3,
            s: 8.0296,
            tdir: '横桥向',
            mdir: '正对称',
            edit: true
          }, {
            h: 4,
            s: 8.0398,
            tdir: '纵桥向',
            mdir: '反对称',
            edit: true
          }, {
            h: 5,
            s: 8.4931,
            tdir: '横桥向',
            mdir: '反对称',
            edit: true
          }, {
            h: 6,
            s: 10.8157,
            tdir: '横桥向',
            mdir: '正对称',
            edit: true
          }, {
            h: 7,
            s: 17.4213,
            tdir: '纵桥向',
            mdir: '正对称',
            edit: true
          }, {
            h: 8,
            s: 18.348,
            tdir: '横桥向',
            mdir: '反对称',
            edit: true
          }, {
            h: 9,
            s: 20.5259,
            tdir: '纵桥向',
            mdir: '反对称',
            edit: true
          }, {
            h: 10,
            s: 25.027,
            tdir: '横桥向',
            mdir: '正对称',
            edit: true
          }, {
            h: 11,
            s: 31.0289,
            tdir: '横桥向',
            mdir: '反对称',
            edit: true
          }, {
            h: 12,
            s: 32.5321,
            tdir: '纵桥向',
            mdir: '正对称',
            edit: true
          }, {
            h: 13,
            s: 32.6089,
            tdir: '纵桥向',
            mdir: '反对称',
            edit: true
          }, {
            h: 14,
            s: 33.756,
            tdir: '横桥向',
            mdir: '反对称',
            edit: true
          }, {
            h: 15,
            s: 33.7576,
            tdir: '横桥向',
            mdir: '正对称',
            edit: true
          }, {
            h: 16,
            s: 48.7101,
            tdir: '纵桥向',
            mdir: '正对称',
            edit: true
          }, {
            h: 17,
            s: 50.2973,
            tdir: '横桥向',
            mdir: '正对称',
            edit: true
          }, {
            h: 18,
            s: 50.8561,
            tdir: '纵桥向',
            mdir: '反对称',
            edit: true
          }, {
            h: 19,
            s: 54.4485,
            tdir: '横桥向',
            mdir: '反对称',
            edit: true
          }, {
            h: 20,
            s: 54.6054,
            tdir: '纵桥向',
            mdir: '反对称',
            edit: true
          }
          ]
        }
        }
      },
      methods:{
        viewResult(index){
          this.resultShow[index] = true;
        },
        viewHistory(){
          this.isCalculating = !this.isCalculating;
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
  .left-form-tab-result{
    position: absolute;
    left: 4%;
    height: 100%;
    top: 15%;
    overflow-y:auto;
    padding-bottom: 10%;

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
  .block_down_result{
    position: absolute;
    left: 60%;
    bottom: 0;
    width: 30%;

    top: 20%;
  }
  </style>
  