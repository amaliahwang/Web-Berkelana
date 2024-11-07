<script setup>
import { useWebsiteStore } from "@/stores/website";
import { useUserStore } from "@/stores/user";
import { useDestinasiStore } from "@/stores/destinasi";
import { formatCurrencyToRupiah } from "@/library/formatStringNumber";
import { generateRandomString } from "@/library/randomString";
import { ref, computed } from "vue";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

const Route = useRoute();
const WebsiteStore = useWebsiteStore();
const UserStore = useUserStore();
const DestinasiStore = useDestinasiStore();
const isSelectedDate = false;
const showModalGallery = ref(false);
const imagesGallery = ref([
  "blog-1.jpg",
  "blog-2.jpg",
  "blog-3.jpg",
  "blog-5.jpg",
  "blog-6.jpg",
  "blog-7.jpg",
  "blog-8.jpg",
]);

const { data: destinationPackage, error } = useFetch(
  `https://api.amarafiif.my.id/api/v1/destination-package/${Route.params.slug}`
);

useHead({
  title: "Paket Liburan Terbaik Ada Disini",
});

const onPesanTiket = () => {
  WebsiteStore.showLoader = true;
  const randomStr = generateRandomString(10);
  const dataToStore = {
    idArticle: destinationPackage.value.package.id,
    titleArticle: destinationPackage.value.package.name,
    priceArticle: parseInt(
      destinationPackage.value.package.price.replace(/Rp\.|\./g, "")
    ),
    imageArticle: destinationPackage.value.package.thumbnail,
    ticketDate: "2024-03-06",
    id: randomStr,
  };

  UserStore.UserPayment = dataToStore;
  localStorage.setItem("PAYMENT", JSON.stringify(dataToStore));
  setTimeout(() => {
    WebsiteStore.showLoader = false;
    return navigateTo(`/pembayaran/${randomStr}`);
  }, 2000);
};

