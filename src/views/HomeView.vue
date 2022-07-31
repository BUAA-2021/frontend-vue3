<script setup>
// import TheWelcome from '@/components/TheWelcome.vue'
import { useStateStore } from '@/stores/state';
const state = useStateStore();

</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
