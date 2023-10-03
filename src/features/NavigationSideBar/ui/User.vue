<template>
  <v-list-item
    :title="store?.getUser?.username || ''"
    prependIcon="mdi-account-outline"
  />
</template>
<script lang="ts" setup>
import { useUserStore } from '~/src/app/stores/userStore/store'
import '@mdi/font/css/materialdesignicons.css'
const store = useUserStore()
</script>

<style lang="scss">
.v-list-item .v-list-item-title {
  font-size: 1.2rem;
}
</style>
