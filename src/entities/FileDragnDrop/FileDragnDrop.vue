<template>
  <v-file-input
    @click="resetError"
    :label="getLabel()"
    :show-size="1000"
    :class="{ error: isError }"
    v-model="files"
    prepend-icon=""
    prepend-inner-icon="mdi-paperclip"
    hide-details
    variant="solo"
    flat
    enctype="multipart/form-data"
  >
    <template v-slot:selection="{ fileNames }">
      <template v-for="(fileName, index) in fileNames" :key="fileName">
        <v-chip v-if="index < 2" color="deep-purple-accent-4">
          {{ fileName }}
        </v-chip>
      </template>
    </template>
  </v-file-input>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
const emit = defineEmits(['updateFile'])
const files = ref<File[]>([])
const isError = ref(false)

const resetError = () => (isError.value = false)

const getLabel = () => {
  if (isError.value) return 'Файл должен быть в формате .xlsx'
  if (files.value.length) return 'Выбранный файл:'
  return 'Перетащите файл сюда'
}

watchEffect(() => {
  if (files.value[0]?.name.indexOf('.xlsx') === -1) {
    files.value = []
    isError.value = true
    emit('updateFile', null)
    return
  }
  resetError()
  emit('updateFile', files.value[0])
})
</script>

<style lang="scss">
.v-file-input {
  width: 500px;
  margin-left: 30px;

  & .v-input__control {
    min-height: 150px;
    border-radius: 1rem;
    border: 2px dashed #6200ea;
    padding: 5px;
    text-align: center;
  }
}
</style>
