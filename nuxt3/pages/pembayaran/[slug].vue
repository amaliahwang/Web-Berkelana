<script setup>
import { ref, computed } from "vue";
import { useWebsiteStore } from "@/stores/website";
import { useUserStore } from "@/stores/user";
import { formatCurrencyToRupiah } from "@/library/formatStringNumber";

const Route = useRoute();
const WebsiteStore = useWebsiteStore();
const UserStore = useUserStore();
const modalPayment = ref(false);
const inputPromo = ref(null);
const inputName = ref(null);
const inputTelephone = ref(null);
const inputEmail = ref(null);
const inputCountry = ref(null);
const inputBank = ref(null);
const inputAgreement = ref(null);
const discount5k = ref(0);
const promoActive = ref(false);

const dataUserPayment = computed(() => {
  return Object.keys(UserStore.UserPayment).length > 0
    ? UserStore.UserPayment
    : null;
});

const biayaAdmin = computed(() => {
  return 2500;
});

const setInput = ref("");
const setName = ref("");
const setTelephone = ref("");
const setEmail = ref("");
const setCountry = ref("");
const setBank = ref(0);
const setAgreement = ref(false);

const onAddCoupon = () => {
  if (setInput.value.length === 0) return inputPromo.value.focus();
  WebsiteStore.showLoader = true;
  discount5k.value = 5000;
  setTimeout(() => {
    promoActive.value = true;
    WebsiteStore.showLoader = false;
  }, 2000);
};

const onPayment = () => {
  if (setName.value.length === 0) return scrollToInput(inputName);
  if (setTelephone.value.length === 0) return scrollToInput(inputTelephone);
  if (setEmail.value.length === 0) return scrollToInput(inputEmail);
  if (setCountry.value.length === 0) return scrollToInput(inputCountry);
  if (setBank.value === 0) return scrollToInput(inputBank);
  if (setAgreement.value === false) return scrollToInput(inputAgreement);

  modalPayment.value = true;
};

const scrollToInput = (refs) => {
  refs.value.focus();
  const offset = 200;
  const inputRect = refs.value.getBoundingClientRect();
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const targetScrollTop = scrollTop + inputRect.top - offset;
  window.scrollTo({ top: targetScrollTop, behavior: "smooth" });
};

const totalPrice = computed(() => {
  const price = dataUserPayment.value.priceArticle
    ? dataUserPayment.value.priceArticle
    : 0;
  const total =
    parseInt(price) + parseInt(biayaAdmin.value) - parseInt(discount5k.value);
  return total;
});

onMounted(() => {
  UserStore.checkPaymentPage(Route.params.slug);
  UserStore.isLogged ? (biayaAdmin.value = 0) : "";
});

