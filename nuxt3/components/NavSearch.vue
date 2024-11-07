<script setup>
import { useWebsiteStore } from "@/stores/website";
import { useDestinasiStore } from "@/stores/destinasi";
import { ref, computed } from "vue";
const DestinasiStore = useDestinasiStore();
const PaketStore = usePaketStore();
defineProps(["isShow"]);
const isShowFormHeader = ref(false);
const HeaderFormArticleList = ref({
  paket: [],
  destinasi: [],
});
const searchString = ref("");
const onSearchDestinasi = () => {
  searchString.value.length > 1
    ? (isShowFormHeader.value = true)
    : (isShowFormHeader.value = false);

  const query = searchString.value.toLowerCase();
  HeaderFormArticleList.value.destinasi = DestinasiStore.DestinasiList.filter(
    (item) => item.name.toLowerCase().includes(query)
  );
  HeaderFormArticleList.value.paket = PaketStore.PaketList.filter((item) =>
    item.name.toLowerCase().includes(query)
  );
};
</script>
<template>
  <div
    class="h-[90px] md:h-[100px] w-full flex items-center fixed left-0 z-40 border-b border-slate-200 transition-all duration-500 bg-white"
    :class="isShow ? 'top-[80px]' : '-top-[80px]'"
  >
    <div class="container relative">
      <form class="w-full">
        <div
          class="relative w-full h-[50px] md:h-[60px] bg-slate-100 rounded-full overflow-hidden text-gray-700"
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
            type="text"
            v-model="searchString"
            @keyup="onSearchDestinasi"
            class="bg-slate-100 h-full w-full pl-[44px] md:pl-[50px] pr-[100px] md:pr-[130px] lg:pr-[150px] text-sm md:text-base font-medium text-gray-800"
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
        class="flex-col w-[95%] absolute top-[110%] left-1/2 transform -translate-x-1/2 shadow bg-white rounded py-2 px-2"
        :class="isShowFormHeader ? 'flex' : 'hidden'"
      >
        <p class="font-semibold text-sm text-gray-800 px-2 py-1">Destinasi</p>
        <article v-for="post in HeaderFormArticleList.destinasi" :key="post.id">
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
        <p class="font-semibold text-sm text-gray-800 px-2 py-1 mt-1">Paket</p>
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
  </div>
</template>
