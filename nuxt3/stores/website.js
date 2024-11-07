import { defineStore } from "pinia";
import { ref } from "vue";

export const useWebsiteStore = defineStore("website", () => {
  const showModalLogin = ref(false);
  const showModalRegistration = ref(false);
  const showModalGallery = ref(false);
  const showLoader = ref(false);
  const showNavLeftMobile = ref(false);
  const showNavLeftMobileDashboard = ref(false);
  const showWishList = ref(false)
  const showNavSearch = ref(false);
  const showCoverBody = ref(false);
  const showToast = ref(false);
  const toastData = ref({
    status: null,
    text: "",
  });

  const onModalLogin = (action) =>
    action === "open"
      ? (showModalLogin.value = true)
      : (showModalLogin.value = false);
  const onModalRegister = (action) =>
    action === "open"
      ? (showModalRegistration.value = true)
      : (showModalRegistration.value = false);

  return {
    showModalLogin,
    showModalRegistration,
    showModalGallery,
    showLoader,
    showNavLeftMobile,
    showNavLeftMobileDashboard,
    showWishList,
    showNavSearch,
    showCoverBody,
    showToast,
    toastData,
    onModalLogin,
    onModalRegister,
  };
});
