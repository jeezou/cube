<template>
  <div class="loader-wrapper">
    <v-progress-circular
      :size="size || 40"
      :width="width || 5"
      :color="color || '#6200ea'"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script setup lang="ts">
defineProps(['size', 'width', 'color'])
</script>
