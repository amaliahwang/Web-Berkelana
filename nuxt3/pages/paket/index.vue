<script setup>
import { usePaketStore } from "@/stores/paket";
import { formatCurrencyToRupiah } from "@/library/formatStringNumber";
import { ref } from "vue";

const PaketStore = usePaketStore();

const { data: paketData, pending: paketPending } = useFetch(
  "https://api.amarafiif.my.id/api/v1/destination-package",
  {
    method: "GET",
    lazy: true,
    onResponse({ request, response, options }) {
      if (response._data && response._data.packages) {
        PaketStore.PaketList = response._data.packages;
      }
    },
  }
);
const filteredPaket = computed(() => {
  if (PaketStore.PaketList.length == 0) {
    if (paketData.value && paketData.value.packages) {
      return paketData.value.packages;
    } else {
      return [];
    }
  } else {
    return PaketStore.PaketList.length > 7
      ? PaketStore.PaketList.slice(1, 8)
      : PaketStore.PaketList;
  }
});

useHead({
  title: "Paket Liburan Terbaik Ada Disini",
});
</script>
<template>
  <main
    class="pt-[100px] md:pt-[110px] lg:pt-[120px] pb-[100px] md:pb-[160px] lg:pb-[180px]"
  >
    <div
      class="container flex flex-wrap md:flex-nowrap md:gap-x-5 lg:gap-x-6 xl:gap-x-8"
    >
      <aside
        id="aside"
        class="md:static transition-all duration-300 fixed z-50 md:z-0 bg-[#F9FBFC] md:bg-none top-0 left-0 transform md:transform-none -translate-x-[150%] h-screen md:h-auto w-screen overflow-hidden block md:w-[300px] lg:w-[330px] flex-none px-4 md:px-0"
      >
        <div class="h-[60px] md:h-[80px] flex items-center justify-between">
          <div>
            <h3 class="font-semibold text-base text-gray-900">Filter By</h3>
            <button
              type="button"
              class="hidden font-semibold text-base text-rose-500"
            >
              Clear
            </button>
          </div>
          <div class="block md:hidden">
            <button
              type="button"
              class="text-gray-900"
              onclick="toggleAsideFilter('close')"
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
        </div>
        <!-- ASIDE LIST -->
        <div
          class="w-full flex flex-col bg-white rounded-xl overflow-y-auto md:rounded-md border border-slate-200"
          style="max-height: calc(100vh - 60px)"
        >
          <div class="flex items-center pl-4 pr-4 md:pr-2 py-4">
            <input
              type="text"
              class="grow font-medium text-base text-gray-800 placeholder:text-gray-400"
              placeholder="Cari Paket Liburan..."
            />
            <button type="button" class="w-6 text-[#0084FF]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
          <div class="w-full flex flex-col gap-y-5 px-3.5 pt-5 pb-8 border-t">
            <div>
              <h3 class="font-semibold text-gray-900 text-[15px] mb-3">
                Berdasarkan Harga
              </h3>
              <div class="flex flex-wrap gap-3 items-center">
                <strong class="font-semibold text-[#0084FF] text-[15px]"
                  >Rp100000 - Rp200000</strong
                >
                <input type="range" class="w-full" min="0" max="100" />
              </div>
            </div>
            <div class="h-px w-full bg-slate-200"></div>
            <div>
              <h3 class="font-semibold text-gray-900 text-[15px] mb-2.5">
                Untuk Berapa Orang
              </h3>
              <div class="flex flex-wrap gap-2 items-center">
                <button
                  type="button"
                  class="text-white bg-[#2181D9] text-[13px] font-semibold border py-1.5 px-2.5 rounded-md"
                >
                  Semua
                </button>
                <button
                  type="button"
                  class="bg-slate-100 text-[13px] font-semibold text-gray-700 border py-1.5 px-2.5 rounded-md"
                >
                  1 Orang
                </button>
                <button
                  type="button"
                  class="bg-slate-100 text-[13px] font-semibold text-gray-700 border py-1.5 px-2.5 rounded-md"
                >
                  1 - 3 Orang
                </button>
                <button
                  type="button"
                  class="bg-slate-100 text-[13px] font-semibold text-gray-700 border py-1.5 px-2.5 rounded-md"
                >
                  1 - 5 Orang
                </button>
                <button
                  type="button"
                  class="bg-slate-100 text-[13px] font-semibold text-gray-700 border py-1.5 px-2.5 rounded-md"
                >
                  1 - 7 Orang
                </button>
                <button
                  type="button"
                  class="bg-slate-100 text-[13px] font-semibold text-gray-700 border py-1.5 px-2.5 rounded-md"
                >
                  10 Orang
                </button>
              </div>
            </div>
            <div class="h-px w-full bg-slate-200"></div>
            <div>
              <h3 class="font-semibold text-gray-900 text-[15px] mb-2.5">
                Kategori Wisata
              </h3>
              <div class="flex flex-wrap gap-2 items-center">
                <button
                  type="button"
                  class="text-white bg-[#2181D9] text-[13px] font-semibold border py-1.5 px-2.5 rounded-md"
                >
                  Semua
                </button>
                <button
                  type="button"
                  class="bg-slate-100 text-[13px] font-semibold text-gray-700 border py-1.5 px-2.5 rounded-md"
                >
                  Pantai
                </button>
                <button
                  type="button"
                  class="bg-slate-100 text-[13px] font-semibold text-gray-700 border py-1.5 px-2.5 rounded-md"
                >
                  Budaya
                </button>
                <button
                  type="button"
                  class="bg-slate-100 text-[13px] font-semibold text-gray-700 border py-1.5 px-2.5 rounded-md"
                >
                  Gunung
                </button>
                <button
                  type="button"
                  class="bg-slate-100 text-[13px] font-semibold text-gray-700 border py-1.5 px-2.5 rounded-md"
                >
                  Alam
                </button>
                <button
                  type="button"
                  class="bg-slate-100 text-[13px] font-semibold text-gray-700 border py-1.5 px-2.5 rounded-md"
                >
                  Kuliner
                </button>
              </div>
            </div>
            <div class="h-px w-full bg-slate-200"></div>
            <div>
              <h3 class="font-semibold text-gray-900 text-[15px] mb-2.5">
                Berdasarkan Rate
              </h3>
              <div class="flex flex-wrap gap-2 items-center">
                <button
                  type="button"
                  class="text-white bg-[#2181D9] flex gap-x-px items-center text-[13px] font-semibold border py-1.5 px-2.5 rounded-md"
                >
                  Semua
                </button>
                <button
                  type="button"
                  class="bg-slate-100 flex gap-x-px items-center text-[#0084FF] border py-1.5 px-2.5 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="bg-slate-100 flex gap-x-px items-center text-[#0084FF] border py-1.5 px-2.5 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="bg-slate-100 flex gap-x-px items-center text-[#0084FF] border py-1.5 px-2.5 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="bg-slate-100 flex gap-x-px items-center text-[#0084FF] border py-1.5 px-2.5 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="bg-slate-100 flex gap-x-px items-center text-[#0084FF] border py-1.5 px-2.5 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <div class="grow">
        <div
          class="h-none md:h-[80px] flex flex-wrap md:flex-nowrap items-center justify-between"
        >
          <h2
            class="font-semibold text-lg md:text-xl lg:text-2xl text-gray-900 mb-3 md:mb-0"
          >
            Paket Perjalanan: <span>{{ filteredPaket.length }} Ditemukan</span>
          </h2>
          <div class="w-full md:w-auto flex items-center justify-between">
            <div class="flex items-center gap-x-2 md:gap-x-3 mb-3 md:mb-0">
              <p
                class="font-medium md:font-semibold text-sm md:text-base text-gray-900"
              >
                Sort by:
              </p>
              <button
                type="button"
                class="py-2 px-3 bg-slate-white rounded-md border border-slate-200 flex items-center gap-x-3 md:gap-x-4 lg:gap-x-5 font-medium text-sm text-[#0084FF]"
              >
                <span class="text-gray-900">Harga</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
            </div>
            <div
              class="flex md:hidden items-center gap-x-2 md:gap-x-3 mb-3 md:mb-0"
            >
              <p
                class="font-medium md:font-semibold text-sm md:text-base text-gray-900"
              >
                Filter By:
              </p>
              <button
                type="button"
                onclick="toggleAsideFilter('open')"
                class="py-2 px-3 bg-slate-white rounded-md border border-slate-200 flex items-center gap-x-5 font-medium text-sm text-[#0084FF]"
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
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <!-- LIST OF PAKET -->
        <div class="w-full flex flex-col gap-y-5">
          <article
            v-for="(paket, index) in filteredPaket"
            :key="index"
            class="h-auto md:h-[400px] lg:h-[350px] xl:h-[300px] w-full flex flex-wrap md:flex-nowrap items-start rounded-md overflow-hidden bg-white border border-slate-200 p-3 md:p-4 lg:p-5"
          >
            <div
              class="h-full w-full md:w-[270px] lg:w-[300px] relative flex-none"
            >
              <p
                class="hidden absolute top-4 left-4 font-semibold text-xs text-green-500 bg-white py-2 px-3 rounded-full"
              ></p>
              <NuxtLink :to="`/paket/${paket.id}`">
                <img
                  class="w-full h-full rounded-md object-cover"
                  :src="paket.thumbnail"
                  height="300"
                  width="300"
                  alt="Home Header"
                />
              </NuxtLink>
            </div>
            <div
              class="h-full flex flex-wrap md:flex-nowrap items-start grow pt-4 md:pb-0 md:pt-0 pl-0 md:pl-4 lg:pl-5"
            >
              <div class="w-full md:w-8/12">
                <NuxtLink :to="`/paket/${paket.id}`">
                  <h2
                    class="font-bold text-lg md:text-xl lg:text-2xl text-gray-900 md:mb-1"
                  >
                    {{ paket.name }}
                  </h2>
                </NuxtLink>
                <p
                  class="flex items-center gap-x-1 font-medium text-[13px] text-gray-900 mb-1.5 md:mb-1"
                >
                  Mengunjungi {{ paket.extraBenefits.length }} Destinasi
                </p>
                <div class="flex items-center text-yellow-500 mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-5 md:w-[22px] lg:w-6 h-5 md:h-[22px] lg:h-6"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-5 md:w-[22px] lg:w-6 h-5 md:h-[22px] lg:h-6"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-5 md:w-[22px] lg:w-6 h-5 md:h-[22px] lg:h-6"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-5 md:w-[22px] lg:w-6 h-5 md:h-[22px] lg:h-6"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-5 md:w-[22px] lg:w-6 h-5 md:h-[22px] lg:h-6"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div class="flex items-center gap-x-2">
                  <div
                    class="h-8 md:h-9 lg:h-10 w-8 md:w-9 lg:w-10 bg-[#2181D9] rounded-md flex items-center justify-center font-bold text-xs md:text-sm text-white"
                  >
                    8.3
                  </div>
                  <span class="font-semibold text-sm md:text-base text-gray-800"
                    >Luar Biasa</span
                  >
                  <span
                    class="font-semibold text-[10px] md:text-xs text-gray-500"
                    >(420 Reviews)</span
                  >
                </div>
                <div class="mt-3">
                  <h4 class="font-semibold text-gray-900 text-sm">
                    Paket Termasuk:
                  </h4>
                  <div class="flex flex-col gap-y-1 mt-1">
                    <div
                      class="flex items-center gap-x-1 text-[#0084FF]"
                      v-for="(benefit, index) in paket.extraBenefits"
                      :key="index"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-5 md:w-6 h-5 md:h-6"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <strong
                        class="inline-block -mt-px font-semibold text-[11px] text-gray-700"
                        >{{ benefit }}</strong
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="w-full md:w-4/12 h-full flex flex-col justify-between text-left md:text-right mt-3 md:mt-0"
              >
                <div>
                  <p class="font-semibold text-xs text-gray-600 mb-1 md:mb-2">
                    Mulai Dari
                  </p>
                  <p
                    class="font-semibold text-sm md:text-base text-gray-800 line-through"
                  >
                    Rp.
                    {{ formatCurrencyToRupiah(parseInt(paket.price) + 20000) }}
                  </p>
                  <h3 class="font-semibold text-xl md:text-2xl text-gray-900">
                    Rp. {{ formatCurrencyToRupiah(paket.price) }}
                  </h3>
                </div>
                <div class="mt-2 md:mt-0">
                  <NuxtLink
                    :to="`/paket/${paket.id}`"
                    class="flex items-center justify-center ml-auto h-[42px] md:h-[46px] lg:h-[50px] w-[140px] font-semibold text-sm md:text-base text-white bg-[#2181D9] text-nowrap rounded-md"
                  >
                    Lihat Paket
                  </NuxtLink>
                </div>
              </div>
            </div>
          </article>
        </div>
        <!-- PAGINATION -->
        <Pagination />
      </div>
    </div>
  </main>
</template>
