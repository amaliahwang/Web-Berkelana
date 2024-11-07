<script setup>
defineProps(["isShow", "totalPrice", "rekening"]);
import { ref, computed } from "vue";
import { useWebsiteStore } from "@/stores/website";
import { showToastFunction } from "@/helpers/Toast"
const rekeningRef = ref(null);
const imagePreview = ref(null);
const WebsiteStore = useWebsiteStore();
const copyInputValue = () => {
  rekeningRef.value.select();

  try {
    document.execCommand("copy");
    console.log("Text copied to clipboard");
  } catch (err) {
    console.error("Unable to copy text to clipboard:", err);
  }
};

const handleFileInputChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    imagePreview.value = null;
  }
};

const uploadImage = () => {
  WebsiteStore.showLoader = true;
  setTimeout(() => {
    WebsiteStore.showLoader = false;
    showToastFunction("success", "Selamat, Pembayaran Anda berhasil!");
    navigateTo("/")
  }, 3000);
};
</script>
<template>
  <div
    class="h-screen w-screen fixed top-0 left-0 z-50 flex items-center justify-center"
    :class="isShow ? 'flex' : 'hidden'"
    style="background-color: rgba(21, 25, 34, 0.75)"
    @click="$emit('closeModal')"
  >
    <div
      @click.stop
      id="modal-signin"
      class="w-[94%] max-w-[350px] md:max-w-[370px] px-5 md:px-6 py-5 fixed top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white rounded-md z-[70]"
    >
      <button
        @click="$emit('closeModal')"
        type="button"
        class="h-8 w-8 absolute -top-3 -right-3 bg-slate-900 text-white flex items-center justify-center rounded-full"
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
      <div class="w-full mb-5">
        <h3 class="font-semibold text-lg md:text-xl text-[#20202C]">
          Konfirmasi Pembayaran
        </h3>
      </div>
      <div class="w-full mb-5">
        <label
          class="block font-semibold text-base text-gray-900 mb-2"
          for="full_name"
          >Total Pembayaran</label
        >
        <div class="h-10 w-full bg-slate-100 px-5 flex items-center">
          <p
            class="font-semibold text-sm md:text-base text-gray-900 flex gap-x-5"
          >
            <span>Total</span>
            <strong class="font-semibold">Rp. {{ totalPrice }}</strong>
          </p>
        </div>
      </div>
      <div class="w-full mb-5">
        <label
          class="block font-semibold text-base text-gray-900 mb-2"
          for="full_name"
          >Alamat Rekening</label
        >
        <div
          class="h-10 w-full bg-slate-100 px-5 flex items-center gap-x-3 border border-slate-200 rounded"
        >
          <img class="h-auto w-[20%]" src="/payment-bca.png" alt="Image bank" />
          <input
            ref="rekeningRef"
            type="text"
            class="w-[70%] block text-center bg-transparent font-semibold text-gray-800"
            readonly
            :value="123456789"
          />
          <button type="button" class="w-[10%]" @click="copyInputValue">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 ml-auto"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="w-full mb-7">
        <label
          class="block font-semibold text-base text-gray-900 mb-2"
          for="full_name"
          >Upload Bukti Pembayaran</label
        >
        <input
          @change="handleFileInputChange"
          class="invisible h-0 absolute top-0 -z-10"
          type="file"
          id="upload_pembayaran"
        />
        <div class="flex items-center justify-center gap-x-3">
          <label
            for="upload_pembayaran"
            class="h-20 w-20 bg-slate-100 px-5 flex items-center justify-center gap-x-3 border border-slate-200 rounded cursor-pointer"
          >
            <p class="text-[#0084FF]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-7 h-7 mx-auto"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
              <span class="font-medium text-xs text-[#0084FF] pt-1"
                >Upload</span
              >
            </p>
          </label>
          <div class="relative" v-if="imagePreview">
            <button
              @click="imagePreview = null"
              type="button"
              class="h-5 w-5 absolute -top-2 -right-2 bg-slate-900 text-white flex items-center justify-center rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-3 h-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
            <img
              class="h-20 w-20 rounded object-cover cursor-pointer"
              :src="imagePreview"
              alt="Image Preview"
            />
          </div>
        </div>
      </div>
      <div class="w-full">
        <button
          @click="uploadImage"
          class="w-full bg-[#2181D9] py-3 text-center font-semibold text-sm md:text-base text-white rounded"
          type="button"
        >
          Kirim
        </button>
      </div>
    </div>
  </div>
</template>
