<template>
  <div :title="getFieldValue(field)?.toString()">
    <v-combobox
      v-if="(field.dictionary && !isSelect)"
      v-model="field.value"
      @keyup.enter="onSubmit"
      @click:clear="clearExtraFields(true)"
      @update:modelValue="($event: string[]) => handleSelect($event)"
      :items="field.dictionary"
      :label="placeholder"
      :rules="[required]"
      :hide-no-data="false"
      :menu-props="{ width: '300px' }"
      no-data-text="Нет данных"
      class="filter-input"
      variant="outlined"
      menu-icon=""
      ref="fieldRef"
      clearable
      hide-details
      multiple
    >
      <template v-slot:prepend-item v-if="field.dictionary.length">
        <template v-if="isExtraFields">
          <ExtraFields
            :field="field"
            :isEmpty="isEmpty"
            :isFilled="isFilled"
            :toggleEmpty="toggleEmpty"
            :toggleFilled="toggleFilled"
          />
        </template>
        <template v-if="isPivotExtraFields">
          <v-list-item :title="PivotExtraField.all" @click="toggleAll" />
          <v-list-item :title="PivotExtraField.reset" @click="toggleReset" />
          <v-divider class="mt-2"></v-divider>
        </template>
      </template>
    </v-combobox>
    <v-select
      v-else-if="isSelect"
      @keyup.enter="onSubmit"
      :items="field.dictionary"
      :label="placeholder"
      :rules="[required]"
      v-model="field.value"
      no-data-text="Нет данных"
      class="filter-input"
      variant="outlined"
      :clearable="isClearable"
      hide-details
    />
    <v-text-field
      v-else
      @keyup.enter="onSubmit"
      @update:modelValue="
        ($event: string) => {
          field.value = validateField(field, $event)
          setInfoMessage(field, $event)
        }
      "
      :value="field.value"
      :disabled="field.disabled"
      class="filter-input"
      variant="outlined"
      hide-details
    />
  </div>
  <InfoMessage
    v-for="message in infoMessages"
    :message="message.fieldTitle === field.title && message.message"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from "vue-router";
import {
  getFieldValue,
  validateField,
  formValidationMessage,
} from './utils/fieldGetters'
import { FieldType, PivotExtraField } from './utils/types'
import { ExtraField } from './features/ExtraFields/libs/types'
import ExtraFields from './features/ExtraFields/index.vue'
const { field, onSubmit } = defineProps([
  'field',
  'required',
  'onSubmit',
  'placeholder',
  'isExtraFields',
  'isPivotExtraFields',
  'isSelect',
  'isClearable',
  'isFilter',
])

const route = useRoute()

const infoMessages = ref<{ fieldTitle: string; message: string }[]>([])
const isEmpty = ref(false)
const isFilled = ref(false)

const fieldRef = ref(null)

const setInfoMessage = (field: FieldType, eventValue: string) => {
  const message = formValidationMessage(field, eventValue)
  if (message) {
    infoMessages.value.push({ fieldTitle: field.title, message })
  }
}

const clearMessage = () => {
  infoMessages.value.shift()
}

const toggleEmpty = () => {
  field.value = [ExtraField.empty]
  isEmpty.value = !isEmpty.value
  isFilled.value = false
  onSubmit()
}

const toggleFilled = () => {
  field.value = [ExtraField.filled]
  isFilled.value = !isFilled.value
  isEmpty.value = false
  onSubmit()
}

const toggleAll = () => {
  field.value = field.dictionary
  onSubmit()
}

const toggleReset = () => {
  field.value = []
  onSubmit()
}

const clearExtraFields = (isReload: boolean = false) => {
  field.value = []
  isEmpty.value = false
  isFilled.value = false
  if (isReload) onSubmit()
}

const handleSelect = ($event: string[]) => {
  field.value = $event

  if (!Array.isArray($event)) {
    return (field.value = $event)
  }
  if (!field.dictionary.includes($event[$event.length - 1])) {
    return (field.value = $event.pop())
  }
  clearExtraFields()
  field.value = $event

  if ($event.includes(ExtraField.empty) || $event.includes(ExtraField.filled)) {
    field.value.shift() //очищает первое значение в передаваемом событии, так как оно не успевает очиститься само
  }
}

setInterval(() => {
  clearMessage()
}, 2000)

watch(() => field.dictionary, async (newDictionary) => {
  await nextTick()
  if(fieldRef.value && route.path === '/filter') {
    //@ts-ignore
    fieldRef.value.menu = true
  }
})
</script>
