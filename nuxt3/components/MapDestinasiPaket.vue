<script setup>
defineProps(["lokasi"]);

const extractSrc = (str) => {
  // Use regular expression to match the URL in the src attribute
  const urlRegex = /src="([^"]+)"/;
  const match = str.match(urlRegex);

  // Extract the URL from the matched group
  const url = match ? match[1] : null;
  return url;
};
</script>
<template>
  <div
    class="w-full border border-slate-200 bg-white p-4 md:p-5 rounded-md mt-4 md:mt-5"
  >
    <div class="flex items-center gap-x-3 md:gap-x-5">
      <div
        class="h-8 md:h-8 lg:h-10 w-8 md:w-8 lg:w-10 bg-[#2181D9] text-white rounded-full flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-4 md:w-5 h-4 md:h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
          />
        </svg>
      </div>
      <h3 class="font-semibold text-base md:text-lg text-gray-900">
        Peta Lokasi
      </h3>
    </div>
    <div class="w-full mt-4">
      <iframe
        class="w-full h-[330px] sm:h-[380px] md:h-[440px] lg:h-[500px]"
        :src="extractSrc(lokasi)"
        width="600"
        height="450"
        style="border: 0"
        allowfullscreen="true"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</template>
