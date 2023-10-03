<template>
  <div>
    <v-card>
      <v-layout>
        <v-navigation-drawer v-if="store.getUser" expand-on-hover rail>
          <v-list>
            <User />
          </v-list>

          <v-divider />

          <v-list density="compact" nav class="pages">
            <NuxtLink :to="page.path" v-for="page in pages" :key="page.title">
              <v-list-item
                v-if="
                  store?.getUser?.roles?.includes(Roles.admin) ||
                  page.path === '/filter'
                "
                :title="page.title"
                :value="page.title"
                :prependIcon="page.icon"
              />
            </NuxtLink>
          </v-list>
          <v-divider />
          <v-list class="logout">
            <v-list-item
              @click="handleLogout"
              :title="'Выйти из аккаунта'"
              :prependIcon="'mdi-login'"
            />
          </v-list>
          <v-divider />
        </v-navigation-drawer>
      </v-layout>
    </v-card>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '~/src/app/stores/userStore/store'
import { Roles } from '~/src/app/stores/userStore/types'
import { handleLogout } from './model/logout'
import User from './ui/User.vue'
import '@mdi/font/css/materialdesignicons.css'
const store = useUserStore()

const pages = [
  { title: 'Поиск по параметрам', icon: 'mdi-tab-search', path: '/filter' },
  {
    title: 'Загрузка данных',
    icon: 'mdi-file-upload-outline',
    path: '/uploading',
  },
  {
    title: 'Операции загрузки',
    icon: 'mdi-progress-upload',
    path: '/operations',
  },
  { title: 'Сводные таблицы', icon: 'mdi-table-pivot', path: '/pivot' },
]
</script>

<style lang="scss" scoped>
.v-card {
  z-index: 2000;
}
</style>

<style lang="scss">
@import '/src/app/global.scss';

.v-navigation-drawer {
  border-radius: 0 1rem 1rem 0;

  .router-link-exact-active .v-list-item {
    color: $primary-color;
  }
  .v-list-item--variant-text .v-list-item__overlay {
    background-color: $background-color;
  }
  .v-list-item--nav .v-list-item-title,
  .logout .v-list-item-title {
    font-size: 0.9rem;
  }
}
</style>
