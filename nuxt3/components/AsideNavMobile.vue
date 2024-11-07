<script setup>
defineProps(["isShow"]);
import { useWebsiteStore } from "@/stores/website";
const WebsiteStore = useWebsiteStore();
</script>
<template>
  <aside
    class="h-screen w-full max-w-[330px] fixed top-0 left-0 z-[70] bg-white transition-all duration-300 transform"
    :class="isShow ? '-translate-x-0' : '-translate-x-[120%]'"
  >
    <div
      class="h-full flex flex-col justify-between pt-8 px-5 pb-10 font-medium text-base text-gray-900"
    >
      <div class="flex flex-col">
        <div class="w-full text-[#0084FF] mb-6">
          <img
            class="w-[180px] h-auto"
            src="/berkelana-logodark.png"
            height="100"
            width="100"
            alt="Logo"
          />
        </div>
        <NuxtLink
          to="/"
          class="h-[50px] w-full border-b border-gray-200 flex items-center"
          >Beranda</NuxtLink
        >
        <NuxtLink
          to="/destinasi"
          class="h-[50px] w-full border-b border-gray-200 flex items-center"
          >Destinasi</NuxtLink
        >
        <NuxtLink
          to="/destinasi?category=kuliner"
          class="h-[50px] w-full border-b border-gray-200 flex items-center"
          >Kuliner</NuxtLink
        >
        <NuxtLink
          to="/paket"
          class="h-[50px] w-full border-b border-gray-200 flex items-center"
          >Paket Wisata</NuxtLink
        >
        <NuxtLink to="/bantuan" class="h-[50px] w-full flex items-center"
          >Bantuan</NuxtLink
        >
      </div>
      <button
      @click="WebsiteStore.showCoverBody = false; WebsiteStore.showNavLeftMobile = false"
        type="button"
        class="mx-auto h-10 w-10 rounded-full bg-[#2181D9] text-white flex items-center justify-center"
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
    </div>
  </aside>
</template>
