<template>
  <TabsBar :tabs="tabs" @changeTab="changeTab" :activeTab="activeTab" />
  <Transition name="fade" mode="out-in">
    <component :is="tabs[activeTab].component" :key="activeTab" />
  </Transition>
</template>

<script lang="ts" setup>
useHead({
  title: 'Сводные',
})
import TabsBar from '/src/shared/TabsBar.vue'
import PivotLname from '/src/widgets/PivotLname/index.vue'
import PivotGroup from '/src/widgets/PivotGroup/index.vue'
import PivotMonth from '/src/widgets/PivotMonth/index.vue'

const activeTab = ref(0)

const tabs = [
  { id: 0, title: 'По месяцам', component: PivotMonth },
  { id: 1, title: 'По группам', component: PivotGroup },
  { id: 2, title: 'По lname', component: PivotLname },
]

const changeTab = (id: number) => {
  activeTab.value = id
}
</script>
