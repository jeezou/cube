<template>
  <Select
    :items="items"
    :title="'Кол-во строк'"
    :updateValue="updateValue"
    :defaultSize="pageSize"
  />
</template>

<script lang="ts" setup>
import Select from './ui/SelectPageSize.vue'
const { updatePageSize } = defineProps(['pageSize', 'updatePageSize'])

const items = [
  { title: '5' },
  { title: '10' },
  { title: '50' },
  { title: '100' },
]

const updateValue = (newValue: number) => {
  updatePageSize(newValue)
}
</script>
