<template>
  <v-card>
    <v-toolbar
      :style="{
        backgroundColor: isColoring && activeTab === 1 ? '#fe8f66' : '#00dea3',
      }"
    >
      <v-tabs v-model="model" slider-color="white">
        <v-tab
          v-for="tab in tabs"
          :key="tabs.id"
          @click="$emit('changeTab', tab.id)"
        >
          {{ tab.title }}
        </v-tab>
      </v-tabs>
    </v-toolbar>
  </v-card>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const { tabs } = defineProps(['tabs', 'activeTab', 'isColoring'])
defineEmits(['changeTab'])
const model = ref(0)
</script>

<style lang="scss" scoped>
@import '/src/app/global.scss';

.v-toolbar {
  padding: 1rem;
  max-height: 80px;

  & .v-tab {
    max-height: 2rem;

    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
}
.v-card {
  border-radius: 1rem;
  margin-bottom: 1rem;
}
.v-btn {
  background-color: transparent;
  border-color: transparent;
}
</style>

<style land="scss"></style>
