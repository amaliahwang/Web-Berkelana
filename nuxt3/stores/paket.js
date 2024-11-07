import { defineStore } from "pinia";
import { ref } from "vue";

export const usePaketStore = defineStore("paket", () => {
  const PaketList = ref([]);

  return {
    PaketList,
  };
});
