<template>
  <v-card>
    <div class="wrapper">
      <v-card-title class="text-h6 text-md-h5 text-lg-h4"
        >Удаление данных</v-card-title
      >
      <v-card-text v-if="!isLoading">
        Для удаления используйте перенос файла или выберите файл из папки
      </v-card-text>
      <v-card-text v-else> Дождитесь удаления файла </v-card-text>
      <FileDragnDrop
        v-if="!isLoading"
        @updateFile="updateFile"
        class="drag-n-drop"
      />
      <div v-else class="loader-wrapper">
        <Loader :size="100" :width="7" />
      </div>
      <v-btn :disabled="!file || isLoading" @click="onUpload"
        >Удалить файл</v-btn
      >
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import FileDragnDrop from '../../entities/FileDragnDrop/FileDragnDrop.vue'
import Loader from '/src/shared/Loader.vue'
import { revertUploadFile } from './utils/RevertUploadFile'
import { ref } from 'vue'
import { XLSXFile } from './types'

const file = ref<XLSXFile | null>(null)
const isLoading = ref(false)

const updateFile = (newFile: XLSXFile) => (file.value = newFile)
const setIsLoading = (value: boolean) => (isLoading.value = value)

const onUpload = async () => {
  if (isLoading.value || !file.value) return
  await revertUploadFile(file.value, setIsLoading)
}
</script>

<style lang="scss" scoped>
@import '/src/app/global.scss';
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  gap: 2rem;

  & .drag-n-drop {
    translate: -15px 0px;
  }
}
.v-card {
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 1rem;
}
.v-btn {
  background-color: $error-color;
}
</style>
