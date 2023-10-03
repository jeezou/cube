<template>
  <Transition name="fade">
    <v-card class="message-wrapper" v-if="message">
      <span>
        {{ message }}
      </span>
    </v-card>
  </Transition>
</template>
<script lang="ts" setup>
defineProps(['message'])
</script>

<style lang="scss" scoped>
.message-wrapper {
  z-index: 1;
  position: absolute;
  top: -2rem;
  padding: 0.5rem;
  min-width: 200px;
  text-wrap: balance;
  opacity: 0.85;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease-out;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}
</style>