useHead({
  title: "Proses Pembayaran",
});
</script>
<template>
  <div v-if="dataUserPayment">
    <main>
      <div
        class="container relative pt-[110px] md:pt-[120px] lg:pt-[140px] pb-[120px] md:pb-[160px] lg:pb-[180px]"
      >
        <section
          class="w-full md:w-11/12 lg:w-9/12 relative mx-auto mb-6 md:mb-10"
        >
          <h1
            class="font-bold text-[25px] md:text-[32px] lg:text-[36px] text-[#20202C]"
          >
            Proses Pembayaran
          </h1>
          <!-- BUTTON BACK TO BEFORE -->
          <button
            type="button"
            @click="$router.back()"
            title="Batalkan Pembayaran"
            class="h-8 md:h-10 w-8 md:w-10 flex items-center justify-center absolute top-0 right-0 rounded-md text-white bg-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.75"
              stroke="currentColor"
              class="w-5 md:w-7 h-5 md:h-7"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </section>
        <div
          class="w-full md:w-11/12 lg:w-9/12 mx-auto flex flex-wrap md:flex-nowrap gap-x-10"
        >
          <form
            @submit.prevent="onPayment"
            class="order-2 md:order-1 w-full md:w-auto grow"
          >
            <article
              class="bg-white flex flex-col gap-y-5 border border-slate-200 p-5 rounded-md mb-8"
            >
              <h2
                class="font-bold text-[20px] md:text-[25px] lg:text-[28px] text-gray-800"
              >
                Data Diri
              </h2>
              <div>
                <label
                  class="block font-semibold text-base text-gray-800 mb-2"
                  for="full_name"
                  >Nama Lengkap *</label
                >
                <input
                  id="full_name"
                  ref="inputName"
                  v-model="setName"
                  type="text"
                  class="bg-slate-100 py-3 px-4 border border-slate-200 w-full rounded-md"
                  placeholder="Nama Lengkap Anda"
                />
              </div>
              <div>
                <label
                  class="block font-semibold text-base text-gray-800 mb-2"
                  for="telephone"
                  >Nomor Telephone *</label
                >
                <input
                  id="telephone"
                  ref="inputTelephone"
                  v-model="setTelephone"
                  type="text"
                  class="bg-slate-100 py-3 px-4 border border-slate-200 w-full rounded-md"
                  placeholder="Nomor Telephone Anda"
                />
              </div>
              <div>
                <label
                  class="block font-semibold text-base text-gray-800 mb-2"
                  for="email"
                  >Email *</label
                >
                <input
                  id="email"
                  ref="inputEmail"
                  v-model="setEmail"
                  type="text"
                  class="bg-slate-100 py-3 px-4 border border-slate-200 w-full rounded-md"
                  placeholder="Alamat Email Anda"
                />
              </div>
              <div>
                <label
                  class="block font-semibold text-base text-gray-800 mb-2"
                  for="country"
                  >Negara *</label
                >
                <input
                  id="country"
                  ref="inputCountry"
                  v-model="setCountry"
                  type="text"
                  class="bg-slate-100 py-3 px-4 border border-slate-200 w-full rounded-md"
                  placeholder="Negara Asal Anda"
                />
              </div>
            </article>
            <article
              class="bg-white flex flex-col gap-y-5 border border-slate-200 p-5 rounded-md"
            >
              <h2
                class="font-bold text-[20px] md:text-[25px] lg:text-[28px] text-gray-800"
              >
                Metode Pembayaran
              </h2>
              <div ref="inputBank">
                <label
                  class="block font-semibold text-base text-gray-800 mb-2"
                  for="full_name"
                  >Pilih Bank *</label
                >
                <div class="flex flex-wrap md:flex-nowrap gap-3">
                  <button
                    type="button"
                    @click="setBank = 1"
                    class="w-[47%] md:w-1/4 border border-slate-200 rounded py-3 px-3"
                    :class="setBank == 1 ? 'bank-active' : ''"
                  >
                    <img
                      class="h-auto w-[80%] mx-auto"
                      src="/payment-bca.png"
                      alt="BCA"
                    />
                  </button>
                  <button
                    type="button"
                    @click="setBank = 2"
                    class="w-[47%] md:w-1/4 border border-slate-200 rounded py-3 px-3"
                    :class="setBank == 2 ? 'bank-active' : ''"
                  >
                    <img
                      class="h-auto w-[80%] mx-auto"
                      src="/payment-bri.png"
                      alt="BRI"
                    />
                  </button>
                  <button
                    type="button"
                    @click="setBank = 3"
                    class="w-[47%] md:w-1/4 border border-slate-200 rounded py-3 px-3"
                    :class="setBank == 3 ? 'bank-active' : ''"
                  >
                    <img
                      class="h-auto w-[80%] mx-auto"
                      src="/payment-bni.png"
                      alt="BNI"
                    />
                  </button>
                  <button
                    type="button"
                    @click="setBank = 4"
                    class="w-[47%] md:w-1/4 border border-slate-200 rounded py-3 px-3"
                    :class="setBank == 4 ? 'bank-active' : ''"
                  >
                    <img
                      class="h-auto w-[80%] mx-auto"
                      src="/payment-mandiri.png"
                      alt="Mandiri"
                    />
                  </button>
                </div>
              </div>
            </article>
            <article class="mt-10">
              <div class="flex items-start gap-x-5 mb-10">
                <div class="h-5 w-5 flex-none">
                  <input
                    ref="inputAgreement"
                    v-model="setAgreement"
                    type="checkbox"
                    class="h-5 w-5 cursor-pointer"
                    name="setuju"
                  />
                </div>
                <p
                  class="md:font-medium text-sm md:text-base text-gray-700 grow -mt-1"
                >
                  Harap pastikan bahwa semua detail pemesanan dan data diri
                  sudah sesuai dengan yang Anda inginkan sebelum melakukan
                  pembayaran, agar tidak terjadi hal yang tidak diinginkan.
                </p>
              </div>
              <div class="flex items-end gap-x-6 md:gap-x-8 lg:gap-x-10">
                <button
                  type="submit"
                  class="py-3 md:py-4 px-8 md:px-12 lg:px-14 rounded-md font-medium text-base md:text-xl text-white bg-[#2181D9]"
                >
                  Bayar Rp. {{ formatCurrencyToRupiah(totalPrice) }}
                </button>
                <button
                  type="button"
                  @click="$router.back()"
                  class="font-semibold text-sm md:text-base text-gray-600"
                >
                  Batalkan
                </button>
              </div>
            </article>
          </form>
          <div
            class="order-1 md:order-2 w-full md:w-[320px] flex-none mb-8 md:m-b0"
          >
            <div
              class="bg-white w-full sticky top-10 border border-slate-200 p-5 rounded-md shadow-lg"
            >
              <img
                class="w-full h-[200px] object-cover rounded-md mb-3"
                :src="dataUserPayment.imageArticle"
                height="300"
                width="300"
                alt="Aku dengar"
              />
              <h2 class="font-semibold text-base text-[#20202C]">
                {{ dataUserPayment.titleArticle }}
              </h2>
              <p class="text-[13px] md:text-sm text-gray-700 hidden">
                Termasuk Tiket Safari World Bangkok & 35 atraksi lainnya
              </p>
              <div class="mt-4 flex items-center justify-between">
                <strong class="font-medium text-sm text-slate-700"
                  >Subtotal</strong
                >
                <p class="font-semibold text-base text-gray-900">
                  Rp. {{ formatCurrencyToRupiah(dataUserPayment.priceArticle) }}
                </p>
              </div>
              <div class="flex items-center justify-between my-1">
                <strong
                  class="relative font-medium text-sm text-slate-700 group"
                  >Biaya Admin
                  <span
                    class="cursor-pointer inline-flex items-center justify-center h-4 w-4 text-[10px] bg-gray-800 text-white rounded-full"
                    >?</span
                  >
                  <span
                    class="absolute top-0 bg-white rounded-md py-2.5 px-4 text-xs text-gray-900 shadow-md drop-shadow-md w-[200px] hidden group-hover:inline-block"
                    >Ayo, daftar agar anda mendapatkan gratis pajak untuk setiap
                    perjalanan.</span
                  ></strong
                >
                <p class="font-semibold text-base text-gray-900">
                  Rp. {{ formatCurrencyToRupiah(biayaAdmin) }}
                </p>
              </div>
              <div class="flex items-center justify-between">
                <strong class="font-medium text-sm text-slate-700"
                  >Total</strong
                >
                <p class="font-semibold text-base text-gray-900">
                  Rp. {{ formatCurrencyToRupiah(totalPrice) }}
                </p>
              </div>
              <div class="mt-8 text-left">
                <div class="font-medium text-xs flex items-center gap-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                    />
                  </svg>
                  <span
                    :class="promoActive ? 'text-[#0084FF]' : 'text-gray-900'"
                    >{{
                      promoActive
                        ? "Menggunakan Kode Promo"
                        : "Gunakan Kode Promo"
                    }}</span
                  >
                </div>
                <div class="mt-2">
                  <div class="border rounded bg-slate-100 px-3 py-2 mb-2">
                    <input
                      ref="inputPromo"
                      v-model="setInput"
                      type="text"
                      :readonly="promoActive"
                      class="w-full font-medium bg-slate-100 text-sm text-gray-900 placeholder:text-gray-700"
                      placeholder="Isi Kode Promo"
                    />
                  </div>
                  <button
                    @click="onAddCoupon"
                    type="button"
                    class="w-full py-3 text-white font-semibold text-base text-center rounded"
                    :class="promoActive ? 'bg-[#00AA00]' : 'bg-[#2181D9]'"
                  >
                    {{ promoActive ? "Berhasil digunakan" : "Pasang" }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <aside
      class="fixed bottom-0 left-0 flex md:hidden items-center z-50 h-[100px] bg-white w-full border-t border-gray-200"
    >
      <div class="w-full flex items-center gap-x-6 px-5">
        <div class="grow">
          <p class="text-base text-gray-900">Total:</p>
          <p class="font-semibold text-xl text-gray-900">
            Rp. {{ formatCurrencyToRupiah(totalPrice) }}
          </p>
        </div>
        <button
          type="button"
          @click="onPayment"
          class="h-[46px] w-[120px] rounded-md flex-none font-medium text-lg text-white bg-[#2181D9]"
        >
          Bayar
        </button>
      </div>
    </aside>
    <ModalPayment
      rekening="123456789"
      @close-modal="modalPayment = false"
      :is-show="modalPayment"
      :total-price="formatCurrencyToRupiah(totalPrice)"
    />
  </div>
  <div v-else>
    <LoaderBasic :is-show="dataUserPayment == null" />
    <div class="h-screen"></div>
  </div>
</template>
<style scoped>
.bank-active {
  background-color: rgba(0, 132, 255, 0.1) !important;
  border-color: #0084ff !important;
}
</style>
