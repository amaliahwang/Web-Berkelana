<script setup>
defineProps(["link"]);
</script>
<template>
  <NuxtLink :to="link" class="h-10 md:h-12 px-8 md:px-10 inline-flex items-center justify-center gap-x-3 rounded font-medium text-sm md:text-base text-[#2181D9]" style="background: rgba(0, 132, 255, 0.1)"
    >Lihat Semua
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
        d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
      />
    </svg>
  </NuxtLink>
</template>
