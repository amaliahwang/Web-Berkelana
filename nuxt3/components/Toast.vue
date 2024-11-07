<script setup>
defineProps(["isShow"]);
import { ref } from "vue";
import { useWebsiteStore } from "@/stores/website";

const WebsiteStore = useWebsiteStore();
</script>
<template>
  <!-- TOAST -->
  <div v-if="isShow">
    <div
      id="toats"
      :class="`toast-${WebsiteStore.toastData.status}`"
      class="fixed bottom-10 right-10 py-5 pl-5 pr-10 z-[80] rounded-lg shadow-lg flex items-center justify-center gap-x-5"
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
          d="m4.5 12.75 6 6 9-13.5"
        />
      </svg>
      <h3
        class="max-w-[270px] md:max-w-[300px] lg:max-w-[340px] font-semibold text-sm md:text-base text-inherit"
      >
        {{ WebsiteStore.toastData.text }}
      </h3>
    </div>
  </div>
</template>
<style scoped>
.toast-success {
  background-color: #d9e9dd;
  color: #7eaa8a;
}
.toast-failed {
  background-color: #fac4ce;
  color: #8d4254;
}
.toast-warning {
  background-color: #eec9a8;
  color: #eec9a8;
}
</style>
