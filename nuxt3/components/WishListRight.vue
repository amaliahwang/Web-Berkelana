<script setup>
import { ref, computed } from "vue";
import { useWebsiteStore } from "@/stores/website";
import { useUserStore } from "@/stores/user";

const WebsiteStore = useWebsiteStore();
const UserStore = useUserStore();
</script>
<template>
    <aside class="w-[330px] fixed top-[80px] z-[70] bg-slate-100 transition-all duration-500 border-l border-slate-200 shadow overflow-y-auto" :class="WebsiteStore.showWishList ? 'right-0' : '-right-[120%]'" style="height: calc(100vh - 80px);">
        <!-- IF NOT DATA -->
        <div class="relative h-full w-full items-center justify-center hidden">
            <div>
                <button class="h-10 w-10 rounded-full flex items-center justify-center absolute top-5 right-5 bg-gray-900 text-white" type="button" @click="WebsiteStore.showWishList = false">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
                <img class="w-1/2 mx-auto" src="/not-found-cart.svg" height="400" width="400" alt="Svg" />
                <h3 class="font-medium text-lg text-gray-600 text-center mt-3">Tidak Ada Data</h3>
            </div>
        </div>
        <!-- WITH DATA -->
        <div class="px-5 py-5">
            <div class="items-center justify-between hidden">
                <h2 class="font-semibold text-2xl text-gray-900">Wishlist</h2>
                <button class="h-8 w-8 rounded-full flex items-center justify-center absolute top-5 right-5 bg-gray-900 text-white" type="button" @click="WebsiteStore.showWishList = false">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div class="flex flex-col gap-y-3 mt-5">
                <WishListCard />
                <WishListCard />
                <WishListCard />
                <WishListCard />
                <WishListCard />
                <WishListCard />
                <WishListCard />
                <WishListCard />
                <WishListCard />
            </div>
        </div>
    </aside>
</template>