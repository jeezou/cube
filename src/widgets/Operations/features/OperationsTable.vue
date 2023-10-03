<script setup lang="ts">
  import '@mdi/font/css/materialdesignicons.css'
  import { statusDict } from "~/src/widgets/Operations/features/static/statusDict";

  const props = defineProps(['operations', 'sorting', 'isSingle'])
  const emit = defineEmits(['changeSorting', 'onLoad', 'selectOperation', 'onDelete'])

  const changeSorting = () => {
    emit('changeSorting', props.sorting === 'ASC' ? 'DESC' : 'ASC')
  }

  const parseProgress = (progress: string) => {
    return parseInt(progress.slice(0, progress.length - 1))
  }
</script>

<template>
  <table class="operations-table">
    <thead>
      <tr>
        <th @click="changeSorting">
          ID
          <span class="sorting" ><v-icon :icon="sorting === 'ASC' ? 'mdi-sort-ascending' : 'mdi-sort-descending'" /></span>
        </th>
        <th>Имя файла</th>
        <th>Количество строк</th>
        <th>Статус</th>
        <th>Описание статуса</th>
        <th v-if="!isSingle"></th>
        <th v-if="!isSingle"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in operations" :key="`operation-${item}`">
        <td>{{ item.id }}</td>
        <td>{{ item.file_name }}</td>
        <td>{{ item.total_count }}</td>
        <td>
          {{ item.percent }}
          <div class="progress"
               :class="{'progress--error' : parseProgress(item.percent) < 100}"
               :style="{width: item.percent}"
          />
          <v-icon v-if="item.status == '-1' || item.status == '-2' || item.status == '-3' || item.status == '4'"
                  :icon="parseProgress(item.percent) < 100 ? 'mdi-alert-circle-outline' : 'mdi-check-outline'"
                  class="progress-icon"
          />
        </td>
        <td>
          {{ statusDict[item.status] }}
        </td>
        <td v-if="!isSingle">
          <v-btn v-if="item.status != 5" @click="emit('onLoad');emit('selectOperation', item.id)">Подробнее</v-btn>
        </td>
        <td v-if="!isSingle">
          <v-btn v-if="item.status != 5" class="delete" @click="emit('onDelete', item.id)">Удалить</v-btn>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss">
@import '/src/app/global.scss';


.operations-table{
  width: 100%;
  display: table;

  thead{

  }

  thead th{
    position: relative;

    .sorting{
      position: absolute;
      bottom: 0;
      right: 0;

      color: #fff;
      font-size: 18px;
    }
  }

  thead th{
    text-align: start;
    padding: 12px;
    background: $secondary-color !important;
    color: #fff;
    font-size: 18px;


  }

  tbody{
    td{
      padding: 6px;
      font-size: 14px;
      position: relative;

      .progress{
        position: absolute;
        height: 3px;
        bottom: 0;
        left: 0;
        background: $primary-color;
        max-width: 100%;

        &--error{
          background: red;
        }
      }

      .progress-icon{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 8px;
        font-size: 15px;
      }
    }

    .v-btn {
      display: block;
      margin-inline: auto;
      background-color: $primary-color;
      height: 28px;
      min-height: unset;
      border-radius: 8px;

      &.delete{
        background: rgba(red, .7);
      }

      &__content{
        font-size: 10px;
      }
    }
  }
}
</style>