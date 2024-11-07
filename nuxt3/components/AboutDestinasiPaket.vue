<script setup>
defineProps(["title", "address", "description"]);
</script>
<template>
  <article
    class="w-full border border-slate-200 bg-white p-4 md:p-5 rounded-md"
  >
    <h1
      class="font-semibold text-2xl md:text-2xl lg:text-3xl text-[#20202C] mb-3"
    >
      {{ title }}
    </h1>
    <div
      class="text-sm text-gray-900 mb-3 flex items-center gap-x-2 md:gap-x-1"
    >
      <div class="h-6 w-6 flex-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 md:w-5 h-6 md:h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
      </div>
      <p class="grow">
        {{ address }}
      </p>
    </div>
    <p class="text-base text-gray-900">
      {{ description }}
    </p>
  </article>
</template>
