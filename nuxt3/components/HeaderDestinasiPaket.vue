<script setup>
defineProps(["primaryImage"]);
import { computed, ref } from "vue";
const imagesGallery = ref([
  "blog-1.jpg",
  "blog-2.jpg",
  "blog-3.jpg",
  "blog-5.jpg",
  "blog-6.jpg",
  "blog-7.jpg",
]);
const filteredImages = computed(() => {
  return imagesGallery.value.length > 5
    ? imagesGallery.value.slice(1, 5)
    : imagesGallery.value;
});
</script>
<template>
  <header>
    <div class="container">
      <div
        class="w-full flex flex-wrap md:flex-nowrap gap-[10px] rounded-md overflow-hidden"
      >
        <div
          class="relative h-[300px] md:h-[400px] lg:h-[450px] w-full md:w-[50%]"
        >
          <img
            class="h-full w-full rounded-md object-cover cursor-pointer"
            :src="`${primaryImage}`"
            height="300"
            width="300"
            alt="Home Header"
            @click="$emit('openModalGallery')"
          />
          <button
            type="button"
            @click="$emit('openModalGallery')"
            class="absolute bottom-3 right-3 z-10 bg-[#20202C] text-white flex items-center gap-x-2 py-2 px-4 rounded"
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
                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
              />
            </svg>
            <span class="font-medium text-sm">Tampilkan Semua Foto</span>
          </button>
        </div>
        <div
          class="relative hidden md:grid grid-cols-2 grid-rows-2 gap-[10px] h-[150px] md:h-[400px] lg:h-[450px] md:w-[50%]"
        >
          <img
            v-for="(image, index) in filteredImages"
            :key="index"
            class="h-full w-full rounded-md object-cover cursor-pointer"
            @click="$emit('openModalGallery')"
            :src="`/${image}`"
            height="300"
            width="300"
            alt="Home Header"
          />
        </div>
        <!-- SWIPER IN MOBILE -->
        <div class="block md:hidden w-full overflow-hidden">
          <div class="swiper-container header-mobile-swiper">
            <div class="swiper-wrapper">
              <div
                class="swiper-slide"
                v-for="(image, index) in imagesGallery"
                :key="index"
                style="width: 70%"
              >
                <img
                  class="h-[138px] w-full rounded-md object-cover cursor-pointer"
                  @click="$emit('openModalGallery')"
                  :src="`/${image}`"
                  height="300"
                  width="300"
                  alt="Home Header"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
