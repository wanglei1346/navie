<template>
  <div>
    <n-layout-header bordered class="layout-header">
      <div class="aside">
        <div class="logo"></div>
        <p class="title">函证系统</p>
      </div>
      <div class="user">
        <n-dropdown trigger="hover" :options="options">
          <div class="info">
            <n-avatar
              round
              size="small"
              :style="{
                color: '#fff',
                backgroundColor: 'transparent',
              }"
            >
              <n-icon>
                <Person />
              </n-icon>
            </n-avatar>
            <span>admin</span>
          </div>
        </n-dropdown>
      </div>
    </n-layout-header>
  </div>
</template>
<script lang="ts" setup>
import { Person } from "@vicons/ionicons5"

const options = [
  {
    label: "退出登录",
    key: "marina bay sands",
  },
]
</script>
<style lang="scss" scoped>
.layout-header {
  height: 64px;
  background-color: #0d4cee;
  color: #fff;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .aside {
    display: flex;
    align-items: center;
    .logo {
      width: 50px;
      height: 50px;
      border-radius: 50px;
      background-color: #fff;
    }
    .title {
      padding-left: 10px;
      font-size: 18px;
      font-weight: 900;
    }
  }
  .user {
    .info {
      display: flex;
      align-items: center;
    }
    span {
      font-size: 16px;
      font-family: SF Pro Display;
    }
  }
}
:deep(.n-layout-header.n-layout-header--bordered) {
  border-bottom: 0;
}
</style>
