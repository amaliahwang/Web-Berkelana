<script setup>
import { ref, computed } from "vue";
import { useWebsiteStore } from "@/stores/website";
import { useUserStore } from "@/stores/user";

const WebsiteStore = useWebsiteStore();
const UserStore = useUserStore();

const fillTheLove = ref(false);
const firstLetterUser = computed(() => {
  return Object.keys(UserStore.User).length > 0
    ? UserStore.User.username.charAt(0)
    : "";
});

const dropdownNavUser = ref(false);
</script>
<template>
  <nav
    class="h-[80px] w-full bg-white fixed left-0 top-0 z-50 border-b border-slate-200"
  >
    <div class="h-full container flex md:flex-nowrap items-center">
      <div class="w-6/12 md:w-3/12 flex items-center">
        <button
          @click="
            WebsiteStore.showNavLeftMobile = true;
            WebsiteStore.showCoverBody = true;
          "
          type="button"
          class="mr-3 block md:hidden text-gray-900 hover:text-[#0084FF]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-7 h-7"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <NuxtLink to="/"
          ><img
            class="w-[110px] md:w-[140px] lg:w-[180px] h-auto"
            src="/berkelana-logodark.png"
            height="100"
            width="100"
            alt="Logo"
        /></NuxtLink>
      </div>
      <div
        class="w-6/12 hidden md:flex items-center justify-center md:gap-x-5 lg:gap-x-7 font-medium md:text-sm lg:text-base text-gray-900"
      >
        <NuxtLink to="/" class="hover:text-[#0084FF]">Beranda</NuxtLink>
        <NuxtLink to="/destinasi" class="hover:text-[#0084FF]"
          >Destinasi</NuxtLink
        >
        <NuxtLink to="/destinasi?category=kuliner" class="hover:text-[#0084FF]"
          >Kuliner</NuxtLink
        >
        <NuxtLink to="/paket" class="hover:text-[#0084FF]"
          >Paket Wisata</NuxtLink
        >
        <NuxtLink to="/bantuan" class="hover:text-[#0084FF]">Bantuan</NuxtLink>
      </div>
      <div
        class="w-6/12 md:w-3/12 flex items-center justify-end gap-x-1 md:gap-x-1 lg:gap-x-2"
      >
        <button
          type="button"
          class="text-slate-900 hover:text-[#0084FF]"
          @click="WebsiteStore.showNavSearch = !WebsiteStore.showNavSearch"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 md:w-7 h-6 md:h-7"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
        <button
          v-if="UserStore.isLogged"
          type="button"
          @mouseenter="fillTheLove = true"
          @mouseleave="fillTheLove = false"
          class="text-slate-900 hover:text-[#0084FF] ml-3 md:ml-4 relative"
          @click="WebsiteStore.showWishList = !WebsiteStore.showWishList"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            :fill="fillTheLove ? '#0084FF' : 'none'"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 md:w-7 h-6 md:h-7"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
          <span
            class="h-4 w-4 flex items-center justify-center absolute -top-1 -right-1 bg-rose-600 text-[10px] font-semibold text-white rounded-full"
            >4</span
          >
        </button>
        <!-- IF NOT LOGIN -->
        <div
          id="nav_not-login"
          class="gap-x-0 md:gap-x-2"
          :class="UserStore.isLogged ? 'hidden' : 'flex'"
        >
          <button
            type="button"
            class="h-[36px] md:h-[40px] inline-flex items-center px-2.5 md:px-4 lg:px-5 whitespace-nowrap rounded-md font-medium text-[13px] md:text-base text-slate-900 hover:text-[#0084FF]"
            @click="WebsiteStore.onModalRegister('open')"
          >
            Daftar
          </button>
          <button
            @click="WebsiteStore.onModalLogin('open')"
            type="button"
            class="h-[36px] md:h-[40px] inline-flex items-center px-3 md:px-4 lg:px-5 whitespace-nowrap rounded-md font-medium text-[13px] md:text-base text-white bg-[#2181D9]"
          >
            Masuk
          </button>
        </div>
        <!-- IF LOGIN -->
        <div
          id="nav_login"
          class="relative ml-3 md:ml-4"
          :class="UserStore.isLogged ? 'flex' : 'hidden'"
        >
          <button
            @click="dropdownNavUser = !dropdownNavUser"
            type="button"
            class="nav_login-circle h-12 w-12 flex items-center justify-center rounded-full bg-[#0084FF] font-semibold text-white text-base uppercase"
          >
            {{ firstLetterUser }}
          </button>
          <div
            class="absolute top-[60px] right-0 bg-white flex-col gap-y-3 border border-slate-200 rounded-md py-5 pl-6 pr-[100px] shadow-md"
            :class="dropdownNavUser ? 'flex' : 'hidden'"
          >
            <NuxtLink
              :to="UserStore.isRole == 'user' ? '/dashboard/' : '/admin/'"
              class="flex items-center gap-x-3 font-semibold text-base text-gray-700"
            >
              <span
                class="bg-slate-50 h-10 w-10 rounded-full flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </span>
              Profil</NuxtLink
            >
            <button
              @click="UserStore.Logout"
              type="button"
              class="flex items-center gap-x-3 font-semibold text-base text-gray-700"
            >
              <span
                class="bg-slate-50 h-10 w-10 rounded-full flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                  />
                </svg>
              </span>
              Keluar
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
