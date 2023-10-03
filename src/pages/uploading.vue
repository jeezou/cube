<template>
  <TabsBar
    @changeTab="changeTab"
    :tabs="tabs"
    :activeTab="activeTab"
    :isColoring="true"
  />
  <Transition name="fade" mode="out-in">
    <component :is="tabs[activeTab].component" :key="activeTab" />
  </Transition>
</template>

<script lang="ts" setup>
useHead({
  title: 'Загрузка',
})
import TabsBar from '/src/shared/TabsBar.vue'
import UploadingFile from '/src/widgets/UploadingFile/UploadingFile.vue'
import RemoveFile from '/src/widgets/RemoveFile/RemoveFile.vue'

const activeTab = ref(0)

const tabs = [
  { id: 0, icon: 'upload', title: 'Загрузка', component: UploadingFile },
  // { id: 1, icon: 'remove', title: 'Удаление', component: RemoveFile },
]

const changeTab = (id: number) => {
  activeTab.value = id
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease-out;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}
</style>
