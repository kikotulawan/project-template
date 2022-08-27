<template>
  <div
    class="w-screen h-screen bg-slate-200 grid place-items-center box-border p-4"
  >
    <div
      class="relative h-fit w-full max-w-sm md:max-w-lg bg-white p-10 lg:p-16 rounded-2xl animate__animated animate__slow animate__fadeIn"
    >
      <div class="flex justify-center mb-5">
        <img
          src="../../assets/images/PROJECT-LOGO.png"
          class="w-[100px] md:w-[130px]"
          alt=""
        />
      </div>
      <p class="text-md font-poppins text-center mb-2">SYSTEM TITLE</p>
      <hr />
      <div class="space-y-4 mt-5">
        <div class="relative">
          <input
            v-model="data.username"
            @keyup.enter="validate()"
            type="text"
            :disabled="isLoading"
            :class="
              isValidUsername
                ? 'border-gray-300 focus:border-blue-600'
                : 'border-red-500 focus:border-red-500'
            "
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-sm border-1 appearance-none focus:outline-none focus:ring-0 peer"
            placeholder=" "
            autofocus="true"
          />
          <label
            :class="
              isValidUsername
                ? 'text-gray-500 peer-focus:text-blue-600'
                : 'text-red-500 peer-focus:text-red-500'
            "
            class="absolute text-sm -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-1"
            >Username</label
          >
        </div>
        <span v-if="!isValidUsername" class="text-xs ml-1 text-red-500"
          >Username is required</span
        >
        <div class="relative">
          <input
            v-model="data.password"
            @keyup.enter="validate()"
            type="password"
            :disabled="isLoading"
            :class="
              isValidPassword
                ? 'border-gray-300 focus:border-blue-600'
                : 'border-red-500 focus:border-red-500'
            "
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-sm border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
            placeholder=" "
          />
          <label
            :class="
              isValidPassword
                ? 'text-gray-500 peer-focus:text-blue-600'
                : 'text-red-500 peer-focus:text-red-500'
            "
            class="absolute text-sm -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-1"
            >Password</label
          >
        </div>
        <span v-if="!isValidPassword" class="text-xs ml-1 text-red-500"
          >Password is required</span
        >
        <span v-if="isLoading" class="btn-loader"></span>
        <button
          v-if="!isLoading"
          @click="validate"
          class="bg-sky-500 text-white w-full py-2.5 rounded-md hover:bg-sky-700 transition-all"
        >
          Login
        </button>
        <router-link v-if="!isLoading" to="/register" class="text-sm"
          >Not a member?
          <span class="text-sky-500"
            >Create your account here</span
          ></router-link
        >
        <span
          v-if="isNotAuthorized"
          class="flex justify-center text-xs ml-1 text-red-500"
          >Sorry, your account is not authorized</span
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const toast = useToast();
const store = useStore();
const router = useRouter();
const data = ref({
  username: "",
  password: "",
});
const isValidUsername = ref(true);
const isValidPassword = ref(true);
const isNotAuthorized = ref(false);
const isLoading = ref(false);

watch(
  () => data.value.username,
  () => {
    data.value.username
      ? (isValidUsername.value = true)
      : (isValidUsername.value = false);
  }
);

watch(
  () => data.value.password,
  () => {
    data.value.password
      ? (isValidPassword.value = true)
      : (isValidPassword.value = false);
  }
);

async function validate() {
  !data.value.username && !data.value.password
    ? ((isValidUsername.value = false), (isValidPassword.value = false))
    : !data.value.username
    ? (isValidUsername.value = false)
    : !data.value.password
    ? (isValidPassword.value = false)
    : ((isValidUsername.value = true),
      (isValidPassword.value = true),
      await login());
}

async function login() {
  isLoading.value = true;
  const res = await store.dispatch("auth/login", data.value);
  res.status == 200
    ? router.push("/admin/dashboard")
    : (isNotAuthorized.value = true),
    (isLoading.value = false);
}
</script>
