<script setup>
import { ref } from "vue";

const openAccordion = ref(1);
useHead({
  title: "Pusat Bantuan",
});
</script>
<template>
  <main class="w-full">
    <div
      class="container pt-[100px] pb-[100px] md:pt-[130px] md:pb-[140px] lg:pt-[140px] lg:pb-[160px]"
    >
      <div class="w-full md:w-9/12 lg:w-8/12 mx-auto">
        <h1
          class="font-bold text-[38px] md:text-[42px] lg:text-[46px] xl:text-[50px] text-[#20202C]"
        >
          Pusat Bantuan
        </h1>
        <p class="font-medium text-base md:text-[20px] text-gray-700">
          Kami berkomitmen untuk memberikan Anda bantuan dan dukungan terbaik
          untuk setiap pertanyaan atau masalah yang Anda hadapi!
        </p>
        <div class="mt-8 md:mt-10 lg:mt-12 flex flex-col">
          <BantuanAccordion
            :is-show="openAccordion == 1"
            @click="openAccordion = 1"
            title="Bagaimana cara melakukan pembayaran di situs kami?"
            text="Anda dapat melakukan pembayaran melalui metode transfer bank, ada beberapa pilihan bank yang tersedia di situs kami. Pilihlah opsi bank yang paling nyaman bagi Anda saat menyelesaikan transaksi. Kemudian upload bukti pembayaran tersebut, dan menunggu kami mengkonfirmasi!"
          />
          <BantuanAccordion
            :is-show="openAccordion == 2"
            @click="openAccordion = 2"
            title="Berapa lama waktu yang dibutuhkan untuk konfirmasi pembayaran?"
            text="Proses konfirmasi pembayaran biasanya memakan waktu yang tidak lama, setelah kami menerima pembayaran Anda. Namun, dalam beberapa kasus, konfirmasi dapat dilakukan lebih cepat tergantung pada metode pembayaran yang Anda pilih. Dan upload bukti pembayaran dengan foto yang berkualitas baik!"
          />
          <BantuanAccordion
            :is-show="openAccordion == 3"
            @click="openAccordion = 3"
            title="Bagaimana jika saya mengalami masalah saat melakukan pembayaran?"
            text="Jangan ragu untuk menghubungi tim dukungan pelanggan kami segera melalui email atau telepon. Kami siap membantu Anda menyelesaikan masalah pembayaran dan memberikan bantuan yang diperlukan agar transaksi Anda dapat diselesaikan dengan lancar."
          />
          <BantuanAccordion
            :is-show="openAccordion == 4"
            @click="openAccordion = 4"
            title="Bagaimana cara membatalkan pembayaran yang telah saya lakukan?"
            text="Untuk membatalkan pembayaran anda hanya bisa membatalkan dalam waktu 24 Jam setelah pembayaran, setelah itu, tiket Anda akan benar - benar tidak bisa dibatalkan. Silakan hubungi tim layanan pelanggan kami secepat mungkin melalui email atau telepon dengan menyebutkan nomor transaksi Anda. Kami akan membantu Anda dengan proses pembatalan dan memberikan panduan yang diperlukan."
          />
        </div>
      </div>
    </div>
  </main>
</template>
