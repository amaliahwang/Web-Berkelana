import { useUserStore } from "@/stores/user";
export default defineNuxtRouteMiddleware((to, from) => {
  const UserStore = useUserStore();
  if (!UserStore.isLogged) return navigateTo("/");
});
