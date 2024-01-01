<template>
  <div class="baseParam-container">
    <div style="position:absolute">
        <el-button type="primary" size="medium">保存当页已填参数</el-button>
      </div>
    <div class="left-form-m">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-table
      :data="ruleForm.tableData"
      :border="true"
      style="width: 100%">
     <el-table-column
      prop="title"
      label=""
      width="180">
      <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="e"
      label="弹性模量/Pa"
      width="180">
      <template slot-scope="scope">
        <el-form-item :rules="rules.e" :prop="'tableData['+scope.$index+'].e'">
          <el-input v-if="scope.row.edit" v-model="ruleForm.tableData[scope.$index].e" placeholder="请填写"></el-input>
        </el-form-item>
      </template>
    </el-table-column>
    <el-table-column
      prop="p"
      label="密度/(kg·m-3)"
      width="180">
      <template slot-scope="scope">
       <el-form-item :rules="rules.p" :prop="'tableData['+scope.$index+'].p'">
          <el-input v-if="scope.row.edit" v-model="ruleForm.tableData[scope.$index].p" placeholder="请填写"></el-input>
        </el-form-item>
      </template>
    </el-table-column>

     </el-table>
    </el-form>
    </div>   
    <div class="block-m">
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
        src: require('../../../images/4.png'),
        rules: {
          e: [
            { validator: validatePass, trigger: 'blur' }
          ],
          p:[
            { validator: validatePass, trigger: 'blur' }
          ]
        },
        ruleForm:{
          tableData:[
        {
          title: '上塔柱',
          e: '',
          p: '',
          edit: true
        }, {
          title: '中塔柱',
          e: '',
          p: '',
          edit: true
        }, {
          title: '下塔柱',
          e: '',
          p: '',
          edit: true
        }, {
          title: '主梁',
          e: '',
          p: '',
          edit: true
        }, {
          title: '斜拉索',
          e: '',
          p: '',
          edit: true
        }
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
.left-form-m{
  position: absolute;
  left: 8%;
  bottom: 0;
  height: 100%;
  top: 10%;
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
.block-m{
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 50%;
  height: 60%;
  top: 5%;
}
</style>
