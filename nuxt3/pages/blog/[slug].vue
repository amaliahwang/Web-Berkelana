<script setup>
import { ref, computed } from "vue";
import { usePostStore } from "@/stores/post";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

const Route = useRoute();
const PostStore = usePostStore();
const showModalMaps = ref(false);
const showModalGallery = ref(false);
PostStore.filterPostBySlug(Route.params.slug);

const postLoaded = computed(() => {
  return Object.keys(PostStore.Post).length !== 0;
});

useHead({
  title: PostStore.Post.title,
});

onMounted(() => {
  const headerVerticalSwiper = new Swiper(".header-vertical-swiper", {
    direction: "vertical",
    slidesPerView: "auto",
    spaceBetween: 12,
    rewind: true,
    navigation: {
      nextEl: ".header-vertical-swiper-button-next",
      prevEl: ".header-vertical-swiper-button-prev",
    },
    breakpoints: {
      300: {
        direction: "horizontal",
      },
      768: {
        direction: "horizontal",
      },
      1024: {
        direction: "vertical",
      },
      1240: {
        direction: "vertical",
      },
    },
  });
  const blogSwiper = new Swiper(".blog-swiper", {
    observer: true,
    observeSlideChildren: true,
    observeParents: true,
    resizeObserver: true,
    rewind: true,
    navigation: {
      nextEl: ".blog-swiper-button-next",
      prevEl: ".blog-swiper-button-prev",
    },
    breakpoints: {
      300: {
        slidesPerView: "auto",
        spaceBetween: 12,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 12,
      },
      1240: {
        slidesPerView: 3,
        spaceBetween: 16,
      },
    },
  });
});
</script>
<template>
  <div v-if="postLoaded">
    <header>
      <div class="container pt-[100px] md:pt-[160px] lg:pt-[180px]">
        <div
          class="w-full md:w-10/12 lg:w-9/12 flex flex-wrap md:flex-nowrap items-stretch mx-auto gap-x-5"
        >
          <section class="w-full md:w-7/12 lg:w-8/12 mx-auto">
            <div
              class="flex items-center gap-x-2 font-medium text-xs text-gray-600 mb-5 md:mb-6"
            >
              <span>Blog</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-3 h-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
              <span class="capitalize">{{ PostStore.Post.category }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-3 h-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
              <span>{{ PostStore.Post.title }}</span>
            </div>
            <h1
              class="w-full font-bold text-[25px] md:text-[35px] lg:text-[40px] xl:text-[42px] text-gray-900 leading-none mb-2"
            >
              {{ PostStore.Post.title }}
            </h1>
            <p class="font-medium text-sm text-gray-800 mb-3.5 md:mb-5">
              {{ PostStore.Post.date }}
            </p>
            <p
              class="w-11/12 md:w-10/12 mb-6 md:mb-8 lg:mb-10 font-medium text-base text-gray-800"
            >
              {{ PostStore.Post.subTitle }}
            </p>
            <div class="relative">
              <div class="absolute top-4 left-4 z-10">
                <p
                  class="font-semibold text-sm bg-[#00AA00] text-white py-2 px-4 rounded-md mb-3 uppercase"
                >
                  {{ PostStore.Post.category }}
                </p>
              </div>
              <button
                @click="showModalMaps = true"
                type="button"
                class="absolute right-5 bottom-5 bg-white text-gray-900 rounded-full h-12 w-12 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-7 h-7"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
                  />
                </svg>
              </button>
              <img
                @click="showModalGallery = true"
                class="h-[300px] md:h-[360px] lg:h-[400px] w-full object-cover rounded-md cursor-pointer"
                :src="`/${PostStore.Post.primaryImage}`"
                height="500"
                width="500"
                alt="Header Blog"
              />
            </div>
          </section>
          <div
            class="relative h-[200px] sm:h-[270px] md:h-[600px] lg:h-[700px] md:w-5/12 lg:w-4/12 flex mt-5 md:mt-0 group"
          >
            <!-- NAVIGATION -->
            <div
              class="hidden absolute bottom-0 right-0 bg-white py-3 px-3 rounded-tl-md md:flex flex-col items-center gap-y-4 z-10 transition-all duration-200 group-hover:visible invisible"
            >
              <button
                type="button"
                class="header-vertical-swiper-button-prev h-10 w-10 flex items-center justify-center text-gray-900 bg-slate-100 rounded-full transition-all duration-200 group-hover:visible invisible"
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
                    d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
                  />
                </svg>
              </button>
              <button
                type="button"
                class="header-vertical-swiper-button-next h-10 w-10 flex items-center justify-center bg-[#2181D9] text-white rounded-full transition-all duration-200 group-hover:visible invisible"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
                  />
                </svg>
              </button>
            </div>
            <div class="w-full swiper header-vertical-swiper cursor-pointer">
              <div class="w-full swiper-wrapper">
                <div
                  v-for="post in PostStore.Post.galleryImage"
                  :key="post.id"
                  @click="showModalGallery = true"
                  class="w-[70%] md:w-full h-[150px] md:h-[250px] lg:h-[300px] swiper-slide"
                >
                  <img
                    class="h-full w-full object-cover rounded-md"
                    :src="`/${post}`"
                    height="500"
                    width="500"
                    alt="Header Blog"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <main>
      <div
        class="container pt-12 md:pt-14 lg:pt-16 pb-[120px] md:pb-[160px] lg:pb-[180px]"
      >
        <article
          id="article-area"
          v-html="PostStore.Post.content"
          class="w-full md:w-10/12 lg:w-9/12 mx-auto text-base md:text-lg text-gray-900 border-b border-slate-200 pb-10 md:pb-12 lg:pb-14"
        ></article>
        <!-- SWIPER: RECENT POST BLOG -->
        <div
          class="relative w-full md:w-10/12 lg:w-9/12 mx-auto pt-10 md:pt-12 lg:pt-14"
        >
          <div class="flex items-center justify-between mb-5">
            <h2
              class="font-semibold text-xl md:text-2xl lg:text-3xl text-[#20202C]"
            >
              Inspirasi lain untuk berkelana
            </h2>
            <ButtonSlider class-swiper="blog-swiper" />
          </div>
          <div class="w-full overflow-hidden">
            <div class="swiper-container blog-swiper">
              <div class="swiper-wrapper">
                <BlogCard
                  v-for="Post in PostStore.Posts"
                  :key="Post.id"
                  :title="Post.title"
                  :sub-title="Post.subTitle"
                  :category="Post.category"
                  :slug="Post.slug"
                  :image="Post.primaryImage"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <ModalMaps
      :is-show="showModalMaps"
      :map-src="PostStore.Post.maps"
      @close-modal="showModalMaps = false"
    />
    <ModalGallery
      :is-show="showModalGallery"
      :src-gallery="PostStore.Post.galleryImage"
      @close-modal="showModalGallery = false"
    />
  </div>
  <div v-else>
    <div class="pt-[120px] pb-[100px]">
      <Head>
        <Title>Article Tidak Ditemukan...</Title>
      </Head>
      <div class="container">
        <div class="w-full md:w-10/12 lg:w-9/12 mx-auto">
          <h1
            class="font-bold text-[30px] md:text-[34px] lg:text-[40px] text-[#20202C]"
          >
            Article Tidak Ditemukan...
          </h1>
        </div>
        <!-- SWIPER: RECENT POST BLOG -->
        <div
          class="relative w-full md:w-10/12 lg:w-9/12 mx-auto pt-12 md:pt-16 lg:pt-20"
        >
          <div class="flex items-center justify-between mb-5">
            <h2
              class="font-semibold text-xl md:text-2xl lg:text-3xl text-[#20202C]"
            >
              Inspirasi lain untuk berkelana
            </h2>
            <ButtonSlider class-swiper="blog-swiper" />
          </div>
          <div class="w-full overflow-hidden">
            <div class="swiper-container blog-swiper">
              <div class="swiper-wrapper">
                <BlogCard
                  v-for="Post in PostStore.Posts"
                  :key="Post.id"
                  :title="Post.title"
                  :sub-title="Post.subTitle"
                  :category="Post.category"
                  :slug="Post.slug"
                  :image="Post.primaryImage"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@media (min-width: 300px) {
  .header-vertical-swiper .swiper-slide {
    height: 150px;
    width: 72%;
  }
}
@media (min-width: 768px) {
  .header-vertical-swiper .swiper-slide {
    height: 200px;
    width: 60%;
  }
}
@media (min-width: 1024px) {
  .header-vertical-swiper .swiper-slide {
    height: 250px;
    width: 100%;
  }
}
@media (min-width: 1240px) {
  .header-vertical-swiper .swiper-slide {
    height: 300px;
    width: 100%;
  }
}
</style>
