<template>
  <div class="text-center" v-if="total !== 0">
    <v-container>
      <v-row justify="center">
        <v-col cols="4">
          <v-container class="max-width">
            <v-pagination
              v-model="page"
              :length="total"
              class="my-4"
              @click="$emit('updatePage', page)"
              :disabled="isDisabled"
            />
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import '@mdi/font/css/materialdesignicons.css'
import { ref } from 'vue'
const { activePage } = defineProps(['total', 'activePage', 'isDisabled'])
const page = ref(activePage)
</script>

<style lang="scss" scoped>
.v-container {
  padding: 0;
}
.v-col {
  padding: 0;
}
</style>
