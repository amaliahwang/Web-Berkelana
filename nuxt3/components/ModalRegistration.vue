<script setup>
defineProps(["isShow"]);
import { ref } from "vue";
import { useWebsiteStore } from "@/stores/website";
import { showToastFunction } from "@/helpers/Toast";

const WebsiteStore = useWebsiteStore();
const showPassword = ref(false);
const isErrorRegister = ref(false);
const statusErrorRegister = ref("");
const inputUsername = ref("");
const inputEmail = ref("");
const inputPassword = ref("");

const onRegister = async () => {
  WebsiteStore.showLoader = true;
  try {
    await $fetch(`https://api.amarafiif.my.id/api/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: inputUsername.value,
        email: inputEmail.value,
        password: inputPassword.value,
      }),
    });

    showPassword.value = false;
    isErrorRegister.value = false;
    statusErrorRegister.value = "";
    inputUsername.value = "";
    inputEmail.value = "";
    inputPassword.value = "";

    showToastFunction("success", "Selamat, pendaftaran akun Anda berhasil!");
    WebsiteStore.showModalRegistration = false;
  } catch (Error) {
    isErrorRegister.value = true;
    statusErrorRegister.value =
      "Terjadi kesalahan pada pendaftaran, gunakan Username atau Email lain";
    console.error("There was a problem with the fetch operation:", Error);
  } finally {
    WebsiteStore.showLoader = false;
  }
};
</script>
<template>
  <div
    class="h-screen w-screen fixed top-0 left-0 z-[60] items-center justify-center"
    :class="isShow ? 'flex' : 'hidden'"
    style="background-color: rgba(21, 25, 34, 0.75)"
    @click="WebsiteStore.onModalRegister('close')"
  >
    <div
      id="modal-signup"
      class="w-[96%] max-w-[400px] bg-white rounded-lg"
      @click.stop
    >
      <form
        id="modal-form-register"
        class="relative p-5"
        @submit.prevent="onRegister"
      >
        <button
          type="button"
          class="absolute top-5 right-5 z-10"
          @click="WebsiteStore.onModalRegister('close')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div class="mb-6">
          <h2 class="font-semibold text-2xl text-gray-900 mb-3">Daftar</h2>
          <p class="w-10/12 font-medium text-sm text-slate-700">
            Buat akun <strong class="text-gray-900">Berkelana</strong> dapatkan
            gratis biaya admin dan temukan destinasi terbaik di Yogyakarta
          </p>
        </div>
        <!-- STATUS LOGIN -->
        <div
          v-if="isErrorRegister"
          class="form-request-status bg-red-500 font-semibold text-sm text-white mb-2 py-3 rounded-md text-center"
        >
          {{ statusErrorRegister }}
        </div>
        <div
          class="flex items-center h-12 w-full bg-slate-100 px-3 rounded-lg text-[#0084FF] mb-3"
        >
          <input
            v-model="inputUsername"
            type="text"
            name="username"
            class="grow bg-slate-100 h-full lowercase text-sm font-medium text-slate-800 placeholder:text-slate-500"
            placeholder="Username"
            minlength="5"
            maxlength="20"
            required
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 flex-none"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </div>
        <div
          class="flex items-center h-12 w-full bg-slate-100 px-3 rounded-lg text-[#0084FF] mb-3"
        >
          <input
            v-model="inputEmail"
            type="email"
            name="email"
            class="grow bg-slate-100 h-full text-sm font-medium text-slate-800 placeholder:text-slate-500"
            placeholder="pengunjung@email.com"
            minlength="5"
            maxlength="60"
            required
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 flex-none"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
            />
          </svg>
        </div>
        <div
          class="flex items-center h-12 w-full bg-slate-100 px-3 rounded-lg text-[#0084FF]"
        >
          <input
            v-model="inputPassword"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            class="grow bg-slate-100 h-full text-sm font-medium text-slate-800 placeholder:text-slate-500"
            placeholder="Password"
            minlength="5"
            maxlength="20"
            required
          />
          <button
            type="button"
            class="w-6 h-6 flex-none cursor-pointer"
            @click="showPassword = !showPassword"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
              :class="showPassword ? 'hidden' : 'block'"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
              :class="showPassword ? 'block' : 'hidden'"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </button>
        </div>
        <div class="mt-5">
          <button
            type="submit"
            class="w-full bg-[#2181D9] font-semibold text-base text-white py-2.5 rounded-lg"
          >
            Daftar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
