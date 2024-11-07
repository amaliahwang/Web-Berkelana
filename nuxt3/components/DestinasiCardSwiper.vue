<script setup>
defineProps([
  "category",
  "rate",
  "title",
  "priceWeekday",
  "priceWeekend",
  "swiperSlide",
  "images",
  "slug",
]);
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

onMounted(() => {
  const swiper = new Swiper(".swiper-post-image", {
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: {
      nextEl: ".swiper-post-image-button-next",
      prevEl: ".swiper-post-image-button-prev",
    },
    keyboard: {
      enabled: true,
    },
    slideToClickedSlide: true,
    pagination: {
      el: ".destination-cardpost-image-swiper-pagination",
      dynamicBullets: true,
      renderBullet: function (index, className) {
        return `<div class="${className} destination-cardpost-image-swiper-pagination-item"></div>`;
      },
    },
  });
});
</script>
<template>
  <article
    class="relative md:w-auto overflow-hidden border border-slate-200 rounded-md bg-white p-3"
    :class="swiperSlide ? 'swiper-slide' : ''"
  >
    <div
      class="relative overflow-hidden w-full h-[180px] md:h-[200px] lg:h-[220px] rounded group"
    >
      <!-- LOVE BUTTON -->
      <button
        type="button"
        class="h-10 w-10 flex items-center justify-center absolute top-2.5 right-2.5 z-10 text-gray-100 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="rgba(0, 0, 0, 0.85)"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-8 h-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </button>
      <!-- SWIPER IMAGE -->
      <div class="relative h-full w-full group oveflow-hidden">
        <div class="swiper-container swiper-post-image">
          <!-- SWIPER PAGINATION -->
          <div class="destination-cardpost-image-swiper-pagination"></div>
          <div class="swiper-wrapper">
            <img
              v-for="(image, index) in images"
              :key="index"
              class="swiper-slide h-full w-full object-cover"
              :src="`/${image}`"
              height="500"
              width="500"
              alt="Header Blog"
            />
          </div>
        </div>
        <!-- SWIPER NAV -->
        <button
          type="button"
          class="swiper-post-image-button-prev h-8 w-8 absolute z-30 invisible transition-all duration-200 group-hover:visible top-1/2 left-2 transform -translate-y-1/2 text-white flex items-center justify-center rounded-full"
          style="background-color: rgba(0, 170, 0, 0.8)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.75"
            stroke="currentColor"
            class="group-hover:visible invisible transition-all duration-200 w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          type="button"
          class="swiper-post-image-button-next h-8 w-8 absolute z-30 invisible transition-all duration-200 group-hover:visible top-1/2 right-2 transform -translate-y-1/2 text-white flex items-center justify-center rounded-full"
          style="background-color: rgba(0, 170, 0, 0.8)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.75"
            stroke="currentColor"
            class="group-hover:visible invisible transition-all duration-200 w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
    <section class="pt-3">
      <div class="flex items-center justify-between mb-1">
        <p class="font-semibold text-[13px] text-[#00AA00]">
          {{ category }}
        </p>
        <div class="flex items-center gap-x-1 text-[#00AA00]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clip-rule="evenodd"
            />
          </svg>
          <strong class="font-normal text-gray-900 text-sm">{{ rate }}</strong>
        </div>
      </div>
      <NuxtLink :to="`/destinasi/${slug}`"
        ><h3 class="font-semibold text-lg text-[#20202C]">
          {{ title }}
        </h3></NuxtLink
      >
      <div class="mt-2.5">
        <p class="text-[13px] text-gray-600">Mulai Dari</p>
        <p class="text-[13px] text-gray-600">
          <strong class="font-semibold text-base text-gray-900 pr-1">{{
            priceWeekday
          }}</strong>
          Senin - Jumat
        </p>
        <p class="text-[13px] text-gray-600">
          <strong class="font-semibold text-base text-gray-900 pr-1">{{
            priceWeekend
          }}</strong>
          Sabtu - Minggu
        </p>
      </div>
    </section>
  </article>
</template>
<style>
.destination-cardpost-image-swiper-pagination {
  position: absolute;
  bottom: 8px !important;
  z-index: 20 !important;
}
.destination-cardpost-image-swiper-pagination-item {
  background-color: white !important;
  height: 8px !important;
  width: 8px !important;
}
</style>
