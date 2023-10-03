<template>
  <v-card>
    <Table
      :total="total"
      :fields="fields"
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
  pivotContent,
  onSubmit,
  onDownload,
  isLoading,
  queryBody,
} from './model/usePivotLname'
import { onMounted } from 'vue'
import { loadDictionaries } from '~/src/features/loadDictionaries'

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
