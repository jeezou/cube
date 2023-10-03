<template>
  <v-card>
    <Panel
      @setIsDownload="setIsDownload"
      :onDownload="onDownload"
      :updatePageSize="updatePageSize"
      :isDownload="isDownload"
      :pageSize="pageSize"
      :query="query"
      :total="total"
      :filteredContent="filteredContent"
    />
  </v-card>
  <v-card>
    <GenerateTable
      @setSortedField="setSortedField"
      @getField="getField"
      :fields="fields"
      :data="filteredContent"
      :onSubmit="onSubmit"
      :sortedField="sortedField"
      :isLoading="isLoading"
    />
  </v-card>
  <Pagination
    @updatePage="updatePageIndex"
    :total="total.pages"
    :activePage="activePage"
    :isDisabled="isDownload"
  />
</template>
<script lang="ts" setup>
import Panel from './features/FilterTablePanel/index.vue'
import GenerateTable from './features/GenerateTable/GenerateTable.vue'
import Pagination from '/src/entities/Pagination/Pagination.vue'

import {
  fields,
  isLoading,
  isDownload,
  pageSize,
  query,
  total,
  filteredContent,
  sortedField,
  activePage,
  onSubmit,
  onDownload,
  updatePageIndex,
  updatePageSize,
  setIsDownload,
  setSortedField,
  getField,
} from './model/useFilterTable'
</script>

<style lang="scss" scoped>
.v-card {
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 1rem;
}
</style>
