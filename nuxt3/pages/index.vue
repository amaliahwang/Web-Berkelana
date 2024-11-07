<script setup>
import { ref, computed } from "vue";
import { showToastFunction } from "@/helpers/Toast";
import { usePostStore } from "@/stores/post";
import { useWebsiteStore } from "@/stores/website";
import { useDestinasiStore } from "@/stores/destinasi";
import { usePaketStore } from "@/stores/paket";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import PaketMobileCard from "~/components/PaketMobileCard.vue";

const WebsiteStore = useWebsiteStore();
const PostStore = usePostStore();
const DestinasiStore = useDestinasiStore();
const PaketStore = usePaketStore();

const videosHeader = ref([
  {
    id: 1,
    thumbnail: "/header-video-1.jpg",
    link: "QCZ6wpa3nXs",
  },
  {
    id: 2,
    thumbnail: "/header-video-2.jpg",
    link: "ojQbArbuN4E",
  },
  {
    id: 3,
    thumbnail: "/header-video-3.jpg",
    link: "1V_4-f5Ocy4",
  },
]);
const videoSelected = ref("");
const isShowDropdown = ref(false);
const isShowFormHeader = ref(false);
const HeaderFormArticleList = ref({
  paket: [],
  destinasi: [],
});
const searchString = ref("");
const isVideoOpen = ref(false);
const emailBerlangganan = ref("");
const refEmailBerlangganan = ref(null);

const { data: destinasiData, pending: destinasiPending } = useFetch(
  "https://api.amarafiif.my.id/api/v1/destination",
  {
    method: "GET",
    lazy: true,
    onResponse({ request, response, options }) {
      if (response._data && response._data.destinations) {
        DestinasiStore.DestinasiList = response._data.destinations;
      }
    },
  }
);
const filteredDestinasi = computed(() => {
  if (DestinasiStore.DestinasiList.length == 0) {
    if (destinasiData.value && destinasiData.value.destinations) {
      return destinasiData.value.destinations;
    } else {
      return [];
    }
  } else {
    return DestinasiStore.DestinasiList.length > 7
      ? DestinasiStore.DestinasiList.slice(1, 8)
      : DestinasiStore.DestinasiList;
  }
});

const { data: paketData, pending: paketPending } = useFetch(
  "https://api.amarafiif.my.id/api/v1/destination-package",
  {
    method: "GET",
    lazy: true,
    onResponse({ request, response, options }) {
      if (response._data && response._data.packages) {
        PaketStore.PaketList = response._data.packages;
      }
    },
  }
);
const filteredPaket = computed(() => {
  if (PaketStore.PaketList.length == 0) {
    if (paketData.value && paketData.value.packages) {
      return paketData.value.packages;
    } else {
      return [];
    }
  } else {
    return PaketStore.PaketList.length > 7
      ? PaketStore.PaketList.slice(1, 8)
      : PaketStore.PaketList;
  }
});

const onPlayVideo = (link) => {
  isVideoOpen.value = true;
  videoSelected.value = link;
};

useHead({
  title: "Berkelana ke Yogykarta",
});

const onSearchDestinasi = () => {
  searchString.value.length > 1
    ? (isShowFormHeader.value = true)
    : (isShowFormHeader.value = false);

  const query = searchString.value.toLowerCase();
  HeaderFormArticleList.value.destinasi = filteredDestinasi.value.filter(
    (item) => item.name.toLowerCase().includes(query)
  );
  HeaderFormArticleList.value.paket = filteredPaket.value.filter((item) =>
    item.name.toLowerCase().includes(query)
  );
};

const onBerlangganan = async () => {
  if (emailBerlangganan.value.length < 5)
    return refEmailBerlangganan.value.focus();
  WebsiteStore.showLoader = true;
  try {
    const request = await $fetch(
      "https://api.amarafiif.my.id/api/v1/subscription",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailBerlangganan.value,
        }),
      }
    );

    showToastFunction("success", "Selamat, berlangganan Anda berhasil!");
    emailBerlangganan.value = "";
  } catch (Error) {
    showToastFunction(
      "failed",
      "Gagal, tolong gunakan email lain untuk berlangganan!"
    );
    console.error("There was a problem with the fetch operation:", Error);
  } finally {
    WebsiteStore.showLoader = false;
    emailBerlangganan.value = "";
  }
};

