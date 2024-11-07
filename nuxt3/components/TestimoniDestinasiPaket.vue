<script setup>
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

onMounted(() => {
  const testimoniSwiper = new Swiper(".testimoni-swiper", {
    slidesPerView: "auto",
    centeredSlides: true,
    loop: true,
    breakpoints: {
      300: {
        spaceBetween: 10,
      },
      768: {
        spaceBetween: 12,
      },
      1024: {
        spaceBetween: 12,
      },
      1240: {
        spaceBetween: 16,
      },
    },
  });
});
</script>
<template>
  <div
    class="w-full border border-slate-200 bg-white p-4 md:p-5 rounded-md"
  >
    <div class="flex items-center gap-x-3 md:gap-x-5">
      <div
        class="h-8 md:h-8 lg:h-10 w-8 md:w-8 lg:w-10 bg-[#2181D9] text-white rounded-full flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-4 md:w-5 h-4 md:h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
          />
        </svg>
      </div>
      <h3 class="font-semibold text-base md:text-lg text-gray-900">
        Testimonial
      </h3>
    </div>
    <!-- SWIPER TESTIMONI -->
    <div class="w-full overflow-hidden mt-4">
      <div class="swiper-container testimoni-swiper">
        <div class="swiper-wrapper">
          <TestimoniSwiper />
        </div>
      </div>
    </div>
  </div>
</template>
