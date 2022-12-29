<template>
  <n-tabs class="card-tabs" type="line" default-value="1" size="large" animated>
    <n-tab-pane name="1" tab="用户列表">
      <UserList />
    </n-tab-pane>
    <n-tab-pane name="2" tab="组织架构管理">
      <Organization />
    </n-tab-pane>
  </n-tabs>
</template>
<script lang="ts" setup>
import UserList from "./components/UserList.vue";
import Organization from "./components/Organization.vue";
</script>
