<template>
  <Table
    @setSortedField="setSortedField"
    @getField="getField"
    :fields="fields"
    :isLoading="isLoading"
    :sortedField="sortedField"
    :data="data"
    :onSubmit="onSubmit"
  />
</template>

<script lang="ts" setup>
import Table from './ui/index.vue'
import '@mdi/font/css/materialdesignicons.css'
import { onMounted } from 'vue'
const emit = defineEmits(['setSortedField', 'getField'])
const { onSubmit, fields } = defineProps([
  'data',
  'fields',
  'onSubmit',
  'sortedField',
  'emptyFields',
  'isLoading',
])

const setSortedField = (field: string) => {
  emit('setSortedField', field)
}

const getField = (field: string) => {
  emit('getField', field)
}

onMounted(async () => {
  await onSubmit()
})
</script>
