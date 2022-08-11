<template>
  <Header v-if="route.name!='prototypePreview'"/>
  <router-view/>
</template>

<script setup>
import {useRouter ,useRoute} from 'vue-router';
const route = useRoute();
</script>

<style>

</style>