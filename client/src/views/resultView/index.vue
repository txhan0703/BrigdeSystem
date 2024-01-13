<template>
    <div class="baseParam-container">
      <div style="position:absolute">
       <div style="padding-left: 4%;" v-if="isCalculating"><i class="el-icon-loading"></i><span style="font-size: 15px;color:gray">计算模块正在计算中，启动时间：2024-01-13 17:57:36</span></div> 
      <div style="padding-left: 4%;margin-top:10px;width:150%;">
        <span style="font-size: 15px;color:gray;">页面展示结果计算时间：2024-01-13 08:57:36</span>
        <el-button>查看当前结果对应参数</el-button>
      </div>
      </div>

      <div style="position:absolute; float:right; right: 100px;">
          <el-button type="primary" size="medium" @click="viewHistory()">查看历史计算结果</el-button>
      </div>
      <div class="left-form-tab-result">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-table
        :data="ruleForm.tableData"
        :border="true"
        :cell-class-name="getCellIndex"
        style="width: 100%">
      <el-table-column
        prop="h"
        label="阶数"
        width="150">
        <template slot-scope="scope">
          <el-form-item :rules="rules.e" :prop="'tableData['+scope.$index+'].h'">
            <el-input v-if="scope.row.edit" v-model="ruleForm.tableData[scope.$index].h" placeholder="请填写"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column
        prop="s"
        label="屈曲荷载系数"
        width="150">
        <template slot-scope="scope">
          <el-form-item :rules="rules.e" :prop="'tableData['+scope.$index+'].s'">
            <el-input v-if="scope.row.edit" v-model="ruleForm.tableData[scope.$index].s" placeholder="请填写"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column
        prop="tdir"
        label="方向"
        width="150">
        <template slot-scope="scope">
          <el-form-item :rules="rules.e" :prop="'tableData['+scope.$index+'].tdir'">
            <el-input v-if="scope.row.edit" v-model="ruleForm.tableData[scope.$index].tdir" placeholder="请填写"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column
        prop="mdir"
        label="对称性"
        width="150">
        <template slot-scope="scope">
          <el-form-item :rules="rules.e" :prop="'tableData['+scope.$index+'].mdir'">
            <el-input v-if="scope.row.edit" v-model="ruleForm.tableData[scope.$index].mdir" placeholder="请填写"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column
        prop="re"
        label="结果"
        width="150">
        <template slot-scope="scope">
          <el-button @click="viewResult(scope.row)">查看结果</el-button>
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
          rules: {
            e: [
              { validator: validatePass, trigger: 'blur' }
            ]
          },
          ruleForm:{
            tableData:[
          {
            h: '',
            s: '',
            tdir: '',
            mdir: '',
            edit: true
          }, {
            h: '',
            s: '',
            tdir: '',
            mdir: '',
            edit: true
          }, {
            h: '',
            s: '',
            tdir: '',
            mdir: '',
            edit: true
          }, {
            h: '',
            s: '',
            tdir: '',
            mdir: '',
            edit: true
          }
          ]
        }
        }
      },
      methods:{
        viewResult(row){

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

    top: 15%;
  }
  </style>
  