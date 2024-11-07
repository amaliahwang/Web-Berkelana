<script setup>
import { formatCurrencyToRupiah } from "@/library/formatStringNumber"

defineProps([
  "id",
  "extraBenefits",
  "destinations",
  "name",
  "thumbnail",
  "price",
]);
</script>
<template>
  <article
    class="w-[350px] max-w-full swiper-slide flex flex-wrap items-start rounded-md overflow-hidden bg-white border border-slate-200 p-3"
  >
    <div class="h-[200px] w-full">
      <img
        class="w-full h-full rounded-md object-cover"
        :src="thumbnail"
        height="300"
        width="300"
        alt="Home Header"
      />
    </div>
    <div class="flex flex-wrap items-start grow pt-4 pl-0">
      <div class="w-full">
        <NuxtLink :to="`/paket/${id}`"
          ><h2 class="font-bold text-lg text-gray-900">
            {{ name }}
          </h2></NuxtLink
        >
        <p
          class="flex items-center gap-x-1 font-medium underline text-[12px] text-gray-900 mb-1.5"
        >
          Mengunjungi {{ destinations.length }} Destinasi
        </p>
        <div class="flex items-center text-yellow-500 mb-3">
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
        </div>
        <div class="flex items-center gap-x-2">
          <div
            class="h-8 w-8 bg-[#2181D9] rounded-md flex items-center justify-center font-bold text-xs text-white"
          >
            8.3
          </div>
          <span class="font-semibold text-sm text-gray-800">Luar Biasa</span>
          <span class="font-semibold text-[10px] text-gray-500"
            >(420 Reviews)</span
          >
        </div>
        <div class="mt-3">
          <h4 class="font-semibold text-gray-900 text-sm">Paket Termasuk:</h4>
          <div class="flex flex-col gap-y-1 mt-1">
            <div
              class="flex items-center gap-x-1 text-[#0084FF]"
              v-for="(benefit, index) in extraBenefits"
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
      <div class="w-full h-full flex flex-col justify-between text-left mt-3">
        <div>
          <p class="font-semibold text-xs text-gray-600 mb-1">Mulai Dari</p>
          <p class="font-semibold text-sm text-gray-600 line-through">
            Rp. {{ formatCurrencyToRupiah(parseInt(price) + 20000) }}
          </p>
          <h3 class="font-semibold text-2xl text-gray-900">Rp. {{ formatCurrencyToRupiah(price) }}</h3>
        </div>
        <div class="mt-2">
          <button
            type="button"
            class="h-[42px] w-[140px] font-semibold text-sm text-white bg-[#2181D9] text-nowrap rounded-md"
          >
            Lihat Paket
          </button>
        </div>
      </div>
    </div>
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
