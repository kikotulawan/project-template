<template>
  <aside class="w-64 h-screen fixed transition-all" aria-label="Sidebar">
    <div class="overflow-y-auto py-4 px-3 h-full bg-white border-r-[.5px]">
      <a href="https://flowbite.com/" class="flex justify-center mb-5">
        <span class="text-md font-semibold whitespace-nowrap font-poppins mt-5"
          >SYSTEM TITLE</span
        >
      </a>
      <div class="flex flex-col items-center px-10">
        <img
          class="my-3 rounded-[100%] object-fill"
          src="../../../assets/images/USER-LOGO.png"
          alt=""
        />
        <p class="p-0 m-0 font-poppins">Ezikiel Tulawan</p>
        <p class="p-0 m-0 text-xs font-bold font-poppins">Administrator</p>
      </div>
      <ul class="space-y-2 mt-10">
        <p class="ml-2 text-xs text-gray-400">Menu</p>
        <li>
          <router-link
            to="/admin/dashboard"
            :class="
              getRoute == 'AdminDashboard'
                ? 'bg-[#2c74f4] text-white'
                : 'hover:bg-gray-100 text-black'
            "
            class="flex items-center p-2 text-base font-normal rounded-lg transition-all"
          >
            <svg
              aria-hidden="true"
              :class="
                getRoute == 'AdminDashboard' ? 'text-white' : 'text-indigo-500'
              "
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
            </svg>
            <span class="ml-3 pt-[0.5px]">Dashboard</span>
          </router-link>
        </li>
        <!-- <p class="ml-2 text-xs text-gray-400 pt-5">More.....</p> -->
      </ul>
    </div>
  </aside>
</template>
<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const getRoute = computed(() => route.name);
</script>
