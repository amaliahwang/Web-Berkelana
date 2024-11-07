<script setup>
defineProps(["isShow"]);
import { useWebsiteStore } from "@/stores/website";

const WebsiteStore = useWebsiteStore();
</script>
<template>
  <div
    class="h-screen w-screen fixed top-0 left-0 z-[60] items-center justify-center"
    :class="isShow ? 'flex' : 'hidden'"
    style="background-color: rgba(21, 25, 34, 0.75)"
    @click="WebsiteStore.showCoverBody = false; WebsiteStore.showNavLeftMobile = false"
  ></div>
</template>
