<script setup>
defineProps(["isShow", "mapSrc"]);
</script>
<template>
  <div
    class="h-screen w-screen fixed top-0 left-0 z-[60] items-center justify-center"
    :class="isShow ? 'flex' : 'hidden'"
    style="background-color: rgba(21, 25, 34, 0.75)"
    @click="$emit('closeModal')"
  >
    <div
      id="modal-signin"
      class="w-[92%] max-w-[700px] bg-white rounded-md p-3 relative"
      @click.stop
    >
      <button
        @click="$emit('closeModal')"
        type="button"
        class="absolute -top-3 md:-top-4 -right-3 md:-right-4 bg-gray-900 text-white h-8 md:h-10 w-8 md:w-10 rounded-full flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 md:w-6 h-5 md:h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
      <iframe
        class="w-full h-[250px] md:h-[340px] lg:h-[400px]"
        :src="mapSrc"
        width="600"
        height="450"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</template>
