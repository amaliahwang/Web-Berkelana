<script setup>
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
useHead({
  title: "Dashboard Admin",
});
</script>
<template>
  <div>
    <slot />
  </div>
</template>
