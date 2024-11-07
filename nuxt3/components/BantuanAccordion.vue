<script setup>
defineProps(["isShow", "title", "text"]);
</script>
<template>
  <div
    class="py-3 md:py-4 border-t border-b border-slate-200 cursor-pointer"
    :class="isShow == 1 ? 'text-[#0084FF]' : 'text-[#20202C]'"
  >
    <div class="flex items-center gap-x-5">
      <h2
        class="grow font-semibold md:text-lg lg:text-xl"
        :class="isShow == 1 ? 'text-[#0084FF]' : 'text-[#20202C]'"
      >
        {{ title }}
      </h2>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-6 h-6 flex-none transition-all duration-200 transform"
        :class="isShow == 1 ? 'rotate-45' : 'rotate-0'"
      >
        <path
          d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z"
        />
      </svg>
    </div>
    <div class="pt-3" :class="isShow == 1 ? 'block' : 'hidden'">
      <p class="text-base md:text-lg text-gray-900">
        {{ text }}
      </p>
    </div>
  </div>
</template>
