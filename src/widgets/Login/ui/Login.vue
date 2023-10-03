<template>
  <div class="login-wrapper">
    <v-card :disabled="isLoading">
      <v-card-title class="text-lg-h4">Вход</v-card-title>
      <v-text-field
        @keyup.enter="onLogin"
        :rules="[required]"
        v-model="user.username"
        label="Имя пользователя"
        variant="outlined"
        prependInnerIcon="mdi-account-outline"
      />
      <v-text-field
        @click:appendInner="showPassword = !showPassword"
        @keyup.enter="onLogin"
        :rules="[required]"
        :appendInnerIcon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        v-model="user.password"
        label="Пароль"
        variant="outlined"
        prependInnerIcon="mdi-lock-outline"
      />
      <v-btn @click="onLogin" :disabled="isDisabled">Войти</v-btn>
    </v-card>
    <div v-if="isLoading" class="login-wrapper__loader">
      <Loader :size="150" :width="8" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import '@mdi/font/css/materialdesignicons.css'
import Loader from '/src/shared/Loader.vue'
import { watchEffect } from 'vue'
import {
  user,
  onLogin,
  required,
  isLoading,
  isDisabled,
  setIsDisabled,
  showPassword,
} from '../model/login'
watchEffect(() => {
  if (user.value.username && user.value.password) {
    return setIsDisabled(false)
  }
  setIsDisabled(true)
})
</script>

<style lang="scss" scoped>
@import '/src/app/global.scss';
.login-wrapper {
  display: inline-block;
  position: relative;
  width: 100%;
  height: calc(100vh - 2rem);

  &__loader {
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
  }
}
.v-card {
  position: relative;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  padding: 2rem;
  border-radius: 1rem;
  max-width: 500px;

  & > .v-input {
    margin-top: 1rem;
  }
  & .v-btn {
    display: block;
    margin-inline: auto;
    margin-top: 1rem;
    background-color: $primary-color;
  }
}
</style>
