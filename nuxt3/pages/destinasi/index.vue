<script setup>
import { useDestinasiStore } from "@/stores/destinasi";
import { formatCurrencyToRupiah } from "@/library/formatStringNumber";
import { ref } from "vue";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

const DestinasiStore = useDestinasiStore();
const Route = useRoute();
const setUrutkan = ref("terbaru");
const textUrutkan = ref("Terbaru");
const isShowDropdown = ref(false);
const isShowFormHeader = ref(false);
const activeKategori = ref("semua");
const DestinasiList = ref([]);
const DestinasiListFiltered = ref([]);
const HeaderFormArticleList = ref([]);
const searchString = ref("");

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
  let allDestinasi = [];

  if (DestinasiStore.DestinasiList.length > 0) {
    allDestinasi = DestinasiStore.DestinasiList;
  } else if (destinasiData.value && destinasiData.value.destinations) {
    allDestinasi = destinasiData.value.destinations;
  }

  const destinasiRemovedRp = allDestinasi.map((item) => ({
    ...item,
    price: parseInt(item.price.replace("Rp.", "").replace(".", "")),
  }));

  const allDestinasiFilterByCategory =
    activeKategori.value == "semua"
      ? destinasiRemovedRp
      : destinasiRemovedRp.filter((item) =>
          item.category.toLowerCase().includes(activeKategori.value)
        );

  let allDestinasiFilterByUrutkan = [];
  if (setUrutkan.value == "terbaru") {
    allDestinasiFilterByUrutkan = allDestinasiFilterByCategory;
  } else {
    if (setUrutkan.value == "mahal") {
      allDestinasiFilterByUrutkan = allDestinasiFilterByCategory
        .slice()
        .sort((a, b) => b.price - a.price);
    } else if (setUrutkan.value == "murah") {
      allDestinasiFilterByUrutkan = allDestinasiFilterByCategory
        .slice()
        .sort((a, b) => a.price - b.price);
    }
  }

  return allDestinasiFilterByUrutkan;
});

const onSearchDestinasi = () => {
  searchString.value.length > 1
    ? (isShowFormHeader.value = true)
    : (isShowFormHeader.value = false);

  const query = searchString.value.toLowerCase();
  HeaderFormArticleList.value = filteredDestinasi.value.filter((item) =>
    item.name.toLowerCase().includes(query)
  );
};

const onChangeCategory = (name) => {
  activeKategori.value = name;
};

useHead({
  title: "Destinasi Terbaik Yang Ada Di Yogyakarta",
});

