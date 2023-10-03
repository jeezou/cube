<template>
  <div class="button-wrapper">
    <v-btn @click="$emit('onDownload')" :disabled="isDisabled"
      >Скачать отчёт</v-btn
    >
  </div>
</template>
<script lang="ts" setup>
defineProps<{ isDisabled: boolean }>()
</script>

<style lang="scss" scoped>
@import '/src/app/global.scss';
.button-wrapper {
  margin-block: 1.4rem;
  width: 100%;
}
.v-btn {
  display: block;
  margin-inline: auto;
  background-color: $primary-color;
}
</style>
