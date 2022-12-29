<template>
  <div class="query">
    <n-tabs type="line" default-value="1" size="large" animated>
      <n-tab-pane name="1" tab="操作日志">
        <OperationsLog />
      </n-tab-pane>
      <n-tab-pane name="2" tab="函证日志">
        <CochainLog />
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script lang="ts" setup>
import OperationsLog from "./components/OperationsLog.vue";
import CochainLog from "./components/CochainLog.vue";
</script>

<style lang="scss" scoped>
</style>