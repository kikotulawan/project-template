<template>
  <div class="transtion-all" id="app">
    <div
      v-if="isLoading"
      class="w-screen h-screen bg-slate-200 flex flex-col justify-center items-center animate__animated animate__fadeIn"
    >
      <span class="loader"></span>
    </div>
    <router-view v-else></router-view>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
const isLoading = ref(true);
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
});
</script>
