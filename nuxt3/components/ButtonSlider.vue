<script setup>
defineProps(["classSwiper", "showLeftButton", "showRightButton"]);
</script>
<template>
  <div class="flex items-center gap-x-2 md:gap-x-4">
    <button
      type="button"
      :class="`${classSwiper}-button-prev h-9 md:h-10 lg:h-11 w-9 md:w-10 lg:w-11 flex items-center justify-center text-gray-900 bg-slate-100 rounded-full`"
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
          d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
        />
      </svg>
    </button>
    <button
      type="button"
      :class="`${classSwiper}-button-next h-9 md:h-10 lg:h-11 w-9 md:w-10 lg:w-11 flex items-center justify-center bg-[#2181D9] text-white rounded-full`"
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
          d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
        />
      </svg>
    </button>
  </div>
</template>
