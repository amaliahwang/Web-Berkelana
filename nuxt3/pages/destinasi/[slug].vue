<script setup>
import { ref, computed } from "vue";
import { useWebsiteStore } from "@/stores/website";
import { useUserStore } from "@/stores/user";
import { useDestinasiStore } from "@/stores/destinasi";
import { generateRandomString } from "@/library/randomString";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

const Route = useRoute();
const WebsiteStore = useWebsiteStore();
const UserStore = useUserStore();
const DestinasiStore = useDestinasiStore();
const showModalGallery = ref(false);
const inputDate = ref("");
const inputDateRef = ref(null);
const showWarningInputDate = ref(false);
const imagesGallery = ref([
  "blog-1.jpg",
  "blog-2.jpg",
  "blog-3.jpg",
  "blog-5.jpg",
  "blog-6.jpg",
  "blog-7.jpg",
  "blog-8.jpg",
]);

const { data: destinasiData, pending: destinasiPending } = useFetch(
  `https://api.amarafiif.my.id/api/v1/destination/${Route.params.slug}`,
  {
    method: "GET",
    lazy: true,
  }
);
const destinasiArticle = computed(() => {
  if (destinasiData.value && destinasiData.value.destination) {
    return destinasiData.value.destination;
  } else {
    console.error("Destination data or destination property is not available.");
    return null; // or any other default value you prefer
  }
});

const { data: destinasiAllData, pending: destinasiAllPending } = useFetch(
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
    if (destinasiAllData.value && destinasiAllData.value.destinations) {
      return destinasiAllData.value.destinations;
    } else {
      return [];
    }
  } else {
    return DestinasiStore.DestinasiList.length > 7
      ? DestinasiStore.DestinasiList.slice(1, 8)
      : DestinasiStore.DestinasiList;
  }
});

const onPesanTiket = () => {
  showWarningInputDate.value = true;
  if (inputDate.value == "" || inputDate == null) {
    inputDateRef.value.focus();
    return false;
  }
  WebsiteStore.showLoader = true;
  const randomStr = generateRandomString(10);
  const dataToStore = {
    idArticle: destinasiArticle.value.id,
    titleArticle: destinasiArticle.value.name,
    priceArticle: parseInt(
      destinasiArticle.value.price.replace(/Rp\.|\./g, "")
    ),
    imageArticle: destinasiArticle.value.thumbnail,
    ticketDate: inputDate.value,
    id: randomStr,
  };

  UserStore.UserPayment = dataToStore;
  localStorage.setItem("PAYMENT", JSON.stringify(dataToStore));
  showWarningInputDate.value = false;
  setTimeout(() => {
    WebsiteStore.showLoader = false;
    return navigateTo(`/pembayaran/${randomStr}`);
  }, 2000);
};

