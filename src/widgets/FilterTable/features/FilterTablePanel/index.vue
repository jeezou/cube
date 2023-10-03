<template>
  <header class="header">
    <div class="header__left-buttons">
      <SelectPageSize
        :pageSize="pageSize"
        :updatePageSize="updatePageSize"
        :class="{ isDisabled: isDownload }"
      />
      <v-btn @click="onReset()">Очистить фильтры</v-btn>
    </div>
    <div class="header__total-wrapper">
      <div>
        SUMM salesItem:
        <span class="header__total-wrapper__number">
          {{ getFormattedNumber(total.salesItem, true) }}</span
        >
      </div>
      <div>
        SUMM salesValue:
        <span class="header__total-wrapper__number">
          {{ getFormattedNumber(total.salesValue) }}</span
        >
      </div>
      <div>
        SUMM purseValue:
        <span class="header__total-wrapper__number">
          {{ getFormattedNumber(total.purseValue) }}
        </span>
      </div>
    </div>
    <div class="header__download-wrapper">
      <div>
        Найдено записей:
        <span class="header__total-wrapper__number">
          {{ getFormattedNumber(total.elements, true) }}
        </span>
      </div>
      <v-btn @click="onDownload" :class="{ disabled: isDownload }">
        <Loader
          v-if="isDownload"
          class="header__download-wrapper__loader"
          :width="2"
          :size="25"
        />
        Скачать результат</v-btn
      >
    </div>
  </header>
</template>
<script lang="ts" setup>
import { getFormattedNumber } from '~/src/shared/lib/getFormattedNumber'
import { onReset } from '../../model/useFilterTable'
const { isDownload } = defineProps([
  'isDownload',
  'pageSize',
  'updatePageSize',
  'onDownload',
  'total',
  'filteredContent',
])
</script>

<style lang="scss" scoped>
@import '/src/app/global.scss';
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  &__left-buttons {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  &__total-wrapper {
    display: flex;
    justify-content: space-between;

    &__number {
      color: $secondary-color;
    }
    & > :not(:last-child) {
      border-right: 1px solid $secondary-color;
    }
    & > div {
      padding-inline: 1rem;
    }
  }

  &__download-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    gap: 2rem;

    &__loader {
      position: absolute;
    }
  }
}
</style>
