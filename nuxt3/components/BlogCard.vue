<script setup>
defineProps(["title", "slug", "image", "category", "subTitle"]);
</script>
<template>
  <article class="swiper-slide p-3 bg-white rounded border border-slate-200">
    <img
      class="h-[150px] md:h-[190px] lg:h-[220px] w-full object-cover rounded"
      :src="`/${image}`"
      height="500"
      width="500"
      alt="Header Blog"
    />
    <p
      class="font-medium text-[13px] md:text-sm text-[#017000] capitalize mt-2 md:mt-3"
    >
      {{ category }}
    </p>
    <NuxtLink :to="`/blog/${slug}`"
      ><h2
        class="font-semibold text-base md:text-lg text-[#20202C] mt-1.5 mb-1"
      >
        {{ title }}
      </h2></NuxtLink
    >
    <p class="text-sm md:text-base text-gray-800">
      {{ subTitle.substr(0, 100) }}...
    </p>
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
