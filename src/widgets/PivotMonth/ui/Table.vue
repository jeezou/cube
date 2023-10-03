<template>
  <div style="display: flex; justify-content: space-between">
    <div class="table-wrapper">
      <table :class="{ loading: isLoading }">
        <thead>
          <tr>
            <td :colspan="20">
              <div class="input-wrapper">
                <div
                  v-for="field in fields.slice(0, 2)"
                  :key="field.title"
                  class="input"
                >
                  <TableInput
                    :field="field"
                    :onSubmit="handleSubmit"
                    :placeholder="field.title"
                    :isSelect="field.title === 'year'"
                    :isPivotExtraFields="true"
                    :required="required"
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr v-if="selectedMonths.length">
            <td />
            <td class="table-column-title" :colspan="12">
              Сумма по полю sales_value
            </td>
          </tr>
          <tr>
            <th v-if="!isDisabled" class="input-wrapper">
              <div class="input--short">
                <TableInput
                  :field="fields[2]"
                  :onSubmit="handleSubmit"
                  :placeholder="fields[2].title"
                  :isPivotExtraFields="true"
                />
              </div>
            </th>
            <th v-for="(sum, month) in total" :key="month">
              <span class="title">
                {{ month }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <div v-if="isLoading" class="loader">
            <Loader :size="150" :width="8" />
          </div>
          <tr v-for="(months, brand) in data">
            <template v-for="(sum, monthTitle, index) in data[brand]">
              <td v-if="index === 0">{{ brand }}</td>
              <td v-if="index === 0" v-for="monthSum in months">
                {{ (monthSum !== null && getFormattedNumber(monthSum)) || '' }}
              </td>
            </template>
          </tr>
        </tbody>
        <tfoot v-if="fields[1].value.length">
          <tr>
            <td>Общий итог</td>

            <template v-for="(sum, month) in total" :key="month">
              <td class="total-month">
                {{ sum && getFormattedNumber(sum) }}
              </td>
            </template>
          </tr>
        </tfoot>
      </table>
    </div>
    <v-btn @click="handleSubmit" :disabled="isDisabled"
      >Сформировать таблицу</v-btn
    >
  </div>
</template>

<script lang="ts" setup>
import { getFormattedNumber } from '~/src/shared/lib/getFormattedNumber'
import TableInput from '/src/features/TableInput/index.vue'
import '@mdi/font/css/materialdesignicons.css'
import { required } from '../model/usePivotMonth'
import { FieldType } from '~/src/features/TableInput/utils/types'
const { fields, data, total, onSubmit } = defineProps([
  'isLoading',
  'data',
  'fields',
  'brands',
  'total',
  'onSubmit',
  'handleEmptyField',
])
const selectedMonths = ref<string[]>(fields[1].value)

const handleSubmit = () => {
  if (isDisabled.value) return
  onSubmit()
}

watch(fields, () => (selectedMonths.value = fields[1].value), {
  deep: true,
})
watchEffect(() => (fields[2].value = fields[2].dictionary))
const isDisabled = computed(
  () =>
    !!fields.find(
      (field: FieldType) => field.title !== 'brands' && field.value.length === 0
    )
)
</script>

<style lang="scss" scoped>
@import '/src/app/global.scss';

table {
  .hide {
    display: none;
  }
  position: relative;
  display: block;
  overflow-x: auto;
  border-spacing: 0.5rem;

  & th {
    background-color: $secondary-color;
  }

  &.loading {
    opacity: 0.6;
  }

  & tbody td {
    text-align: center;
    padding: 1rem;
    font-size: 16px;
    background-color: #eff3fdce;
  }

  & thead {
    &:first-child {
      font-size: 12px;
      background-color: $secondary-color;
    }

    & .title,
    .table-column-title {
      color: white;
      padding-block: 1rem;
      font-size: 1rem;
      text-align: center;
    }

    & > :last-child {
      background-color: white;
    }

    & th {
      text-align: center;
    }

    &:first-of-type th:first-child.title {
      background-color: $secondary-color;
    }
    &:first-of-type th:last-child.title {
      background-color: $secondary-color;
    }
  }
  & tfoot {
    background-color: $secondary-color;
    color: white;
    & td {
      padding-block: 1rem;
      text-align: center;
    }
    tr:last-child td:first-child {
      border-bottom-left-radius: 1rem;
    }
    tr:last-child td:last-child {
      border-bottom-right-radius: 1rem;
    }
  }

  .empty {
    text-align: center;
    padding: 5rem;
    & span {
      font-size: 2rem;
    }
  }
  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
  }
  .input-wrapper {
    display: flex;
    gap: 0.51rem;
    background-color: white;
    .input {
      flex-grow: 1;
      min-width: 300px;

      &--short {
        width: 100%;
        max-width: 400px;
      }
    }
  }
  span {
    padding: 1.5rem;
  }
  .total-month {
    font-weight: 700;
  }
}
</style>
