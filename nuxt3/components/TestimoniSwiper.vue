<script setup>
import { ref } from "vue";
const testimonial = ref([
  {
    text: "Alama Mangunan sangat berkesan dihati keindahannya mengingatkanku pada dirinya.",
    author: "Ilham Udin Armain",
  },
  {
    text: "Kid Fun sangat suru banget. Banyak Wahana yang bisa dicoba nihhh, jangan lupa coba deh ke sana",
    author: "Zahira QQ",
  },
  {
    text: "Paket liburan keluarga ini sangat memudahkan untuk melakukan trip bersama keluarga, dan harga paketnya terjangkau. Destinasinya jga bagus-bagus.",
    author: "Wahyu Kurniawati89",
  },
  {
    text: "Keindahan Goa sangat bisa mengalahkan kecantikan mantankuuu",
    author: "Ammar Mahrufnaimungkar",
  },
  {
    text: "Harga dari makanan di Kopi Klotok begitu murah dan terjangkau untuk kantong perantau.Banyak pilihan sayur dan lauk disana.",
    author: "Ibrahim_Baskoro00",
  },
  {
    text: "Paket History sangat berkesan untuk saya yg notabennya orang luar jawa, saya bisa mengetahui sejarah dari setiap tempat yang saya kunjungi terutama Candi Prambanan.",
    author: "Nurulwati",
  },
  {
    text: "banyak maca seluncuran yg ada di Jogja Bay begitu menantang dan menyenangkan. Tempatnya sangat besar dan luas.",
    author: "AmaliaHwang",
  },
  {
    text: "Pantai jogja memang tidak pernah mengecewakan hati, sunsetnya begitu memukau",
    author: "Yohanes Arga",
  },
  {
    text: "Taman sari rekomen banget buat foto-foto kekinian",
    author: "Sherina Oktavia",
  },
  {
    text: "Malioboro mengukir kenangan, selalu ingin kembali ke tempat ini lagi",
    author: "Rima Amalia",
  },
  {
    text: "Tengkleng Gajah bener-bener punya iga sapi yang gede dan mantappp dehhh. Harus coba kesini kalo ke Jogja",
    author: "Sora Lim",
  },
  {
    text: "Rasa Gudeg masih sama seperti dulu",
    author: "RahmatRiadi",
  },
]);
</script>
<template>
  <div
    class="swiper-slide relative bg-[#2181D9] rounded-md border py-8 px-5"
    style="color: rgba(255, 255, 255, 0.4)"
    v-for="(testi, index) in testimonial"
    :key="index"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="absolute top-3 left-2 h-12 w-12"
      viewBox="0 0 16 16"
    >
      <path
        d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388q0-.527.062-1.054.093-.558.31-.992t.559-.683q.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 9 7.558V11a1 1 0 0 0 1 1zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612q0-.527.062-1.054.094-.558.31-.992.217-.434.559-.683.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 3 7.558V11a1 1 0 0 0 1 1z"
      />
    </svg>
    <p class="font-semibold text-sm md:text-base text-white mb-5 relative z-10">
      {{ testi.text }}
    </p>
    <strong
      class="font-semibold text-sm md:text-base text-gray-100 relative z-10"
      >- {{ testi.author }}</strong
    >
  </div>
</template>

<style scoped>
@media (min-width: 300px) {
  .swiper-slide {
    height: 220px;
    width: 220px;
  }
}
@media (min-width: 768px) {
  .swiper-slide {
    height: 240px;
    width: 250px;
  }
}
@media (min-width: 1024px) {
  .swiper-slide {
    height: 240px;
    width: 280px;
  }
}
@media (min-width: 1240px) {
  .swiper-slide {
    min-height: 250px;
    width: 300px;
  }
}
</style>
