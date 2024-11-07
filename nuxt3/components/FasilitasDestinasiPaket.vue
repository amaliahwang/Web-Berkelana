<script setup>
defineProps(["facility"]);
</script>
<template>
  <div class="w-full border border-slate-200 bg-white p-4 md:p-5 rounded-md">
    <div class="flex items-center gap-x-3 md:gap-x-5">
      <div
        class="h-8 md:h-8 lg:h-10 w-8 md:w-8 lg:w-10 bg-[#2181D9] text-white rounded-full flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 md:w-5 h-4 md:h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
          />
        </svg>
      </div>
      <h3 class="font-semibold text-base md:text-lg text-gray-900">
        Fasilitas Yang Tersedia
      </h3>
    </div>
    <div class="flex flex-wrap items-center gap-4 md:gap-5 lg:gap-6 mt-4">
      <p
        class="flex items-center gap-x-1.5 font-medium text-base text-white"
        v-for="(fasilitas, index) in facility"
        :key="index"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#2181D9"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
          />
        </svg>
        <span class="text-gray-900">{{ fasilitas }}</span>
      </p>
    </div>
  </div>
</template>