onMounted(() => {
  const headerSwiper = new Swiper(".header-mobile-swiper", {
    slidesPerView: "auto",
    observer: true,
    observeSlideChildren: true,
    observeParents: true,
    resizeObserver: true,
    spaceBetween: 10,
  });

  const daftarDestinasiSwiper = new Swiper(".daftar-destinasi-swiper", {
    observer: true,
    observeSlideChildren: true,
    observeParents: true,
    resizeObserver: true,
    navigation: {
      nextEl: ".another-swiper-button-next",
      prevEl: ".another-swiper-button-prev",
    },
    breakpoints: {
      300: {
        slidesPerView: "auto",
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 16,
      },
      1240: {
        slidesPerView: 4,
        spaceBetween: 16,
      },
    },
  });
});
</script>
<template>
  <div v-if="destinasiArticle">
    <Head>
      <Title>{{ destinasiArticle.name }}</Title>
    </Head>
    <!-- SECTION -->
    <BeforeHeaderDestinasiPaket
      page="Destinasi"
      :title="destinasiArticle.name"
      :category="destinasiArticle.category"
    ></BeforeHeaderDestinasiPaket>
    <!-- HEADER -->
    <HeaderDestinasiPaket
      :primary-image="destinasiArticle.thumbnail"
      :list-images="imagesGallery"
      @open-modal-gallery="showModalGallery = true"
    />
    <!-- MAIN -->
    <main>
      <div class="container pt-[45px]">
        <div class="flex flex-wrap md:flex-nowrap items-start gap-x-[30px]">
          <div class="order-2 md:order-1 w-full md:w-8/12">
            <AboutDestinasiPaket
              :title="destinasiArticle.name"
              :address="destinasiArticle.location"
              :description="destinasiArticle.description"
            />
            <FasilitasDestinasiPaket
              :facility="destinasiArticle.facility"
              class="mt-5"
            />
            <TestimoniDestinasiPaket class="mt-5" />
            <MapDestinasiPaket
              :lokasi="destinasiArticle.locationMaps"
              class="mt-5"
            />
          </div>
          <aside
            class="order-1 md:order-2 w-full md:w-4/12 fixed md:sticky bottom-0 left-0 md:top-[110px] border border-slate-200 rounded-md bg-white py-3 md:py-4 px-5 border-t md:border-none shadow-lg z-40"
          >
            <p
              class="text-sm font-semibold text-white bg-yellow-500 py-3 rounded text-center mb-2"
              v-if="showWarningInputDate"
            >
              Tolong pilih terlebih dahulu jadwal
            </p>
            <strong
              class="block font-normal text-[12px] md:text-sm text-gray-600 mb-2"
              >Tiket Untuk Tanggal</strong
            >
            <div class="mb-4">
              <input
                ref="inputDateRef"
                type="date"
                v-model="inputDate"
                class="w-full bg-slate-100 px-4 py-3 rounded"
              />
            </div>
            <strong
              class="block font-normal text-[12px] md:text-sm text-gray-600 mb-1"
              >Harga mulai dari</strong
            >
            <p class="text-xs mb-3">
              <strong
                class="font-semibold text-base md:text-2xl lg:text-3xl text-gray-900 pr-1"
                >{{ destinasiArticle.price }}</strong
              >
            </p>
            <button
              type="button"
              @click="onPesanTiket"
              class="py-3.5 w-full font-semibold text-base text-center bg-blue-500 rounded-lg text-white"
            >
              Pesan Tiket Disini
            </button>
          </aside>
        </div>
      </div>
    </main>
    <!-- BORDER -->
    <div>
      <div
        class="container my-10 md:my-14 lg:my-16 h-px w-full bg-slate-200"
      ></div>
    </div>
    <!-- DAFTAR DESTINASI -->
    <section>
      <div class="container pb-[120px]">
        <div class="w-full">
          <h2
            class="font-semibold text-xl md:text-2xl lg:text-3xl text-[#20202C] leading-snug mb-3"
          >
            Kunjungi destinasi favorit wisatawan
          </h2>
          <div class="flex gap-x-6 items-center justify-between">
            <p
              class="font-medium grow text-[14px] md:text-[18px] lg:text-[20px] text-gray-800"
            >
              Masih banyak tempat yang perlu kamu Kunjungi
            </p>
            <div class="flex items-center gap-x-2 md:gap-x-4">
              <button
                type="button"
                class="another-swiper-button-prev h-9 md:h-10 lg:h-11 w-9 md:w-10 lg:w-11 flex items-center justify-center text-gray-900 bg-slate-100 rounded-full"
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
                    d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                  />
                </svg>
              </button>
              <button
                type="button"
                class="another-swiper-button-next h-9 md:h-10 lg:h-11 w-9 md:w-10 lg:w-11 flex items-center justify-center bg-[#2181D9] text-white rounded-full"
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
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="w-full overflow-hidden mt-5">
          <div class="swiper-container daftar-destinasi-swiper">
            <div class="swiper-wrapper">
              <DestinasiCard
                v-for="(post, index) in filteredDestinasi"
                :key="index"
                :images="post.thumbnail"
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
      </div>
    </section>
    <ModalGallery
      :is-show="showModalGallery"
      :src-gallery="imagesGallery"
      @close-modal="showModalGallery = false"
    />
  </div>
  <div v-else>
    <LoaderBasic :is-show="destinasiArticle == null" />
    <div class="h-screen"></div>
  </div>
</template>
