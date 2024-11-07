<script setup>
import { useWebsiteStore } from "@/stores/website";
import { useUserStore } from "@/stores/user";

const WebsiteStore = useWebsiteStore();
const UserStore = useUserStore();

const onClickButton = () => {
    if(UserStore.isLogged) {
        
    } else {
        WebsiteStore.showModalLogin = true 
    }
}
</script>
<template>
  <button
    @click="onClickButton"
    type="button"
    class="h-10 w-10 flex items-center justify-center absolute z-10 text-gray-100 rounded-full"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="rgba(0, 0, 0, 0.85)"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-8 h-8"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      />
    </svg>
  </button>
</template>
