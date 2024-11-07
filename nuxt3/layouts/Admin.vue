<script setup>
import { useWebsiteStore } from "@/stores/website";
import { useUserStore } from "@/stores/user";
const WebsiteStore = useWebsiteStore();
const UserStore = useUserStore();
</script>
<template>
  <div class="relative flex flex-nowrap items-start">
    <aside
      class="fixed z-[70] transition-all duration-300 top-0 md:left-0 md:relative h-screen w-[330px] max-w-[90%] flex-none bg-white border md:border-r border-slate-200"
      :class="
        WebsiteStore.showNavLeftMobileDashboard ? 'left-0' : '-left-[120%]'
      "
    >
      <div
        class="h-[72px] md:h-[80px] flex items-center justify-center border-b border-slate-200"
      >
        <img
          class="w-1/2 h-auto mx-auto"
          src="/berkelana-logodark.png"
          height="100"
          width="100"
          alt="Logo"
        />
      </div>
      <!-- FOR ADMIN -->
      <div class="w-full relative flex-col gap-y-3 px-7 py-5" :class="UserStore.isRole == 'admin' ? 'flex' : 'hidden'">
        <NuxtLink
          to="/admin/"
          class="flex items-center gap-x-3 px-5 py-2.5 rounded-md text-gray-900 hover:bg-gray-900 hover:text-white"
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
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          <span class="font-medium text-base">Dashboard</span>
        </NuxtLink>
        <NuxtLink
          to="/admin/pembayaran"
          class="flex items-center gap-x-3 px-5 py-2.5 rounded-md text-gray-900 hover:bg-gray-900 hover:text-white"
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
              d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
            />
          </svg>
          <span class="font-medium text-base">Pembayaran</span>
        </NuxtLink>
      </div>
      <!-- FOR USER -->
      <div class="w-full relative flex-col gap-y-3 px-7 py-5" :class="UserStore.isRole == 'user' ? 'flex' : 'hidden'">
        <NuxtLink
          to="/dashboard/"
          class="flex items-center gap-x-3 px-5 py-2.5 rounded-md text-gray-900 hover:bg-gray-900 hover:text-white"
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
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          <span class="font-medium text-base">Dashboard</span>
        </NuxtLink>
        <NuxtLink
          to="/dashboard/profile"
          class="flex items-center gap-x-3 px-5 py-2.5 rounded-md text-gray-900 hover:bg-gray-900 hover:text-white"
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
              d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
            />
          </svg>
          <span class="font-medium text-base">Settings</span>
        </NuxtLink>
      </div>
      <div class="w-full px-5 absolute bottom-10">
        <button
          type="button"
          @click="UserStore.Logout"
          class="w-full flex items-center gap-x-3 px-5 py-2.5 border border-slate-200 rounded-md text-gray-900"
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
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
            />
          </svg>
          <span class="font-medium text-base">Logout</span>
        </button>
      </div>
      <!-- CLOSE ASIDE -->
      <button
        type="button"
        @click="
          WebsiteStore.showNavLeftMobileDashboard = false;
          WebsiteStore.CoverBody = false;
        "
        class="flex md:hidden absolute top-1/2 -right-6 transform -translate-y-1/2 h-12 w-12 rounded-full items-center justify-center text-white bg-[#2181D9]"
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
            d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
          />
        </svg>
      </button>
    </aside>
    <main class="relative z-40 min-h-screen w-full md:grow">
      <nav
        class="h-[72px] md:h-[80px] w-full bg-white border-b border-slate-200"
      >
        <div
          class="flex h-full w-full md:hidden items-center justify-between px-5"
        >
          <button
            @click="
              WebsiteStore.showNavLeftMobileDashboard = true;
              WebsiteStore.CoverBody = true;
            "
            type="button"
            class="text-gray-900"
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
          <img
            class="w-[150px] h-auto mx-auto"
            src="/berkelana-logodark.png"
            height="100"
            width="100"
            alt="Logo"
          />
          <NuxtLink to="/" class="text-gray-900">
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
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
              />
            </svg>
          </NuxtLink>
        </div>
      </nav>
      <div>
        <slot />
      </div>
    </main>
  </div>
  <CoverBody :is-show="WebsiteStore.CoverBody" />
  <LoaderBasic :is-show="WebsiteStore.showLoader" />
  <Toast :is-show="WebsiteStore.showToast" />
</template>
