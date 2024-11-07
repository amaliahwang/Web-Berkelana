<script setup>
defineProps(["title", "totalDestinasi", "image", "link"]);
</script>
<template>
  <article>
    <NuxtLink
      :to="`/${link}`"
      class="block relative overflow-hidden rounded-md group"
    >
      <div
        class="absolute top-0 left-0 h-full w-full z-30 flex items-end py-3 md:py-5 px-4 md:px-7"
      >
        <section>
          <h3
            class="font-bold text-[18px] sm:text-[20px] md:text-[26px] lg:text-[30px] text-white"
          >
            {{ title }}
          </h3>
          <p class="text-[13px] md:text-base text-white">
            {{ totalDestinasi }} destinasi
          </p>
        </section>
      </div>
      <!-- BACKGROUND LINEAR -->
      <div
        class="absolute left-0 bottom-0 h-1/2 w-full z-20 transition-all duration-300 group-hover:-bottom-full bk-bg-linear"
      ></div>
      <img
        class="h-[150px] sm:h-[170px] md:h-[300px] w-full object-cover"
        :src="`/${image}`"
        height="500"
        width="500"
        alt="Blog Header"
      />
    </NuxtLink>
  </article>
</template>
<style scoped>
.bk-bg-linear {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0,
    rgba(0, 0, 0, 0.6) 77.61%,
    rgba(0, 0, 0, 0.6) 100%
  );
}
</style>
