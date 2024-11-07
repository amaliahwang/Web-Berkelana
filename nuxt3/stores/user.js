import { defineStore } from "pinia";
import { useWebsiteStore } from "./website";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const websiteStore = useWebsiteStore();

  const isLogged = ref(false);
  const isRole = ref(null);
  const User = ref({});
  const WishList = ref(0);
  const UserPayment = ref({});

  const Logout = () => {
    isLogged.value = false;
    isRole.value = null;
    localStorage.removeItem("USER");
    return navigateTo("/");
  };

  const handleLogin = async (data) => {
    const { token, user } = data.data;

    const About = await $fetch(`https://api.amarafiif.my.id/api/v1/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // const WishList = await $fetch(`https://api.amarafiif.my.id/api/v1/wish-list`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    // });

    // console.log(WishList)

    const parseUserData = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: token,
      about: About,
    };

    isLogged.value = true;
    isRole.value = user.role;
    User.value = parseUserData;
    localStorage.setItem("USER", JSON.stringify(parseUserData));
    // CLOSE MODAL LOGIN
    websiteStore.showModalLogin = false;
  };

  const checkLogin = () => {
    const dataLocalStorage = localStorage.getItem("USER");
    if (dataLocalStorage) {
      User.value = JSON.parse(dataLocalStorage);
      isLogged.value = true;
      isRole.value = User.value.role;
    }
  };

  const changeUser = (data) => {
    const dataLocalStorage = localStorage.getItem("USER");
    const parsingData = JSON.parse(dataLocalStorage);
    parsingData.about = data;
    User.value = parsingData;
    localStorage.setItem("USER", JSON.stringify(parsingData));
  };

  const checkPaymentPage = (id) => {
    const dataPaymentLocalStorage = localStorage.getItem("PAYMENT");
    if (dataPaymentLocalStorage) {
      UserPayment.value = JSON.parse(dataPaymentLocalStorage);
      if (UserPayment.value.id != id) {
        return navigateTo("/");
      }
    }
  };

  return {
    isLogged,
    isRole,
    User,
    WishList,
    UserPayment,
    Logout,
    handleLogin,
    checkLogin,
    changeUser,
    checkPaymentPage,
  };
});