onMounted(() => {
  const daftarPromoSwiper = new Swiper(".daftar-promo", {
    observer: true,
    observeSlideChildren: true,
    observeParents: true,
    resizeObserver: true,
    navigation: {
      nextEl: ".daftar-promo-swiper-button-next",
      prevEl: ".daftar-promo-swiper-button-prev",
    },
    breakpoints: {
      300: {
        slidesPerView: "auto",
        spaceBetween: 10,
      },
      768: {
        slidesPerView: "auto",
        spaceBetween: 12,
      },
      1024: {
        slidesPerView: "auto",
        spaceBetween: 14,
      },
      1240: {
        slidesPerView: "auto",
        spaceBetween: 16,
      },
      1400: {
        slidesPerView: "auto",
        spaceBetween: 20,
      },
    },
  });
  const daftarPaketSwiper = new Swiper(".daftar-paket-swiper", {
    observer: true,
    observeSlideChildren: true,
    observeParents: true,
    resizeObserver: true,
    slidesPerView: 4,
    spaceBetween: 16,
    navigation: {
      nextEl: ".daftar-paket-swiper-button-next",
      prevEl: ".daftar-paket-swiper-button-prev",
    },
    breakpoints: {
      300: {
        slidesPerView: "auto",
        spaceBetween: 12,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 12,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 12,
      },
      1240: {
        slidesPerView: 4,
        spaceBetween: 12,
      },
    },
  });
  const daftarWisataSwiper = new Swiper(".daftar-wisata-swiper", {
    observer: true,
    observeSlideChildren: true,
    observeParents: true,
    resizeObserver: true,
    navigation: {
      nextEl: ".daftar-wisata-swiper-button-next",
      prevEl: ".daftar-wisata-swiper-button-prev",
    },
    breakpoints: {
      300: {
        slidesPerView: "auto",
        spaceBetween: 12,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 12,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 12,
      },
      1240: {
        slidesPerView: 4,
        spaceBetween: 12,
      },
    },
  });
  const blogSwiper = new Swiper(".blog-swiper", {
    observer: true,
    observeSlideChildren: true,
    observeParents: true,
    resizeObserver: true,
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
        spaceBetween: 12,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 12,
      },
      1240: {
        slidesPerView: 4,
        spaceBetween: 12,
      },
    },
  });
});
</script>
<template>
  <!-- HEADER -->
  <header class="relative w-screen max-w-[1660px]" style="height: calc(100vh)">
    <img
      class="w-full h-full object-cover relative transition-all duration-1000"
      :class="isVideoOpen ? '-top-full' : 'top-0'"
      src="@/assets/images/header-1.jpg"
      height="500"
      width="800"
      alt="Home"
    />
    <!-- LIST VIDEO -->
    <div
      class="w-full md:w-auto absolute bottom-6 md:bottom-10 right-0 md:right-10 flex flex-row md:flex-col gap-2 items-center justify-center z-30"
    >
      <button
        type="button"
        @click="onPlayVideo(video.link)"
        v-for="video in videosHeader"
        :key="video.id"
        class="cursor-pointer relative border-2 border-slate-200 rounded overflow-hidden"
      >
        <span
          :class="isVideoOpen == video.link ? 'animate-spin' : ''"
          class="h-8 md:h-10 w-8 md:w-10 bg-white text-[#0084FF] flex items-center justify-center rounded-full absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#0084FF"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 md:w-5 h-4 md:h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
            />
          </svg>
        </span>
        <img
          class="h-[60px] md:h-[80px] w-[100px] md:w-[160px] object-cover"
          :src="video.thumbnail"
          :alt="video.thumbnail"
        />
      </button>
    </div>
    <!-- FOR VIDEO -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden">
      <div
        class="absolute w-full h-full transition-all duration-1000 pt-[80px]"
        :class="isVideoOpen ? 'top-0' : 'top-full'"
      >
        <iframe
          class="w-full h-full"
          width="560"
          height="315"
          :src="`https://www.youtube.com/embed/${videoSelected}?autoplay=1&mute=1&showinfo=0&controls=0&enablejsapi=1`"
          frameborder="0"
          allow="autoplay"
          allowfullscreen
        ></iframe>
      </div>
    </div>
    <div
      class="w-full max-w-[1240px] absolute bottom-[120px] md:bottom-16 lg:bottom-20 left-1/2 trasnform -translate-x-1/2 z-30 px-5 md:px-0"
    >
      <h1
        class="font-bold leading-snug text-[35px] sm:text-[40px] md:text-[42px] lg:text-[48px] xl:text-[52px] text-white"
      >
        Cari tujuan Anda berkelana
      </h1>
      <p
        class="font-medium text-[17px] sm:text-[20px] md:text-[23px] lg:text-[26px] text-white"
      >
        Buat perjalanan Anda semakin berkesan di Yogyakarta
      </p>
      <div class="relative w-full sm:w-[640px] md:w-[620px] lg:w-[700px] mt-5">
        <form class="w-full mt-5">
          <div
            class="relative w-full h-[50px] md:h-[60px] bg-white rounded-full overflow-hidden text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="absolute top-1/2 left-4 transform -translate-y-1/2 w-5 md:w-6 h-5 md:h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <input
              @keyup="onSearchDestinasi"
              v-model="searchString"
              type="text"
              class="h-full w-full pl-[44px] md:pl-[50px] pr-[100px] md:pr-[130px] lg:pr-[150px] text-sm md:text-base font-medium text-gray-800"
              placeholder="Tempat untuk dikunjungi, hal yang dapat dilakukan, hotel..."
            />
            <button
              type="button"
              class="absolute top-1/2 right-2 transform -translate-y-1/2 h-[38px] md:h-[46px] w-[70px] md:w-[80px] lg:w-[100px] flex-none rounded-full font-medium text-sm md:text-base text-white bg-[#2181D9]"
            >
              Cari
            </button>
          </div>
        </form>
        <div
          class="flex-col w-full absolute top-[110%] shadow bg-white rounded py-2 px-2"
          :class="isShowFormHeader ? 'flex' : 'hidden'"
        >
          <p class="font-semibold text-sm text-gray-800 px-2 py-1">Destinasi</p>
          <article
            v-for="post in HeaderFormArticleList.destinasi"
            :key="post.id"
          >
            <NuxtLink
              :to="`/destinasi/${post.id}`"
              class="flex items-center gap-x-3 bg-white hover:bg-slate-100 py-2 px-3 rounded"
            >
              <strong
                class="block w-[50px] md:w-[60px] font-semibold text-[10px] md:text-xs text-[#0084FF]"
                >{{ post.category }}</strong
              >
              <h4
                class="grow font-medium text-[14px] md:text-base text-[#20202C]"
              >
                {{ post.name }}
              </h4>
            </NuxtLink>
          </article>
          <p class="font-semibold text-sm text-gray-800 px-2 py-1 mt-1">
            Paket
          </p>
          <article v-for="post in HeaderFormArticleList.paket" :key="post.id">
            <NuxtLink
              :to="`/paket/${post.id}`"
              class="flex items-center gap-x-3 bg-white hover:bg-slate-100 py-2 px-3 rounded text-[#0084FF]"
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
                  d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>
              <h4
                class="grow font-medium text-[14px] md:text-base text-[#20202C]"
              >
                {{ post.name }}
              </h4>
            </NuxtLink>
          </article>
        </div>
      </div>
      <div class="flex items-center gap-x-3 mt-5">
        <strong class="font-medium text-base md:text-lg text-white"
          >Mencari</strong
        >
        <div class="flex items-center gap-x-3">
          <NuxtLink
            to="/destinasi?category=kuliner"
            class="inline-flex items-center py-1.5 px-3 font-medium text-[13px] md:text-sm text-white rounded"
            style="background-color: rgba(255, 255, 255, 0.25)"
            >Cari kuliner</NuxtLink
          >
          <NuxtLink
            to="/destinasi?category=sejarah"
            class="inline-flex items-center py-1.5 px-3 font-medium text-[13px] md:text-sm text-white rounded"
            style="background-color: rgba(255, 255, 255, 0.25)"
            >Wisata sejarah</NuxtLink
          >
        </div>
      </div>
    </div>
    <!-- BACKGROUND LINEAR -->
    <div
      class="absolute left-0 bottom-0 h-[70vh] w-full z-20 header-bg-linear"
    ></div>
  </header>
  <!-- PROMO -->
  <section id="promo">
    <div class="container pt-[60px] md:pt-[80px] pb-[60px] md:pb-[80px]">
      <div class="w-full">
        <h2
          class="w-full md:w-[700px] font-bold text-[21px] sm:text-[25px] md:text-[30px] lg:text-[36px] text-[#20202C]"
        >
          Promo terbaik untuk kamu
        </h2>
        <div class="flex gap-x-6 items-center justify-between">
          <p
            class="font-medium grow text-[14px] md:text-[18px] lg:text-[20px] text-gray-800"
          >
            Promo bisa berubah kapan saja, Ayo gunakan sekarang!
          </p>
          <div class="flex items-center gap-x-2 md:gap-x-4">
            <ButtonSlider class-swiper="daftar-promo-swiper" />
          </div>
        </div>
      </div>
      <div class="w-full overflow-hidden mt-5">
        <div class="swiper daftar-promo">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <a href="/" class="block w-full"
                ><img
                  class="h-[160px] sm:h-[220px] md:h-[300px] w-full rounded"
                  src="/promo-brutal.png"
                  height="300"
                  width="300"
                  alt="height"
              /></a>
            </div>
            <div class="swiper-slide">
              <a href="/" class="block w-full"
                ><img
                  class="h-[160px] sm:h-[220px] md:h-[300px] w-full rounded"
                  src="/promo-20-percent.png"
                  height="300"
                  width="300"
                  alt="height"
              /></a>
            </div>
            <div class="swiper-slide">
              <a href="/" class="block w-full"
                ><img
                  class="h-[160px] sm:h-[220px] md:h-[300px] w-full rounded"
                  src="/promo-10-percent.png"
                  height="300"
                  width="300"
                  alt="height"
              /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- DAFTAR PAKET -->
  <main>
    <div class="container pb-0 md:pb-[40px]">
      <div class="w-full">
        <h2
          class="w-full md:w-[700px] font-bold text-[21px] sm:text-[25px] md:text-[30px] lg:text-[36px] text-[#20202C]"
        >
          Eksplore Yogykarta bersama kami
        </h2>
        <div class="flex gap-x-6 items-center justify-between">
          <p
            class="font-medium grow text-[14px] md:text-[18px] lg:text-[20px] text-gray-800"
          >
            Destinasi terbaik di Yogyakarta
          </p>
          <div class="flex items-center gap-x-2 md:gap-x-4">
            <ButtonSlider class-swiper="daftar-paket-swiper" />
          </div>
        </div>
      </div>
      <div class="w-full overflow-hidden mt-5">
        <div class="swiper daftar-paket-swiper">
          <div class="swiper-wrapper">
            <PaketMobileCard
              v-for="(post, index) in filteredPaket"
              :key="index"
              :destinations="post.destinations"
              :id="post.id"
              :name="post.name"
              :price="post.price"
              :thumbnail="post.thumbnail"
              :extraBenefits="post.extraBenefits"
            />
          </div>
        </div>
      </div>
      <div class="w-full text-center mt-8">
        <LihatSemua link="/paket" />
      </div>
    </div>
  </main>
  <!-- KATEGORI DESTINASI -->
  <main>
    <div class="container py-[60px] md:py-[80px]">
      <div class="mb-4 md:mb-5">
        <h2
          class="grow font-bold text-[21px] sm:text-[25px] md:text-[30px] lg:text-[36px] text-[#20202C]"
        >
          Pilih kemana akan berkelana
        </h2>
        <p
          class="font-medium grow text-[14px] md:text-[18px] lg:text-[20px] text-gray-800"
        >
          Tentukan tujuan kamu berkelana, kami akan membantu!
        </p>
      </div>
      <div
        class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5"
      >
        <IndexCategoryCard
          title="Pantai"
          image="blog-1.jpg"
          totalDestinasi="100"
          link="destinasi"
        />
        <IndexCategoryCard
          title="Kebudayaan"
          image="blog-7.jpg"
          totalDestinasi="100"
          link="destinasi"
        />
        <IndexCategoryCard
          title="Kuliner"
          image="blog-13.jpg"
          totalDestinasi="100"
          link="destinasi"
        />
        <IndexCategoryCard
          title="Alam"
          image="blog-16.jpg"
          totalDestinasi="100"
          link="destinasi"
        />
        <IndexCategoryCard
          title="Sejarah"
          image="blog-9.jpg"
          totalDestinasi="100"
          link="destinasi"
        />
        <IndexCategoryCard
          title="Keluarga"
          image="blog-17.jpg"
          totalDestinasi="100"
          link="destinasi"
        />
      </div>
    </div>
  </main>
  <!-- DAFTAR WISATA -->
  <main>
    <div class="container pb-0 md:pb-[40px]">
      <div class="w-full">
        <h2
          class="w-full md:w-[700px] font-bold text-[21px] sm:text-[25px] md:text-[30px] lg:text-[36px] text-[#20202C]"
        >
          Eksplore Yogykarta bersama kami
        </h2>
        <div class="flex gap-x-6 items-center justify-between">
          <p
            class="font-medium grow text-[14px] md:text-[18px] lg:text-[20px] text-gray-800"
          >
            Destinasi terbaik di Yogyakarta
          </p>
          <div class="flex items-center gap-x-2 md:gap-x-4">
            <ButtonSlider class-swiper="daftar-wisata-swiper" />
          </div>
        </div>
      </div>
      <div class="w-full overflow-hidden mt-5">
        <div class="swiper-container daftar-wisata-swiper">
          <div class="swiper-wrapper">
            <DestinasiCard
              v-for="post in filteredDestinasi"
              :key="post"
              :images="`${post.thumbnail}`"
              :swiper-slide="true"
              :category="post.category"
              :title="post.name"
              rate="4.8"
              :slug="post.id"
              :price="post.price"
            />
          </div>
        </div>
      </div>
      <div class="w-full text-center mt-8">
        <LihatSemua link="/destinasi" />
      </div>
    </div>
  </main>
  <!-- PARTNER -->
  <section>
    <div
      class="container flex flex-wrap md:flex-nowrap items-start md:gap-x-10 lg:gap-x-14 pt-[60px] md:pt-[80px] pb-[0px] md:pb-[40px]"
    >
      <h2
        class="w-full md:w-4/12 font-bold text-[21px] sm:text-[25px] md:text-[30px] lg:text-[36px] text-[#20202C]"
      >
        Berkelana bekerja sama dengan berbagai pihak
      </h2>
      <div
        class="w-full md:w-8/12 flex items-center flex-wrap gap-3 md:gap-4 mt-5 md:mt-0"
      >
        <img
          class="h-auto w-[100px] sm:w-[120px] md:w-[160px] lg:w-[200px]"
          src="/mitra-pesona-indonesia.png"
          height="80"
          width="200"
          alt="Image"
        />
        <img
          class="h-auto w-[100px] sm:w-[120px] md:w-[160px] lg:w-[200px]"
          src="/mitra-airbnb.svg"
          height="80"
          width="200"
          alt="Image"
        />
        <img
          class="h-auto w-[100px] sm:w-[120px] md:w-[160px] lg:w-[200px]"
          src="/mitra-jogjabay.png"
          height="80"
          width="200"
          alt="Image"
        />
        <img
          class="h-auto w-[100px] sm:w-[120px] md:w-[160px] lg:w-[200px]"
          src="/mitra-redoorz.png"
          height="80"
          width="200"
          alt="Image"
        />
        <img
          class="h-auto w-[100px] sm:w-[120px] md:w-[160px] lg:w-[200px]"
          src="/mitra-tiket-com.png"
          height="80"
          width="200"
          alt="Image"
        />
        <img
          class="h-auto w-[100px] sm:w-[120px] md:w-[160px] lg:w-[200px]"
          src="/mitra-bluebird.png"
          height="80"
          width="200"
          alt="Image"
        />
      </div>
    </div>
  </section>
  <!-- TESTIMONIAL -->
  <div class="w-screen bg-slate-100 py-[100px]" style="display: none">
    <div class="container">
      <div class="text-center">
        <h2 class="font-semibold text-3xl text-gray-900 mb-2">
          Beberapa Cerita dari Pengguna
        </h2>
        <p class="w-[400px] text-base text-gray-700 mx-auto">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum,
          natus? Dicta ex obcaecati recusandae.
        </p>
        <div class="relative w-full mt-10">
          <div class="swiper testimonial-swiper">
            <div class="swiper-wrapper">
              <article
                class="swiper-slide w-[300px] py-12 px-5 bg-white rounded"
              >
                <h3 class="font-semibold text-xl text-gray-900">
                  Klausturhof Guesthouse
                </h3>
                <p class="font-medium text-sm text-gray-600">in Iceland</p>
                <p class="font-semibold text-xl mt-5 mb-3">
                  "I could not have asked for a better stay than Klausturhof.
                  Thanks to Agoda."
                </p>
                <p class="font-medium text-base text-gray-700">
                  - Joyce from Canada
                </p>
              </article>
              <article
                class="swiper-slide w-[300px] py-12 px-5 bg-white rounded"
              >
                <h3 class="font-semibold text-xl text-gray-900">
                  Klausturhof Guesthouse
                </h3>
                <p class="font-medium text-sm text-gray-600">in Iceland</p>
                <p class="font-semibold text-xl mt-5 mb-3">
                  "I could not have asked for a better stay than Klausturhof.
                  Thanks to Agoda."
                </p>
                <p class="font-medium text-base text-gray-700">
                  - Joyce from Canada
                </p>
              </article>
              <article
                class="swiper-slide w-[300px] py-12 px-5 bg-white rounded"
              >
                <h3 class="font-semibold text-xl text-gray-900">
                  Klausturhof Guesthouse
                </h3>
                <p class="font-medium text-sm text-gray-600">in Iceland</p>
                <p class="font-semibold text-xl mt-5 mb-3">
                  "I could not have asked for a better stay than Klausturhof.
                  Thanks to Agoda."
                </p>
                <p class="font-medium text-base text-gray-700">
                  - Joyce from Canada
                </p>
              </article>
              <article
                class="swiper-slide w-[300px] py-12 px-5 bg-white rounded"
              >
                <h3 class="font-semibold text-xl text-gray-900">
                  Klausturhof Guesthouse
                </h3>
                <p class="font-medium text-sm text-gray-600">in Iceland</p>
                <p class="font-semibold text-xl mt-5 mb-3">
                  "I could not have asked for a better stay than Klausturhof.
                  Thanks to Agoda."
                </p>
                <p class="font-medium text-base text-gray-700">
                  - Joyce from Canada
                </p>
              </article>
              <article
                class="swiper-slide w-[300px] py-12 px-5 bg-white rounded"
              >
                <h3 class="font-semibold text-xl text-gray-900">
                  Klausturhof Guesthouse
                </h3>
                <p class="font-medium text-sm text-gray-600">in Iceland</p>
                <p class="font-semibold text-xl mt-5 mb-3">
                  "I could not have asked for a better stay than Klausturhof.
                  Thanks to Agoda."
                </p>
                <p class="font-medium text-base text-gray-700">
                  - Joyce from Canada
                </p>
              </article>
              <article
                class="swiper-slide w-[300px] py-12 px-5 bg-white rounded"
              >
                <h3 class="font-semibold text-xl text-gray-900">
                  Klausturhof Guesthouse
                </h3>
                <p class="font-medium text-sm text-gray-600">in Iceland</p>
                <p class="font-semibold text-xl mt-5 mb-3">
                  "I could not have asked for a better stay than Klausturhof.
                  Thanks to Agoda."
                </p>
                <p class="font-medium text-base text-gray-700">
                  - Joyce from Canada
                </p>
              </article>
            </div>
          </div>
          <button
            type="button"
            class="testimonial-swiper-button-prev h-12 w-12 z-10 absolute top-1/2 -left-6 transform -translate-y-1/2 bg-orange-600 text-white flex items-center justify-center rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <button
            type="button"
            class="testimonial-swiper-button-next h-12 w-12 z-10 absolute top-1/2 -right-6 transform -translate-y-1/2 bg-orange-600 text-white flex items-center justify-center rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- BLOG RECENT POST -->
  <section>
    <div class="container py-[60px] sm:py-[80px] md:py-[100px]">
      <div class="relative w-full">
        <div class="flex items-center justify-between gap-x-4 mb-4 md:mb-5">
          <h2
            class="grow font-bold text-[21px] sm:text-[25px] md:text-[30px] lg:text-[36px] text-[#20202C]"
          >
            Inspirasi untuk berkelana
          </h2>
          <div class="flex items-center gap-x-2 md:gap-x-4">
            <ButtonSlider class-swiper="blog-swiper" />
          </div>
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
  </section>
  <!-- SUBSCRIPTION -->
  <section>
    <div class="container pb-[60px] md:pb-[80px]">
      <div
        class="shapedividers_com-9231 relative h-[400px] md:h-[460px] lg:h-[500px] w-full rounded-lg bg-[#2181D9] text-white overflow-hidden shadow-xl drop-shadow-md"
      >
        <div
          class="w-[80%] max-w-[500px] absolute top-[50%] left-[20px] md:left-[60px] lg:left-[100px] xl:left-[140px] transform -translate-y-1/2 z-10"
        >
          <h2 class="font-bold text-2xl md:text-3xl lg:text-4xl mb-5">
            Berlangganan sekarang,<br />dapatkan bonus setiap minggunya
          </h2>
          <p class="font-semibold text-lg md:text-lg lg:text-xl">
            Menjadi bagian dari Berkelana
            <br class="block" />dapatkan tiket gratis tiap minggunya.
          </p>
          <form class="mt-8 md:mt-10 lg:mt-12" @submit.prevent="onBerlangganan">
            <div
              class="bg-white h-12 md:h-14 md:max-w-[400px] w-full relative flex items-center justify-between rounded-full overflow-hidden pl-5 pr-2"
            >
              <input
                v-model="emailBerlangganan"
                ref="refEmailBerlangganan"
                type="email"
                class="h-9 md:h-10 block font-medium text-base text-gray-900 placeholder:text-slate-700"
                placeholder="Tulis Email Anda"
                style="width: calc(100% - 80px)"
              />
              <button
                type="submit"
                class="text-white h-9 md:h-10 w-[60px] md:w-[80px] font-semibold text-xs md:text-sm rounded-full flex items-center justify-center bg-[#2181D9]"
              >
                Kirim
              </button>
            </div>
          </form>
        </div>
        <img
          src="/hero-image.jpg"
          class="h-full w-[45%] object-cover ml-auto"
          height="500"
          width="400"
          alt="Follow Your Dream"
        />
        <div
          class="h-[136px] md:h-[160px] lg:h-[200px] w-[136px] md:w-[160px] lg:w-[200px] bg-yellow-500 rounded-[40px] transform rotate-[-10deg] absolute -bottom-[90px] md:-bottom-[120px] lg:-bottom-[150px] -left-[80px] z-[9]"
        ></div>
        <div
          class="h-[136px] md:h-[160px] lg:h-[200px] w-[136px] md:w-[160px] lg:w-[200px] bg-green-600 rounded-[40px] transform rotate-[-10deg] absolute -bottom-[40px] md:-bottom-[80px] lg:-bottom-[110px] -left-[50px] z-[8]"
        ></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.header-bg-linear {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0,
    rgba(0, 0, 0, 0.6) 77.61%,
    rgba(0, 0, 0, 0.6) 100%
  );
}
@media (min-width: 300px) {
  #promo .daftar-promo .swiper-slide {
    width: 78%;
  }
}
@media (min-width: 768px) {
  #promo .daftar-promo .swiper-slide {
    width: 66%;
  }
}
@media (min-width: 1024px) {
  #promo .daftar-promo .swiper-slide {
    width: 46%;
  }
}
@media (min-width: 1240px) {
  #promo .daftar-promo .swiper-slide {
    width: 40%;
  }
}
@media (min-width: 1400px) {
  #promo .daftar-promo .swiper-slide {
    width: auto;
  }
}
</style>
