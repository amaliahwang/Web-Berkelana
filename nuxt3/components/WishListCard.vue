<script setup>
defineProps(["image", "title", "link"]);
</script>
<template>
    <article class="bg-white rounded p-2">
        <NuxtLink to="/">
            <img class="h-[150px] w-full object-cover rounded" src="/blog-1.jpg" height="200" width="200" />
            <h3 class="font-semibold text-sm text-gray-900 mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique rerum</h3>
        </NuxtLink>
    </article>
</template>