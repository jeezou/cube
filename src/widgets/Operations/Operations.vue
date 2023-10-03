<script setup lang="ts">
  import OperationsTable from "~/src/widgets/Operations/features/OperationsTable.vue";

  import {
    operations,
    operationsResponse,
    size,
    page,
    loading,
    sorting,
    getFilteredOperations,
    intervalExactOperation,
    onDelete
  } from './model/OperationsTable'

  import { useRouter, useRoute } from 'vue-router'
  import { OperationItem } from "~/src/widgets/Operations/utils/types";
  import { clearInterval } from "timers";
  const router = useRouter()
  const route = useRoute()

  const interval = ref<any>(null)

  const onSelectOperation = (id: number) => {
    router.push({path: '/operations', query: {id: id}})
  }

  const onReset = async () => {
    await router.push('/operations')
    window.clearInterval(interval.value)
    await getFilteredOperations()
  }

  onMounted(async() => {
    await nextTick()
    if(route.query.id){
      loading.value = true
      interval.value = intervalExactOperation(route.query.id)
      setTimeout(() => loading.value = false, 2000)
    } else{
      await getFilteredOperations()
    }
  })

  onUnmounted(() => {
    window.clearInterval(interval.value)
  })

  watch(() => route.query.id, async (newId) =>{
    if(interval.value)
      window.clearInterval(interval.value)

    if(newId){
      loading.value = true
      interval.value = intervalExactOperation(route.query.id)
      setTimeout(() => loading.value = false, 2000)
    } else
      await getFilteredOperations()
  }, {deep: true})

  watch(() : OperationItem[] | null => operations.value, async(newOps : OperationItem[] | null) => {
    if(interval.value &&
      newOps?.length === 1 &&
      (newOps[0].status === 4 ||
        newOps[0].status == -1 ||
        newOps[0].status == -2 ||
        newOps[0].status == -3)){
      window.clearInterval(interval.value)
    }
  })

</script>

<template>
  <v-card class="operations-header">
    <v-card-title>{{ route.query.id ? `Информация по загрузке ID ${route.query.id}` : 'Операции по загрузке' }}</v-card-title>
    <v-btn @click="onReset" v-if="route.query.id">Сбросить</v-btn>
  </v-card>
  <v-card>
    <OperationsTable
      :operations="operations"
      :sorting="sorting"
      :is-single="route.query.id"
      @change-sorting="(s) => sorting = s"
      @select-operation="onSelectOperation"
      @on-delete="onDelete"
    />
    <v-pagination
      v-if="!route.query?.id"
      v-model="page"
      :length="Math.floor(operationsResponse?.totalElements/size || 0)"
      :total-visible="6"
    />
    <div class="operations-loader" v-if="loading">
      <Loader></Loader>
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
.v-card {
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  position: relative;
}

.operations-header{
  display: flex;
  align-items: center;
  column-gap: 12px;
}

.operations-loader{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;

  &:before{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(#fff, .4);
  }

  .loader-wrapper{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>