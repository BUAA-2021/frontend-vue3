<template>
  <button @click="pre" class="previous round">&#8249;</button>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const pre = () => {
  router.go(-1);
};
</script>

<style>
button {
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  padding: 8px 16px;
  margin-top: "-20px";
}

button:hover {
  background-color: #ddd;
  color: black;
}

.previous {
  background-color: #f1f1f1;
  color: black;
}

.next {
  background-color: #4caf50;
  color: white;
}

.round {
  border-radius: 50%;
  height: "30px";
  width: auto;
}
</style>
