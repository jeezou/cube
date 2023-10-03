<template>
  <v-container>
    <v-row>
      <v-col>
        <v-select
          v-model="value"
          :items="items"
          :label="title"
          variant="outlined"
          density="compact"
          class="rounded"
          hide-details
          flat
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>
import { ref, watchEffect } from 'vue'

const { updateValue, defaultSize } = defineProps([
  'title',
  'items',
  'updateValue',
  'defaultSize',
])
const value = ref(defaultSize)

watchEffect(() => updateValue(value.value))
</script>

<style lang="scss" scoped>
.v-list-item-title {
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
}
.v-container {
  margin: 0;
  margin-left: 1rem;
  padding: 0;
  width: 180px;
}
.v-col {
  padding: 0;
}
</style>
<style>
.rounded.v-select .v-field {
  border-radius: 1rem;
}
</style>
