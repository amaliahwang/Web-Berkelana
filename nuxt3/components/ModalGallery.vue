<script setup>
defineProps(["isShow", "srcGallery"]);
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

onMounted(() => {
  const swiper = new Swiper(".swiper-gallery", {
    slidesPerView: "auto",
    spaceBetween: 20,
    centeredSlides: true,
    keyboard: {
      enabled: true,
    },
    slideToClickedSlide: true,
  });
});
</script>
<template>
  <div
    class="h-screen w-screen fixed top-0 left-0 z-[60] items-center justify-center"
    :class="isShow ? 'flex' : 'hidden'"
    style="background-color: rgba(21, 25, 34, 0.75)"
    @click="$emit('closeModal')"
  >
    <div class="relative w-[92%] max-w-[1240px] rounded-lg" @click.stop>
      <button
        @click="$emit('closeModal')"
        type="button"
        class="h-8 md:h-10 w-8 md:w-10 bg-gray-900 text-white rounded-full absolute -top-3 md:-top-4 -right-3 md:-right-4 z-20 flex items-center justify-center"
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
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div class="w-full overflow-hidden">
        <div class="swiper-container swiper-gallery">
          <div class="swiper-wrapper items-center">
            <div class="swiper-slide" v-for="image in srcGallery">
              <img
                class="w-full h-full object-cover rounded-md"
                :src="`/${image}`"
                height="300"
                width="300"
                alt="Gallery"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@media (min-width: 300px) {
  .swiper-gallery .swiper-slide {
    height: 220px;
    width: 80%;
  }
  .swiper-gallery .swiper-slide-active {
    height: 280px;
  }
}
@media (min-width: 768px) {
  .swiper-gallery .swiper-slide {
    height: 300px;
    width: 70%;
  }
  .swiper-gallery .swiper-slide-active {
    height: 340px;
  }
}
@media (min-width: 1024px) {
  .swiper-gallery .swiper-slide {
    width: 60%;
    height: 340px;
  }
  .swiper-gallery .swiper-slide-active {
    height: 380px;
  }
}
@media (min-width: 1240px) {
  .swiper-gallery .swiper-slide {
    height: 400px;
    width: 45%;
  }
  .swiper-gallery .swiper-slide-active {
    height: 450px;
  }
}
</style>
