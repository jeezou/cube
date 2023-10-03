<template>
  <div class="table-wrapper" ref="tableWrapper">
    <div class="shadow shadow--left" ref="shadowLeft"></div>
    <div class="shadow shadow--right" ref="shadowRight"></div>
    <table ref="table" :class="{ loading: isLoading }">
      <thead>
        <tr>
          <th
            @click="$emit('setSortedField', field.title)"
            v-for="field in fields"
            :key="field.title"
            :class="{ 'sticky-column': field.title === 'id' }"
            class="px-1 title"
          >
            <span class="title">{{ field.title }}</span>
            <v-icon
              :icon="getSortIcon(field.title, sortedField)"
              :class="{ '--show': sortedField?.field === field.title }"
              class="sort-icon"
            ></v-icon>
          </th>
        </tr>
        <tr>
          <th
            v-for="(field, index) in fields"
            :key="field.title"
            :class="{ 'sticky-column': field.title === 'id' }"
            @click="onGetField(field.title)"
          >
            <TableInput
              :field="field"
              :onSubmit="onSubmit"
              :isExtraFields="true"
              :is-filter="true"
            />
          </th>
        </tr>
      </thead>
      <div v-if="data !== null && data.length === 0">
        <div class="empty">
          <span>Данных не обнаружено </span>
        </div>
      </div>
      <tbody v-else>
        <tr v-for="row in data" :key="row.id">
          <td
            v-for="field in fields"
            :key="field.title"
            :class="{
              'sticky-column': field.title === 'id',
            }"
            class="px-1"
          >
            {{ row[field.title] }}
          </td>
        </tr>
      </tbody>
      <div v-if="isLoading" class="loader">
        <Loader :size="150" :width="8" />
      </div>
    </table>
  </div>
</template>

<script lang="ts" setup>
import TableInput from '~/src/features/TableInput/index.vue'
import '@mdi/font/css/materialdesignicons.css'
import { ref, onMounted } from 'vue'
import { getSortIcon } from '../utils/fieldGetters'
const emit = defineEmits(['setSortedField', 'getField'])
defineProps([
  'isLoading',
  'fields',
  'data',
  'onSubmit',
  'sortedField',
  'handleEmptyField',
])

const table = ref()
const tableWrapper = ref()
const shadowLeft = ref()
const shadowRight = ref()

const onGetField = (field: string) => {
  if(field !== 'id' && field !== 'sales_item' && field !== 'sales_value' && field !== 'purse_value')
    emit('getField', field)
}

onMounted(() => {
  if (
    !shadowLeft ||
    !shadowRight.value ||
    !table.value ||
    !tableWrapper.value
  ) {
    return
  }

  table.value.addEventListener('scroll', () => {
    const scrollLeft = table.value.scrollLeft
    const contentScrollWidth =
      table.value.scrollWidth - tableWrapper.value.offsetWidth
    const currentScroll = scrollLeft / contentScrollWidth
    shadowLeft.value.style.opacity = currentScroll
    shadowRight.value.style.opacity = 1 - currentScroll
  })
})
</script>

<style lang="scss">
@import '/src/app/global.scss';

table {
  position: relative;
  display: block;
  overflow-x: auto;
  border-radius: 2rem;
  border-spacing: 0.5rem;
  & .sticky-column {
    z-index: 100;
    position: sticky;
    left: 0;
  }

  & td,
  & th {
    min-width: 5rem;
  }

  &.loading {
    opacity: 0.6;
  }

  & tbody td {
    font-size: 12px;
    background-color: #eff3fdce;
  }

  & thead {
    &:first-child {
      font-size: 12px;
      background-color: $secondary-color;
    }

    & .title {
      color: white;
      padding-block: 1rem;
      &:hover {
        cursor: pointer;
      }
    }

    & > :last-child {
      background-color: white;
    }

    & .sort-icon {
      position: absolute;
      right: 0;
      bottom: 0;
      visibility: hidden;
      &.--show {
        visibility: visible;
      }
    }

    & th {
      position: relative;
      text-align: center;
      &:hover {
        .sort-icon {
          visibility: visible;
        }
      }
    }

    &:first-of-type th:first-child.title {
      background-color: $secondary-color;
    }
  }
  tr:first-child th:first-child {
    border-top-left-radius: 1rem;
  }
  tr:first-child th:last-child {
    border-top-right-radius: 1rem;
  }
  tr:last-child td:first-child {
    border-bottom-left-radius: 1rem;
  }
  tr:last-child td:last-child {
    border-bottom-right-radius: 1rem;
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
}

span {
  font-size: 14px;
}

.table-wrapper {
  position: relative;
}

.shadow {
  position: absolute;
  z-index: 100;
  width: 1.5rem;
  height: calc(100% - 2.1rem);
  top: 0.5rem;
}

.shadow--left {
  left: 5rem;
  background: -webkit-linear-gradient(90deg, rgba(0, 0, 0, 0.35), transparent);
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.35), transparent);
  opacity: 0;
}

.shadow--right {
  right: 0;
  background: -webkit-linear-gradient(-90deg, rgba(0, 0, 0, 0.35), transparent);
  background: linear-gradient(-90deg, rgba(0, 0, 0, 0.35), transparent);
  border-top-right-radius: 1rem;
}
</style>
