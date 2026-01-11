<template>
  <div class="relative lg:row-span-2 lg:order-4 order-4">
    <div class="absolute inset-px rounded-lg bg-surface-900 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />
    <div class="relative text-center flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
      <div class="pb-3 sm:pb-4 px-8 pt-4 sm:px-10 sm:pt-6 flex flex-col h-full instagram-image">
        <p class="mt-2 text-lg md:text-2xl font-medium tracking-tight text-surface-200 max-lg:text-center">Suis-nous sur Instagram</p>
        <div class="mt-4 flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
          <a href="https://www.instagram.com/rave_dans_van/#" target="_blank" aria-label="Instagram">
            <font-awesome-icon :icon="['fab', 'instagram']" class="text-7xl text-primary-600 hover:text-surface-200" />
          </a>
        </div>
        <CarouselTee />
      </div>
    </div>
    <div class="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />
  </div>
</template>

<script setup>
import CarouselTee from "../sub/carouselTee.vue";
</script>

<style scoped>
@media (min-width: 650px) {
  .instagram-image {
    max-width: 400px;
    height: auto;
    margin: 0 auto;
  }

  .p-carousel-prev,
  .p-carousel-next {
    display: none !important;
  }
}
</style>