onMounted(() => {
  Route.query.category ? onChangeCategory(Route.query.category) : "";
  const headerSwiper = new Swiper(".header-swiper", {
    slidesPerView: 1,
    spaceBetween: 0,
    observer: true,
    speed: 888,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".destinasi-header-swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return `<div class="${className} destinasi-header-swiper-pagination-item"></div>`;
      },
    },
    navigation: {
      nextEl: ".header-swiper-button-next",
      prevEl: ".header-swiper-button-prev",
    },
  });
});
</script>
<template>
  <!-- SECTION -->
  <div class="pt-[100px] md:pt-[105px] pb-[20px] md:pb-[25px]">
    <div class="container">
      <h2
        class="text-xs tracking-wide text-[#0084FF] font-semibold flex items-center gap-x-2 md:gap-x-3"
      >
        <span>Berkelana</span>
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
        <span>Destinasi</span>
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
        <span>Pilihan Destinasi</span>
      </h2>
    </div>
  </div>
  <!-- HEADER -->
  <header
    class="relative h-[400px] sm:h-[420px] md:h-[520px] lg:h-[600px] w-screen max-w-[1660px]"
  >
    <div
      class="container absolute left-1/2 transform -translate-x-1/2 h-full flex items-end pb-16 z-30"
    >
      <div class="flex items-center">
        <div>
          <p
            class="font-semibold text-[14px] md:text-[15px] lg:text-[18px] text-white"
          >
            Cari tempat untuk Berkelana
          </p>
          <h1
            class="font-extrabold text-[30px] md:text-[35px] lg:text-[44px] text-white leading-snug md:whitespace-nowrap"
          >
            Temukan destinasi<br />wisata terbaik di Yogyakarta
          </h1>
          <div
            class="relative w-full sm:w-[640px] md:w-[620px] lg:w-[700px] mt-5"
          >
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
              <article v-for="post in HeaderFormArticleList" :key="post.id">
                <NuxtLink
                  :to="`/destinasi/${post.id}`"
                  class="flex items-center gap-x-3 bg-white hover:bg-slate-100 py-2 px-3 rounded"
                >
                  <strong
                    class="block w-[50px] md:w-[60px] font-semibold text-[10px] md:text-xs text-[#0084FF]"
                    >{{ post.category }}</strong
                  >
                  <h4
                    class="grow font-medium text-[15px] md:text-lg text-[#20202C]"
                  >
                    {{ post.name }}
                  </h4>
                </NuxtLink>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- PAGINATION -->
    <div class="absolute bottom-2.5 right-8 md:right-10 z-40">
      <div class="destinasi-header-swiper-pagination"></div>
    </div>
    <!-- BACKGROUND LINEAR -->
    <div
      class="absolute left-0 bottom-0 h-[60vh] w-full z-20 bg-destinasi-linear-cover"
    ></div>
    <!-- SWIPER -->
    <div class="w-full overflow-hidden">
      <div class="swiper-container header-swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img
              class="w-full h-[400px] sm:h-[420px] md:h-[520px] lg:h-[600px] object-cover"
              src="@/assets/images/header-2.jpg"
              height="550"
              width="1200"
              alt="Swiper Slide"
            />
          </div>
          <div class="swiper-slide">
            <img
              class="w-full h-[400px] sm:h-[420px] md:h-[520px] lg:h-[600px] object-cover"
              src="@/assets/images/header-4.jpg"
              height="550"
              width="1200"
              alt="Swiper Slide"
            />
          </div>
          <div class="swiper-slide">
            <img
              class="w-full h-[400px] sm:h-[420px] md:h-[520px] lg:h-[600px] object-cover"
              src="@/assets/images/header-3.jpg"
              height="550"
              width="1200"
              alt="Swiper Slide"
            />
          </div>
        </div>
      </div>
    </div>
  </header>
  <!-- CATEGORY -->
  <div>
    <div class="container pt-8 pb-5 md:pb-6">
      <div class="flex flex-wrap items-center justify-between">
        <div class="flex flex-wrap items-center gap-2">
          <button
            type="button"
            @click="onChangeCategory('semua')"
            :class="
              activeKategori == 'semua'
                ? 'text-white bg-[#2181D9]'
                : 'bg-slate-100 hover:bg-slate-200 text-gray-700'
            "
            class="whitespace-nowrap text-[13px] font-semibold border py-2 px-3 rounded-full"
          >
            Semua Kategori
          </button>
          <button
            type="button"
            @click="onChangeCategory('pantai')"
            :class="
              activeKategori == 'pantai'
                ? 'text-white bg-[#2181D9]'
                : 'bg-slate-100 hover:bg-slate-200 text-gray-700'
            "
            class="whitespace-nowrap text-[13px] font-semibold border py-2 px-3 rounded-full"
          >
            Pantai
          </button>
          <button
            type="button"
            @click="onChangeCategory('alam')"
            :class="
              activeKategori == 'alam'
                ? 'text-white bg-[#2181D9]'
                : 'bg-slate-100 hover:bg-slate-200 text-gray-700'
            "
            class="whitespace-nowrap text-[13px] font-semibold border py-2 px-3 rounded-full"
          >
            Alam
          </button>
          <button
            type="button"
            @click="onChangeCategory('kuliner')"
            :class="
              activeKategori == 'kuliner'
                ? 'text-white bg-[#2181D9]'
                : 'bg-slate-100 hover:bg-slate-200 text-gray-700'
            "
            class="whitespace-nowrap text-[13px] font-semibold border py-2 px-3 rounded-full"
          >
            Kuliner
          </button>
          <button
            type="button"
            @click="onChangeCategory('sejarah')"
            :class="
              activeKategori == 'sejarah'
                ? 'text-white bg-[#2181D9]'
                : 'bg-slate-100 hover:bg-slate-200 text-gray-700'
            "
            class="whitespace-nowrap text-[13px] font-semibold border py-2 px-3 rounded-full"
          >
            Sejarah
          </button>
          <button
            type="button"
            @click="onChangeCategory('keluarga')"
            :class="
              activeKategori == 'keluarga'
                ? 'text-white bg-[#2181D9]'
                : 'bg-slate-100 hover:bg-slate-200 text-gray-700'
            "
            class="whitespace-nowrap text-[13px] font-semibold border py-2 px-3 rounded-full"
          >
            Keluarga
          </button>
        </div>
        <div class="flex items-center gap-x-4 mt-5 md:mt-0">
          <div
            class="relative flex items-center gap-x-2 cursor-pointer"
            @click="isShowDropdown = !isShowDropdown"
          >
            <strong class="font-semibold text-sm md:text-base text-gray-900"
              >Urutkan:</strong
            >
            <button
              type="button"
              class="flex items-center gap-x-4 bg-white text-[16px] font-medium text-gray-900 border border-slate-200 py-2 pl-4 pr-2 rounded-md"
            >
              {{ textUrutkan }}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            <!-- DROPDOWN -->
            <div
              @click.stop
              v-if="isShowDropdown"
              class="z-30 absolute top-[130%] right-0 flex flex-col gap-y-2 md:gap-y-3 py-3 md:py-4 px-4 md:px-5 bg-slate-100 font-medium text-sm text-gray-900 border border-slate-200 rounded"
            >
              <p
                @click="
                  textUrutkan = 'Terbaru';
                  setUrutkan = 'terbaru';
                  isShowDropdown = false;
                "
              >
                Terbaru
              </p>
              <p
                @click="
                  textUrutkan = 'Harga (Rendah ke Tinggi)';
                  setUrutkan = 'murah';
                  isShowDropdown = false;
                "
              >
                Harga (Rendah ke Tinggi)
              </p>
              <p
                @click="
                  textUrutkan = 'Harga (Tinggi ke Rendah)';
                  setUrutkan = 'mahal';
                  isShowDropdown = false;
                "
              >
                Harga (Tinggi ke Rendah)
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between mt-8 md:mt-12 lg:mt-14">
        <h2 class="font-semibold text-2xl md:text-3xl text-gray-900">
          {{ filteredDestinasi.length }} Destinasi ditemukan
        </h2>
      </div>
    </div>
  </div>
  <!-- MAIN -->
  <main class="pb-[100px] md:pb-[140px] lg:pb-[160px]">
    <div class="container">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <DestinasiCard
          v-for="post in filteredDestinasi"
          :key="post"
          :images="`${post.thumbnail}`"
          :swiper-slide="false"
          :category="post.category"
          :title="post.name"
          rate="4.8"
          :slug="post.id"
          :price="`Rp ${formatCurrencyToRupiah(post.price)}`"
        />
      </div>
      <!-- PAGINATION -->
      <div
        class="flex items-center justify-center md:justify-end gap-x-2 md:gap-x-3 mt-8 md:mt-10 lg:mt-12"
      >
        <button
          type="button"
          class="bg-slate-100 text-gray-700 font-semibold text-sm md:text-base h-[40px] md:h-[46px] lg:h-[50px] w-[40px] md:w-[46px] lg:w-[50px] inline-flex justify-center items-center border rounded-md"
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
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            />
          </svg>
        </button>
        <button
          type="button"
          class="bg-[#2181D9] text-white font-semibold text-sm md:text-base h-[40px] md:h-[46px] lg:h-[50px] w-[40px] md:w-[46px] lg:w-[50px] inline-flex justify-center items-center border rounded-md"
        >
          1
        </button>
        <button
          type="button"
          class="bg-slate-100 text-gray-700 font-semibold text-sm md:text-base h-[40px] md:h-[46px] lg:h-[50px] w-[40px] md:w-[46px] lg:w-[50px] inline-flex justify-center items-center border rounded-md"
        >
          2
        </button>
        <button
          type="button"
          class="bg-slate-100 text-gray-700 font-semibold text-sm md:text-base h-[40px] md:h-[46px] lg:h-[50px] w-[40px] md:w-[46px] lg:w-[50px] inline-flex justify-center items-center border rounded-md"
        >
          3
        </button>
        <button
          type="button"
          class="bg-slate-100 text-gray-700 font-semibold text-sm md:text-base h-[40px] md:h-[46px] lg:h-[50px] w-[40px] md:w-[46px] lg:w-[50px] inline-flex justify-center items-center border rounded-md"
        >
          4
        </button>
        <button
          type="button"
          class="bg-slate-100 text-gray-700 font-semibold text-sm md:text-base h-[40px] md:h-[46px] lg:h-[50px] w-[40px] md:w-[46px] lg:w-[50px] inline-flex justify-center items-center border rounded-md"
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
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
      </div>
    </div>
  </main>
</template>
<style>
.destinasi-header-swiper-pagination-item {
  background-color: white;
  height: 16px;
  width: 16px;
}
.bg-destinasi-linear-cover {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0,
    rgba(0, 0, 0, 0.6) 77.61%,
    rgba(0, 0, 0, 0.6) 100%
  );
}
</style>
