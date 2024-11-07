<script setup>
defineProps([
  "category",
  "rate",
  "title",
  "price",
  "swiperSlide",
  "images",
  "slug",
]);
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
      <LoveButtonToCart class="top-2.5 right-2.5" />
      <div class="relative h-full w-full oveflow-hidden">
        <NuxtLink :to="`/destinasi/${slug}/`"
          ><img
            class="h-full w-full object-cover"
            :src="`${images}`"
            height="500"
            width="500"
            alt="Header Blog"
        /></NuxtLink>
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
      <NuxtLink :to="`/destinasi/${slug}/`"
        ><h3 class="font-semibold text-lg text-[#20202C]">
          {{ title }}
        </h3></NuxtLink
      >
      <div class="mt-2.5">
        <p class="text-[13px] text-gray-600">Mulai Dari</p>
        <p class="text-[13px] text-gray-600">
          <strong class="font-semibold text-lg text-gray-900 pr-1">{{
            price == 'Rp.0' ? 'Gratis' : price
          }}</strong>
        </p>
      </div>
    </section>
  </article>
</template>
<style scoped>
@media (min-width: 300px) {
  .swiper-slide {
    width: 85%;
  }
}
@media (min-width: 768px) {
  .swiper-slide {
    width: 44%;
  }
}
</style>
