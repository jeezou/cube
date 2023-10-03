<template>
  <div style="display: flex; justify-content: space-between">
    <div class="table-wrapper">
      <table :class="{ loading: isLoading }">
        <thead>
          <tr>
            <td>
              <div class="input-wrapper">
                <div v-for="field in fields" :key="field.title" class="input">
                  <TableInput
                    :field="field"
                    :onSubmit="onSubmit"
                    :placeholder="field.title"
                    :isSelect="field.title === 'year'"
                    :isClearable="field.title === 'year'"
                    :isPivotExtraFields="true"
                  />
                </div>
              </div>
            </td>
            <td class="table-column-title" :colspan="2">
              Сумма по полю sales_value
            </td>
          </tr>
          <tr v-if="total">
            <template v-for="title in initialTitles" :key="title">
              <th class="px-1 title">
                <span class="title">{{ title }}</span>
              </th>
            </template>
          </tr>
        </thead>

        <tbody>
          <div v-if="isLoading" class="loader">
            <Loader :size="150" :width="8" />
          </div>
          <template v-for="(group, grpName2, index) in data" :key="row">
            <tr v-for="(row, index) in group" :key="index">
              <td :class="{ hide: index !== 0 }">
                {{ grpName2 }}
              </td>
              <td>{{ row.brand }}</td>
              <td>{{ row.sum ? getFormattedNumber(row.sum) : '' }}</td>
            </tr>
          </template>
        </tbody>
        <tfoot v-if="total">
          <tr>
            <td>Общий итог</td>

            <td :colspan="2" class="total">
              {{ total ? getFormattedNumber(total) : '' }}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <v-btn @click="onSubmit">Сформировать таблицу</v-btn>
  </div>
</template>

<script lang="ts" setup>
import { getFormattedNumber } from '~/src/shared/lib/getFormattedNumber'
import TableInput from '/src/features/TableInput/index.vue'
import { initialTitles } from '../utils/initialTitles'
import '@mdi/font/css/materialdesignicons.css'
const { fields, data, total } = defineProps([
  'isLoading',
  'data',
  'fields',
  'total',
  'onSubmit',
  'handleEmptyField',
])
</script>

<style lang="scss" scoped>
@import '/src/app/global.scss';

table {
  position: relative;
  display: block;
  overflow-x: auto;
  border-spacing: 0.5rem;

  & td,
  & th {
    min-width: 5rem;
    max-width: 300px;
  }

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
  .hide {
    color: transparent;
  }
  .total {
    text-align: right;
    padding-right: 1.5rem;
    font-weight: 700;
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
      min-width: 100px;
    }
  }
}

span {
  font-size: 14px;
  padding: 1.5rem;
}
</style>
