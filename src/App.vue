<script setup>
import Header from "./components/common/Header.vue";
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <body>
    <Header />
    <RouterView />
  </body>
</template>

<style>
.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

@import url("https://fonts.googleapis.com/css2?family=Quicksand&display=swap");
body {
  height: 7vh;
  font-family: "Quicksand", sans-serif;
  margin: 0;
  border: 0px solid var(--el-border-color);
  min-height: 100vh;
  background-color: #a6dff2;
  background-image: radial-gradient(
      closest-side,
      #dfdfdf,
      rgba(235, 105, 78, 0)
    ),
    radial-gradient(closest-side, #0e4d90, rgba(243, 11, 164, 0)),
    radial-gradient(closest-side, #1a78da, rgba(254, 234, 131, 0)),
    radial-gradient(closest-side, #3eb5e0, rgba(170, 142, 245, 0)),
    radial-gradient(closest-side, #a6dff2, rgba(248, 192, 147, 0));
  background-size: 130vmax 130vmax, 80vmax 80vmax, 90vmax 90vmax,
    110vmax 110vmax, 90vmax 90vmax;
  background-position: -80vmax -80vmax, 60vmax -30vmax, 10vmax 10vmax,
    -30vmax -10vmax, 50vmax 50vmax;
  background-repeat: no-repeat;
  animation: 5s movement linear infinite;
}

@keyframes movement {
  0%,
  100% {
    background-size: 130vmax 130vmax, 80vmax 80vmax, 90vmax 90vmax,
      110vmax 110vmax, 90vmax 90vmax;
    background-position: -80vmax -80vmax, 60vmax -30vmax, 10vmax 10vmax,
      -30vmax -10vmax, 50vmax 50vmax;
  }
  25% {
    background-size: 100vmax 100vmax, 90vmax 90vmax, 100vmax 100vmax,
      90vmax 90vmax, 60vmax 60vmax;
    background-position: -60vmax -90vmax, 50vmax -40vmax, 0vmax -20vmax,
      -40vmax -20vmax, 40vmax 60vmax;
  }
  50% {
    background-size: 80vmax 80vmax, 110vmax 110vmax, 80vmax 80vmax,
      60vmax 60vmax, 80vmax 80vmax;
    background-position: -50vmax -70vmax, 40vmax -30vmax, 10vmax 0vmax,
      20vmax 10vmax, 30vmax 70vmax;
  }
  75% {
    background-size: 90vmax 90vmax, 90vmax 90vmax, 100vmax 100vmax,
      90vmax 90vmax, 70vmax 70vmax;
    background-position: -50vmax -40vmax, 50vmax -30vmax, 20vmax 0vmax,
      -10vmax 10vmax, 40vmax 60vmax;
  }
}

Header {
  opacity: 0;
}
</style>
