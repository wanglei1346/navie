<template>
  <n-layout-header>
    <n-menu
      v-model:value="activeKey"
      mode="horizontal"
      :options="menuOptions"
      class="layout-menu"
    />
  </n-layout-header>
</template>
<script lang="ts" setup>
import { h, ref, Component } from "vue"
import { useRouter, useRoute, RouterLink } from "vue-router"
import { NIcon } from "naive-ui"
import type { MenuOption } from "naive-ui"
const router = useRouter()
const route = useRoute()
const menuOptions: MenuOption[] = router.options.routes
  .filter((menu) => {
    return !menu.meta?.hidden
  })
  .map((menu) => {
    return {
      label: () =>
        h(
          RouterLink,
          {
            to: {
              path: menu.path,
            },
          },
          { default: () => menu.meta?.title as string }
        ),
      key: menu.name as string,
      children:
        menu.meta?.type === "grop"
          ? menu.children?.map((child) => {
              return {
                label: () =>
                  h(
                    RouterLink,
                    {
                      to: {
                        path: child.path,
                      },
                    },
                    { default: () => child.meta?.title as string }
                  ),
                key: child.name as string,
              }
            })
          : undefined,
    }
  })
const activeKey = ref<string>(route.matched[0].name as string)

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
</script>
<style lang="scss" scoped>
:deep(.layout-menu) {
  height: 48px;
}
:deep(a.router-link-active::before) {
  background-color: rgba(236, 242, 254, 1);
  z-index: -1;
}
:deep(.n-menu.n-menu--horizontal
    .n-menu-item-content.n-menu-item-content--selected) {
  border-bottom: 0 !important;
}
:deep(.n-menu.n-menu--horizontal .n-menu-item-content) {
  border-bottom: 0 !important;
}
:deep(.n-menu.n-menu--horizontal .n-menu-item) {
  height: 100%;
}
:deep(.n-menu .n-submenu .n-menu-item-content) {
  height: 100%;
}
</style>
