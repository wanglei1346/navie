<template>
  <n-config-provider
    :theme-overrides="themeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
    style="height: 100%"
  >
    <n-loading-bar-provider>
      <router-view />
    </n-loading-bar-provider>
  </n-config-provider>
  <n-dialog-provider>
    <n-message-provider>
      <MessageApi />
    </n-message-provider>
  </n-dialog-provider>
</template>
<script setup lang="ts">
import MessageApi from "./components/MessageApi.vue"
import DevicePixelRatio from "./utils/devicePixelRatio"
import {
  NConfigProvider,
  GlobalThemeOverrides,
  NMessageProvider,
  zhCN,
  dateZhCN,
  NDialogProvider,
  NLoadingBarProvider,
} from "naive-ui"
const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: "#0052D9",
    primaryColorHover: "#0052D9",
  },
}
new DevicePixelRatio().init()
</script>
<style scoped></style>
