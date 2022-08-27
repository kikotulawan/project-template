<template>
 <div class="w-screen h-screen transition-all bg-white">
  <Sidenav class="animate__animated animate__animated animate__fadeInLeft animate__faster" />
  <div class="ml-[256px] transition-all">
   <router-view name="AdminDashboard" />
  </div>
 </div>
</template>
<script setup>
 import Sidenav from "./components/Sidenav.vue";
</script>
