import { defineStore } from "pinia";
import { ref } from "vue";

export const useDestinasiStore = defineStore("destinasi", () => {
  const DestinasiList = ref([]);

  return {
    DestinasiList,
  };
});
