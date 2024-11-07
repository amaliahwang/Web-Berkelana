import { useWebsiteStore } from "@/stores/website";

export const showToastFunction = (status, text) => {
  const WebsiteStore = useWebsiteStore();
  WebsiteStore.toastData = {
    status: status,
    text: text,
  };
  WebsiteStore.showToast = true;

  setTimeout(() => {
    WebsiteStore.toastData = {
      status: "",
      text: "",
    };
    WebsiteStore.showToast = false;
  }, 2500);
};
