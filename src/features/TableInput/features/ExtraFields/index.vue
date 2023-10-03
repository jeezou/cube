<template>
  <v-list-item :title="ExtraField.empty" @click="toggleEmpty">
    <template v-slot:prepend>
      <v-checkbox-btn :model-value="isEmpty" />
    </template>
  </v-list-item>
  <v-list-item :title="ExtraField.filled" @click="toggleFilled">
    <template v-slot:prepend>
      <v-checkbox-btn :model-value="isFilled" />
    </template>
  </v-list-item>
  <v-divider class="mt-2"></v-divider>
</template>
<script lang="ts" setup>
import { ExtraField } from './libs/types'
defineProps(['field', 'isEmpty', 'isFilled', 'toggleEmpty', 'toggleFilled'])
</script>

<style lang="scss" scoped></style>
