<script setup>
useHead({
  link: [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
      crossorigin: "",
    },
  ],
  titleTemplate: "%s | Berkelana",
  meta: [
    {
      name: "theme-color",
      content: "#0084FF",
    },
  ],
  meta: [
    {
      name: "description",
      content:
        "Selamat datang di Berkelana, tempat terbaik untuk menjelajahi keindahan alam dan budaya Indonesia. Temukan petualangan seru, informasi destinasi wisata terkini, dan tips perjalanan yang berguna di Berkelana. Mari nikmati keajaiban Indonesia bersama kami!",
    },
  ],
  meta: [
    {
      name: "keywords",
      content:
        "Wisata Indonesia, Destinasi Wisata, Petualangan Alam, Panduan Perjalanan, Tempat Wisata Terbaik, Budaya Indonesia, Jelajah Alam, Liburan Seru, Info Wisata Terbaru, Tips Perjalanan",
    },
  ],
  meta: [{ name: "author", content: "Berkelana.com" }],
});
</script>
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