onMounted(() => {
  const tiketTersediaSwiper = new Swiper(".tiket-tersedia-swiper", {
    observer: true,
    observeSlideChildren: true,
    observeParents: true,
    resizeObserver: true,
    slidesPerView: "auto",
    spaceBetween: 10,
  });

  const daftarWisataSwiper = new Swiper(".daftar-paket-lain-swiper", {
    observer: true,
    observeSlideChildren: true,
    observeParents: true,
    resizeObserver: true,
    slidesPerView: 4,
    spaceBetween: 16,
    navigation: {
      nextEl: ".another-swiper-button-next",
      prevEl: ".another-swiper-button-prev",
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

  const testimoniSwiper = new Swiper(".testimoni-swiper", {
    observer: true,
    observeSlideChildren: true,
    observeParents: true,
    resizeObserver: true,
    slidesPerView: "auto",
    centeredSlides: true,
    loop: true,
    breakpoints: {
      300: {
        spaceBetween: 10,
      },
      768: {
        spaceBetween: 12,
      },
      1024: {
        spaceBetween: 12,
      },
      1240: {
        spaceBetween: 16,
      },
    },
  });
});
</script>
<template>
  <div v-if="destinationPackage">
    <Head>
      <Title>{{ destinationPackage.package.name }}</Title>
    </Head>
    <!-- SECTION -->
    <BeforeHeaderDestinasiPaket
      :title="destinationPackage.package.name"
      category="Berkelana"
      page="Paket"
    ></BeforeHeaderDestinasiPaket>
    <!-- HEADER -->
    <HeaderDestinasiPaket
      :primary-image="destinationPackage.package.thumbnail"
      :list-images="imagesGallery"
      @open-modal-gallery="showModalGallery = true"
    />
    <!-- MAIN -->
    <main class="pb-20">
      <div class="container pt-[45px]">
        <div class="flex flex-wrap items-start gap-x-[30px]">
          <div
            class="w-full border border-slate-200 bg-white p-4 md:p-5 rounded-md mb-5"
          >
            <div class="flex items-center gap-x-2.5 md:gap-x-3">
              <div
                class="h-8 md:h-8 lg:h-10 w-8 md:w-8 lg:w-10 bg-[#2181D9] text-white rounded-full flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 md:w-5 h-4 md:h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                  />
                </svg>
              </div>
              <h3 class="font-semibold text-base md:text-lg text-gray-900">
                Tiket Yang Tersedia
              </h3>
            </div>
            <div
              class="flex md:flex-nowrap flex-wrap items-stretch gap-x-[10px] mt-5"
            >
              <div
                class="w-full md:w-[400px] lg:w-[500px] h-[170px] flex-none bg-slate-100 border border-slate-200 rounded-md"
              >
                <article
                  class="w-full flex flex-wrap md:flex-nowrap items-start gap-x-5 border border-slate-200 p-5 rounded-md"
                >
                  <div class="grow w-full">
                    <h2
                      class="font-semibold text-base text-gray-900 mb-2 md:mb-0"
                    >
                      {{ destinationPackage.package.name }}
                    </h2>
                  </div>
                  <div class="w-full md:w-[220px] flex-none">
                    <div class="flex items-center gap-x-2 mb-2">
                      <p class="font-semibold text-orange-600 text-lg">
                        Rp.
                        {{
                          formatCurrencyToRupiah(
                            destinationPackage.package.price
                          )
                        }}
                      </p>
                      <p
                        class="font-semibold text-gray-500 text-[13px] line-through"
                      >
                        Rp.
                        {{
                          formatCurrencyToRupiah(
                            parseInt(destinationPackage.package.price) + 30000
                          )
                        }}
                      </p>
                    </div>
                    <button
                      type="button"
                      @click="onPesanTiket"
                      class="inline-block w-full py-2.5 rounded-md text-center font-semibold text-base text-white bg-[#2181D9]"
                    >
                      Pilih Paket
                    </button>
                  </div>
                </article>
              </div>
              <!-- SWIPER TIKET TERSEDIA -->
              <div
                class="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-2 w-full md:grow mt-4 md:mt-0"
              >
                <div
                  class="w-full h-[110px] md:h-[150px] flex items-center cursor-pointer justify-center bg-white border border-slate-200 rounded-md"
                >
                  <div>
                    <p
                      class="font-semibold text-gray-500 text-xs md:text-sm text-center mb-1"
                    >
                      Tanggal
                    </p>
                    <strong
                      class="font-semibold text-gray-900 text-sm md:text-base"
                      >06 Maret</strong
                    >
                  </div>
                </div>
                <div
                  class="w-full h-[110px] md:h-[150px] flex items-center cursor-pointer justify-center bg-white border border-slate-200 rounded-md"
                >
                  <div>
                    <p
                      class="font-semibold text-gray-500 text-xs md:text-sm text-center mb-1"
                    >
                      Tanggal
                    </p>
                    <strong
                      class="font-semibold text-gray-900 text-sm md:text-base"
                      >07 Maret</strong
                    >
                  </div>
                </div>
                <div
                  class="w-full h-[110px] md:h-[150px] flex items-center cursor-pointer justify-center bg-white border border-slate-200 rounded-md"
                >
                  <div>
                    <p
                      class="font-semibold text-gray-500 text-xs md:text-sm text-center mb-1"
                    >
                      Tanggal
                    </p>
                    <strong
                      class="font-semibold text-gray-900 text-sm md:text-base"
                      >08 Maret</strong
                    >
                  </div>
                </div>
                <div
                  class="w-full h-[110px] md:h-[150px] flex items-center cursor-pointer justify-center bg-white border border-slate-200 rounded-md"
                >
                  <div>
                    <p
                      class="font-semibold text-gray-500 text-xs md:text-sm text-center mb-1"
                    >
                      Tanggal
                    </p>
                    <strong
                      class="font-semibold text-gray-900 text-sm md:text-base"
                      >09 Maret</strong
                    >
                  </div>
                </div>
                <div
                  class="w-full h-[110px] md:h-[150px] flex items-center cursor-pointer justify-center bg-white border border-slate-200 rounded-md"
                >
                  <div>
                    <p
                      class="font-semibold text-gray-500 text-xs md:text-sm text-center mb-1"
                    >
                      Tanggal
                    </p>
                    <strong
                      class="font-semibold text-gray-900 text-sm md:text-base"
                      >10 Maret</strong
                    >
                  </div>
                </div>
                <div
                  class="w-full h-[110px] md:h-[150px] flex items-center cursor-pointer justify-center bg-white border border-slate-200 rounded-md"
                >
                  <div>
                    <p
                      class="font-semibold text-gray-500 text-xs md:text-sm text-center mb-1"
                    >
                      Tanggal
                    </p>
                    <strong
                      class="font-semibold text-gray-900 text-sm md:text-base"
                      >11 Maret</strong
                    >
                  </div>
                </div>
                <div
                  class="w-full h-[110px] md:h-[150px] flex items-center cursor-pointer justify-center bg-white border border-slate-200 rounded-md"
                >
                  <div>
                    <p
                      class="font-semibold text-gray-500 text-xs md:text-sm text-center mb-1"
                    >
                      Tanggal
                    </p>
                    <strong
                      class="font-semibold text-gray-900 text-sm md:text-base"
                      >12 Maret</strong
                    >
                  </div>
                </div>
                <div
                  class="w-full h-[110px] md:h-[150px] flex items-center cursor-pointer justify-center bg-white border border-slate-200 rounded-md"
                >
                  <div>
                    <p
                      class="font-semibold text-gray-500 text-xs md:text-sm text-center mb-1"
                    >
                      Tanggal
                    </p>
                    <strong
                      class="font-semibold text-gray-900 text-sm md:text-base"
                      >13 Maret</strong
                    >
                  </div>
                </div>
                <div
                  class="w-full h-[110px] md:h-[150px] flex items-center cursor-pointer justify-center bg-white border border-slate-200 rounded-md"
                >
                  <div>
                    <p
                      class="font-semibold text-gray-500 text-xs md:text-sm text-center mb-1"
                    >
                      Tanggal
                    </p>
                    <strong
                      class="font-semibold text-gray-900 text-sm md:text-base"
                      >14 Maret</strong
                    >
                  </div>
                </div>
                <div
                  class="w-full h-[110px] md:h-[150px] flex items-center cursor-pointer justify-center bg-white border border-slate-200 rounded-md"
                >
                  <div>
                    <p
                      class="font-semibold text-gray-500 text-xs md:text-sm text-center mb-1"
                    >
                      Tanggal
                    </p>
                    <strong
                      class="font-semibold text-gray-900 text-sm md:text-base"
                      >15 Maret</strong
                    >
                  </div>
                </div>
                <div
                  class="w-full h-[110px] md:h-[150px] flex items-center cursor-pointer justify-center bg-white border border-slate-200 rounded-md"
                >
                  <div>
                    <p
                      class="font-semibold text-gray-500 text-xs md:text-sm text-center mb-1"
                    >
                      Tanggal
                    </p>
                    <strong
                      class="font-semibold text-gray-900 text-sm md:text-base"
                      >16 Maret</strong
                    >
                  </div>
                </div>
                <div
                  class="w-full h-[110px] md:h-[150px] flex items-center cursor-pointer justify-center bg-white border border-slate-200 rounded-md"
                >
                  <div>
                    <p
                      class="font-semibold text-gray-500 text-xs md:text-sm text-center mb-1"
                    >
                      Tanggal
                    </p>
                    <strong
                      class="font-semibold text-gray-900 text-sm md:text-base"
                      >17 Maret</strong
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full">
            <div
              class="w-full flex flex-wrap md:flex-nowrap items-stretch gap-x-5 gap-y-4"
            >
              <AboutDestinasiPaket
                :title="destinationPackage.package.name"
                :address="
                  destinationPackage.package.destinations[0].destination
                    .location
                "
                :description="
                  destinationPackage.package.destinations[0].destination
                    .description
                "
              />
              <FasilitasDestinasiPaket
                :facility="
                  destinationPackage.package.destinations[0].destination
                    .facility
                "
              />
            </div>
            <TestimoniDestinasiPaket class="mt-5" />
            <!-- LIST LOKASI -->
            <div
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 md:mt-5"
            >
              <MapDestinasiPaket
                v-for="(map, index) in destinationPackage.package.destinations"
                :lokasi="map.destination.locationMaps"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
    <ModalGallery
      :is-show="showModalGallery"
      :src-gallery="imagesGallery"
      @close-modal="showModalGallery = false"
    />
  </div>
  <div v-if="false">
    <LoaderBasic :is-show="destinasiArticle == null" />
    <div class="h-screen"></div>
  </div>
</template>
