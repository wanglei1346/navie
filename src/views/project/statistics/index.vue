<template>
  <div>
    <div class="statisticTotal">
        <div class="head">
          <div>
            <h3>函证统计概要</h3>
          </div>
          <div class="tab-style">
            <n-tabs type="segment" :default-value="active" :on-update:value="updateTab" size="small" justify-content="start">
              <n-tab-pane name="0" tab="全部"></n-tab-pane>
              <n-tab-pane name="1" tab="本月"></n-tab-pane>
              <n-tab-pane name="2" tab="本周"></n-tab-pane>
            </n-tabs>
          </div>
        </div>
      </div>
      <div class="cf">
        <div
          :class="['tab-total', item.boxBg]"
          v-for="(item, index) in totalData"
          :key="index"
        >
          <div class="tab-box">
            <div :class="['img', item.class]"></div>
            <div class="description">
              <p class="number">{{ item.num }}</p>
              <p class="text">{{ item.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="table">
      <div class="head">
        <h3>函证详情</h3>
        <div>
         
          <!-- <n-button quaternary type="info">
            查看明细
          </n-button> -->
        </div>
      </div>
      <static-table :tab="active" :prjId="(prjId as string)"></static-table>
      <!-- <n-button type="primary" @click="build"  style="margin:0px 20px;">全部打包</n-button> -->
      <!-- <n-button type="primary" @click="importData" style="margin:0px 20px;">导入数据</n-button> -->
      <!-- <n-button type="primary" @click="download">导出数据</n-button> -->
    </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from "vue"
import StaticTable from "./components/statisTable.vue"
import Project from "@/api/project"
import { useRouter, useRoute } from "vue-router"
const router = useRouter()
const route = useRoute()
 const state = reactive({
  active:'0',
  totalData: [
  {
    class:'img1',
    text:'已发函证',
    num:0,
    boxBg:'bg1'
  },
  {
    class:'img2',
    text:'已回函函证',
    num:0,
    boxBg:'bg2'
  },
  {
    class:'img3',
    text:'不符函证',
    num:0,
    boxBg:'bg3'
  },
  {
    class:'img4',
    text:'相符函证',
    num:0,
    boxBg:'bg4'
  },
  {
    class:'img5',
    text:'回函比例',
    num:0,
    boxBg:'bg5'
  },
 ]
 })

 const prjId = route.query.prjId
 const {active,totalData} = toRefs(state)

 

 const updateTab = (tab:string|number)=>{
  // 调用子页面方法
  state.active = String(tab)
  StaticsummaryUp()
 }
 
//  统计数据
const StaticsummaryUp = async()=>{
  const {data:{data,success}}= await Project.Staticsummary((prjId as string),Number(state.active))
  if(success){
    state.totalData[0].num =data.sendCount 
    state.totalData[1].num =data.replyCount 
    state.totalData[2].num =data.unMatchCount 
    state.totalData[3].num =data.matchCount 
    state.totalData[4].num =data.replyScale 
  } 
}
StaticsummaryUp()


const build = () => {

}
const importData = () => {}
const download = () => {}
</script>

<style lang="scss" scoped>
.table {
  margin-top: 30px;
  // .head{
  //   display:flex;
  //   just
  // }
}
.head {
  display: flex;
  justify-content: space-between;
  .tab-style {
    width: 10%;
  }
}

div.cf {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;

  .bg5 {
    background: linear-gradient(
      90deg,
      rgba(231, 210, 19, 1) 0%,
      rgba(231, 168, 19, 0.66) 100%
    );
    .img5 {
      background: url("../../../assets/icon/statistic/4.png") no-repeat;
    }
  }
  .bg4 {
    background: linear-gradient(
      90deg,
      rgba(104, 86, 214, 1) 0%,
      rgba(0, 122, 255, 0.66) 100%
    );
    .img4 {
      background: url("../../../assets/icon/statistic/5.png") no-repeat;
    }
  }
  .bg3 {
    background: linear-gradient(
      90deg,
      rgba(231, 19, 146, 1) 0%,
      rgba(231, 168, 19, 0.66) 100%
    );
    .img3 {
      background: url("../../../assets/icon/statistic/3.png") no-repeat;
    }
  }
  .bg2 {
    background: linear-gradient(
      90deg,
      rgba(36, 33, 238, 1) 0%,
      rgba(0, 122, 255, 0.66) 100%
    );
    .img2 {
      background: url("../../../assets/icon/statistic/statictis1.png") no-repeat;
    }
  }
  .bg1 {
    background: linear-gradient(
      90deg,
      rgba(96, 71, 194, 1) 0%,
      rgba(88, 86, 214, 0.66) 100%
    );
    .img1 {
      background: url("../../../assets/icon/statistic/6.png") no-repeat;
    }
  }
  .tab-total {
    width: 18%;
    height: 130px;

    .tab-box {
      padding: 20px 40px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      height: 100%;
    }
    .img {
      width: 100px;
      height: 80px;

      background-size: contain;
    }
    .description {
      color: white;
      font-size: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .number {
        font-size: 25px;
        font-weight: 600;
      }
    }
  }
}
</style>
