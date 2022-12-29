<template></template>

<script setup lang="ts">
import { useMessage, useDialog } from "naive-ui"

const NMessage = useMessage()
const NDialog = useDialog()

let loadingMessage: any = null

class Message {
  removeMessage() {
    if (loadingMessage) {
      loadingMessage.destroy()
      loadingMessage = null
    }
  }

  showMessage(type: any, content: any, option: any) {
    if (loadingMessage) {
      loadingMessage.destroy()
      loadingMessage = null
    }
    loadingMessage = NMessage[type](content, {
      ...option,
      duration: option.duration !== undefined ? option.duration : 1500,
    })
  }

  loading(content: any) {
    this.showMessage("loading", content, { duration: 0 })
  }

  success(content: any, callback = () => {}) {
    this.showMessage("success", content, {
      onLeave: () => {
        callback()
      },
    })
  }

  error(content: any, callback = () => {}) {
    this.showMessage("error", content, {
      onLeave: () => {
        callback()
      },
    })
  }

  info(content: any, callback: any) {
    this.showMessage("info", content, {
      onAfterLeave: () => {
        callback && callback()
      },
    })
  }

  warning(content: any, callback: any) {
    this.showMessage("warning", content, {
      onAfterLeave: () => {
        callback && callback()
      },
    })
  }
}
window.$message = new Message()
window.$dialog = NDialog
</script>
