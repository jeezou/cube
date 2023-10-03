<template>
  <div class="background" />
  <NavigationSideBar />
  <div class="container">
    <KeepAlive>
      <slot />
    </KeepAlive>
  </div>
  <notifications
    classes="notification"
    position="bottom right"
    :duration="8000"
    :width="380"
  />
</template>
<script lang="ts" setup>
import NavigationSideBar from '../features/NavigationSideBar/NavigationSideBar.vue'
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `CUBE | ${titleChunk}` : 'CUBE'
  },
})
</script>

<style lang="scss" scoped>
@import '/src/app/global.scss';

.background {
  position: fixed;
  inset: 0;
  min-width: 100vw;
  min-height: 100vh;
  background-image: url('/src/app/assets/lines.svg'),
    linear-gradient(to bottom right, #c1cff3d8, #00dea376);
  object-fit: cover;
}
.container {
  margin: 1rem;
  margin-left: 5rem;
}
</style>
