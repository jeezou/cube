<template>
  <v-card>
    <div class="wrapper">
      <v-card-title class="text-h6 text-md-h5 text-lg-h4"
        >Загрузка данных</v-card-title
      >
      <v-card-text v-if="!isLoading">
        Для загрузки используйте перенос файла или выберите файл из папки<br/><br/>
        Максиммальный размер файла: 40Мб<br/>
        Формат: .xlsx
      </v-card-text>
      <v-card-text v-else> Дождитесь загрузки файла </v-card-text>
      <FileDragnDrop
        v-if="!isLoading"
        @updateFile="updateFile"
        class="drag-n-drop"
      />
      <div v-else class="loader-wrapper">
        <Loader :size="100" :width="7" />
      </div>
      <v-btn @click="onUpload" :disabled="!file || isLoading"
        >Отправить файл</v-btn
      >
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import FileDragnDrop from '../../entities/FileDragnDrop/FileDragnDrop.vue'
import Loader from '/src/shared/Loader.vue'
import { uploadFile } from './utils/UploadFile'
import { ref } from 'vue'
import { XLSXFile } from './types'

import {useRouter} from 'vue-router'
const router = useRouter()

const file = ref<XLSXFile | null>(null)
const isLoading = ref(false)

const updateFile = (newFile: XLSXFile) => (file.value = newFile)
const setIsLoading = (value: boolean) => (isLoading.value = value)

const onUpload = async () => {
  if (!file.value) return
  const id = await uploadFile(file.value, setIsLoading)
  router.push(`/operations?id=${id}`)
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
  background-color: $primary-color;
}
</style>
