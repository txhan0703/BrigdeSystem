<template>
    <div class="baseParam-container">
      <div style="position:absolute">
          <el-button type="primary" size="medium">保存当页已填参数</el-button>
        </div>
      <div class="left-form-tab">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-table
        :data="ruleForm.tableData"
        :border="true"
        :cell-class-name="getCellIndex"
        @paste.native="pasteInfo($event)"
      @cell-click="cellClick"
        style="width: 100%">
      <el-table-column
        prop="h"
        label="高度/m"
        width="150">
        <template slot-scope="scope">
          <el-form-item :rules="rules.e" :prop="'tableData['+scope.$index+'].h'">
            <el-input v-if="scope.row.edit" v-model="ruleForm.tableData[scope.$index].h" placeholder="请填写"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column
        prop="s"
        label="截面面积/m^2"
        width="150">
        <template slot-scope="scope">
          <el-form-item :rules="rules.e" :prop="'tableData['+scope.$index+'].s'">
            <el-input v-if="scope.row.edit" v-model="ruleForm.tableData[scope.$index].s" placeholder="请填写"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column
        prop="tdir"
        label="纵桥向惯性矩/m^4"
        width="150">
        <template slot-scope="scope">
          <el-form-item :rules="rules.e" :prop="'tableData['+scope.$index+'].tdir'">
            <el-input v-if="scope.row.edit" v-model="ruleForm.tableData[scope.$index].tdir" placeholder="请填写"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column
        prop="mdir"
        label="横桥向惯性矩/m^4"
        width="150">
        <template slot-scope="scope">
          <el-form-item :rules="rules.e" :prop="'tableData['+scope.$index+'].mdir'">
            <el-input v-if="scope.row.edit" v-model="ruleForm.tableData[scope.$index].mdir" placeholder="请填写"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
  
       </el-table>
      </el-form>
      </div>   
      <div class="block_down">
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
          rowIndex: 0,
          columnIndex: 0,
          src: require('../../../images/6中塔柱.jpg'),
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
        cellClick(row, column, cell, event) {
      // console.log(row, column, cell, event);
      this.rowIndex = row.index
      this.columnIndex = column.index
    },
    getCellIndex: function ({ row, column, rowIndex, columnIndex }) {
      row.index = rowIndex;
      column.index = columnIndex;
    },
        /** 复制粘贴 */
    pasteInfo(e) {
      try {
        e.preventDefault(); //阻止默认粘贴事件
        e.stopPropagation(); //阻止事件冒泡

        var data = null;
        var clipboardData = e.clipboardData || window.clipboardData; // IE
        if (!clipboardData) {
          //chrome
          clipboardData = e.originalEvent.clipboardData;
        }
      
        data = clipboardData.getData("Text"); //复制过来的内容
        //首先对源头进行解析
        var rowStrArray = data.split("\r\n"); //拆成多行
        let rows = [];
        for (var i = 0; i < rowStrArray.length-1; i++) {
          var row = [];
          var tdStrArray = rowStrArray[i].split("\t"); //按列拆分
          for (var j = 0; j < tdStrArray.length; j++) {
            row.push(tdStrArray[j]);
          }
          rows.push(row);
        }
        if(this.rowIndex!=0||this.columnIndex!=0){
          this.$message.error('只支持从首行首列粘贴');
          return ;
        }

        let emptyObj = { //需要复制粘贴的key值列
            h: '',
            s: '',
            tdir: '',
            mdir: '',
            edit: true
        }
        if(rows.length>4){
          for(var i=4; i<rows.length; i++){
            this.ruleForm.tableData.push(emptyObj);
          }
        }

        for (var j = 0; j < rows.length; j++) {
          if(this.rowIndex+j > this.ruleForm.tableData.length - 1){
            break
          }
          let item = {}
          console.log(this.rowIndex+j)
          item = JSON.parse(JSON.stringify(this.ruleForm.tableData[this.rowIndex+j]))
          let num = 0
          let numFlag = 0 //从哪一列开始粘贴：全部列都可以粘贴(即从第0列可以粘贴)
          for (var key in emptyObj) {
            if (!rows[j][num]) {
              break
            }
            // console.log('numFlag--', numFlag, 'this.columnIndex--', this.columnIndex, 'num-', num);
            if (this.columnIndex <= numFlag) {
              // 针对不能修改的列字段做处理，可以复制粘贴的列才做赋值。根据需求加下面的if判断
              if (key !== 'jg' && key !== 'gz' && key !== 'xz') {
                item[key] = rows[j][num]
              }
              num = num + 1
            }
            numFlag = numFlag + 1
          }
          this.$set(this.ruleForm.tableData, this.rowIndex+j, item)
        }
      } catch(err) {
        console.log(err);
        this.$message.error('请选择粘贴位置')
      }
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
  