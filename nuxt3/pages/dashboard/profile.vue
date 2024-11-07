<script setup>
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
import { ref } from "vue";
import { showToastFunction } from "@/helpers/Toast";
import { useWebsiteStore } from "@/stores/website";
import { useUserStore } from "@/stores/user";

const WebsiteStore = useWebsiteStore();
const UserStore = useUserStore();

const isShowModal = ref(false);
const oldPassword = ref("");
const newPassword = ref("");
const oldShowPassword = ref(false);
const newShowPassword = ref(false);
const namaLengkap = ref("");
const nomorTelephone = ref("");
const alamatAnda = ref("");

const onChangeProfile = async () => {
  WebsiteStore.showLoader = true;
  try {
    const newUser = await $fetch(
      `https://api.amarafiif.my.id/api/v1/profile/update-profile`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${UserStore.User.token}`,
        },
        body: JSON.stringify({
          name: namaLengkap.value,
          phoneNumber: nomorTelephone.value,
          address: alamatAnda.value,
        }),
      }
    );

    showToastFunction("success", "Selamat, perubahan akun Anda berhasil!");
    UserStore.changeUser(newUser);
  } catch (e) {
    showToastFunction(
      "failed",
      "Perubahan profile anda gagal, tolong coba lagi!"
    );
    console.error("There was a problem with the fetch operation:", Error);
  } finally {
    WebsiteStore.showLoader = false;
  }
};

const onChangePassword = async () => {
  WebsiteStore.showLoader = true;
  try {
    const newUser = await $fetch(
      `https://api.amarafiif.my.id/api/v1/profile/update-password`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${UserStore.User.token}`,
        },
        body: JSON.stringify({
          currentPassword: oldPassword.value,
          newPassword: newPassword.value,
        }),
      }
    );

    showToastFunction("success", "Selamat, perubahan password Anda berhasil!");
    UserStore.changeUser(newUser);
  } catch (e) {
    showToastFunction("failed", "Perubahan password gagal, tolong coba lagi!");
    console.error("There was a problem with the fetch operation:", Error);
  } finally {
    WebsiteStore.showLoader = false;
    isShowModal.value = false;
  }
};

onMounted(() => {
  namaLengkap.value =
    UserStore.User.about.name != null ? UserStore.User.about.name : "";
  nomorTelephone.value =
    UserStore.User.about.phoneNumber != null
      ? UserStore.User.about.phoneNumber
      : "";
  alamatAnda.value =
    UserStore.User.about.address != null ? UserStore.User.about.address : "";
});

useHead({
  title: "Pengaturan Akun",
});
</script>
<template>
  <div class="pt-10 pb-5 px-20">
    <div class="flex justify-between">
      <h1 class="font-bold text-xl md:text-2xl lg:text-3xl text-gray-900">
        Pengaturan Profile
      </h1>
      <button
        @click="isShowModal = true"
        type="button"
        class="font-medium text-base text-gray-800 border-b border-gray-800"
      >
        Ubah password
      </button>
    </div>
    <form class="mt-10" @submit.prevent="onChangeProfile">
      <div class="mb-5">
        <label
          class="block font-semibold text-base text-gray-800 mb-2"
          for="full_name"
          >Nama Lengkap</label
        >
        <input
          id="full_name"
          ref="inputName"
          v-model="namaLengkap"
          type="text"
          class="bg-slate-100 py-3 px-4 border border-slate-200 w-full rounded-md"
          placeholder="Nama Lengkap Anda"
          required
        />
      </div>
      <div class="mb-5">
        <label
          class="block font-semibold text-base text-gray-800 mb-2"
          for="full_name"
          >Nomor Telephone</label
        >
        <input
          id="full_name"
          ref="inputName"
          v-model="nomorTelephone"
          type="text"
          class="bg-slate-100 py-3 px-4 border border-slate-200 w-full rounded-md"
          placeholder="Nomor Telepon Anda"
          required
        />
      </div>
      <div>
        <label
          class="block font-semibold text-base text-gray-800 mb-2"
          for="full_name"
          >Alamat Anda</label
        >
        <input
          id="full_name"
          ref="inputName"
          v-model="alamatAnda"
          type="text"
          class="bg-slate-100 py-3 px-4 border border-slate-200 w-full rounded-md"
          placeholder="Alamat Anda"
          required
        />
      </div>
      <div class="mt-8">
        <button
          type="submit"
          class="font-semibold text-base bg-[#2181D9] text-white py-3 px-10 rounded"
        >
          Simpan
        </button>
      </div>
    </form>
  </div>
  <!-- MODAL CHANGE PASSWORD -->
  <div
    class="fixed top-0 left-0 h-screen w-screen items-center justify-center"
    :class="isShowModal ? 'flex' : 'hidden'"
    style="background-color: rgba(21, 25, 34, 0.75)"
  >
    <form
      @submit.prevent="onChangePassword"
      class="w-full max-w-[500px] py-4 px-6 rounded bg-white"
    >
      <div class="flex items-center justify-between mb-5">
        <h2 class="font-semibold text-lg text-[#20202C]">Ubah kata sandi</h2>
        <button type="button" @click="isShowModal = false">
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
      </div>
      <div
        class="flex items-center h-12 w-full bg-slate-100 px-3 rounded-lg text-gray-800 mb-3"
      >
        <input
          v-model="oldPassword"
          :type="oldShowPassword ? 'text' : 'password'"
          name="password"
          class="grow bg-slate-100 h-full text-sm font-medium text-slate-800 placeholder:text-slate-500"
          placeholder="Kata Sandi Lama"
          minlength="5"
          required
        />
        <button
          type="button"
          class="w-6 h-6 flex-none cursor-pointer"
          @click="oldShowPassword = !oldShowPassword"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
            :class="oldShowPassword ? 'hidden' : 'block'"
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
            :class="oldShowPassword ? 'block' : 'hidden'"
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
      <div
        class="flex items-center h-12 w-full bg-slate-100 px-3 rounded-lg text-gray-800 mb-3"
      >
        <input
          v-model="newPassword"
          :type="newShowPassword ? 'text' : 'password'"
          name="password"
          class="grow bg-slate-100 h-full text-sm font-medium text-slate-800 placeholder:text-slate-500"
          placeholder="Kata Sandi Baru"
          minlength="5"
          required
        />
        <button
          type="button"
          class="w-6 h-6 flex-none cursor-pointer"
          @click="newShowPassword = !newShowPassword"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
            :class="newShowPassword ? 'hidden' : 'block'"
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
            :class="newShowPassword ? 'block' : 'hidden'"
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
          Simpan
        </button>
      </div>
    </form>
  </div>
</template>
