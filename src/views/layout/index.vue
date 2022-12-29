<template>
  <div>
    <n-layout content-style="background-color:#f1f1f1 ">
      <Header />
      <Menu />
      <n-layout-content :native-scrollbar="false" content-style="padding:20px">
        <router-view />
        <n-back-top :right="0" :bottom="80" style="z-index: 999" />
      </n-layout-content>
    </n-layout>
  </div>
</template>
<script lang="ts" setup>
import Header from "./components/Header.vue"
import Menu from "./components/Menu.vue"
</script>
<style lang="scss" scoped>
:deep(.n-layout-content) {
  height: calc(100vh - 152px);
  margin: 20px;
}
</style>
