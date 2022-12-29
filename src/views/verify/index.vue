<template></template>
<script lang="ts" setup>
import Verify from "@/api/verify"
const authorize = async () => {
  const res = await Verify.authorize({
    client_id: "conf-client",
    response_type: "code",
    scope: "message.read",
    redirect_uri: "http://10.0.1.126:5173",
  })
  console.log(res)
}
authorize()
</script>
<style lang="scss" scoped></style>
