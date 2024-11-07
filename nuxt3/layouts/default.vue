<script setup>
import { useWebsiteStore } from "@/stores/website";
import { useUserStore } from "@/stores/user";

const WebsiteStore = useWebsiteStore();
const UserStore = useUserStore();

onMounted(() => {
  UserStore.checkLogin();
});
</script>
<template>
  <div>
    <Nav />
    <AsideNavMobile :is-show="WebsiteStore.showNavLeftMobile" />
    <NavSearch :is-show="WebsiteStore.showNavSearch" />
    <WishListRight :is-show="WebsiteStore.showWishList" />
    <slot />
    <ModalLogin :is-show="WebsiteStore.showModalLogin" />
    <ModalRegistration :is-show="WebsiteStore.showModalRegistration" />
    <LoaderBasic :is-show="WebsiteStore.showLoader" />
    <CoverBody :is-show="WebsiteStore.showCoverBody" />
    <Toast :is-show="WebsiteStore.showToast"/>
    <Footer />
  </div>
</template>
