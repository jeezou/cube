<template>
  <v-card>
    <Table
      :total="total"
      :fields="fields"
      :brands="brands"
      :data="pivotContent"
      :onSubmit="onSubmit"
      :isLoading="isLoading"
    />
    <DownloadButton @onDownload="onDownload" :isDisabled="!queryBody" />
  </v-card>
</template>
<script lang="ts" setup>
import Table from './ui/Table.vue'
import DownloadButton from '/src/entities/DownloadPivotButton/index.vue'
import {
  total,
  fields,
  brands,
  pivotContent,
  onSubmit,
  onDownload,
  isLoading,
  queryBody,
} from './model/usePivotMonth'
import { loadDictionaries } from '~/src/features/loadDictionaries'
import { onMounted } from 'vue'

onMounted(async () => {
  loadDictionaries(fields.value)
})
</script>

<style lang="scss" scoped>
.v-card {
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 1rem;
}
</style>
