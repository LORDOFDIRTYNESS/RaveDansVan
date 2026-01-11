<script setup>
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { onMounted, ref } from 'vue'
import { fetchStory } from '../lib/storyblok'

const title = ref('Rave Rewind')
const images = ref([])
const error = ref('')

const findBlock = (blocks, names) => {
  if (!Array.isArray(blocks)) return null
  return blocks.find((block) => names.includes(block.component)) || null
}

const loadCarousel = async () => {
  try {
    const story = await fetchStory('home')
    const body = story?.content?.body || []
    const block = findBlock(body, [
      'media_carousel',
      'media-carousel',
      'Media Carousel',
      'mediaCarousel',
    ])

    if (!block) {
      error.value = 'Media carousel block not found.'
      return
    }

    title.value = block.title || title.value

    const assets = Array.isArray(block.images) ? block.images : []
    images.value = assets
      .map((asset, index) => ({
        id: asset.id ?? asset._uid ?? index + 1,
        url: asset.filename,
        alt: asset.alt || `media ${index + 1}`,
      }))
      .filter((asset) => asset.url)
  } catch (err) {
    error.value = 'Unable to load media.'
    console.warn('Storyblok media-carousel failed', err)
  }
}

onMounted(loadCarousel)

const carouselConfig = {
  height: 400,
  wrapAround: true,
  breakpoints: {
    640: {
      itemsToShow: 1,
    },
    768: {
      itemsToShow: 1.25,
    },
    1024: {
      itemsToShow: 1.5,
    },
    1280: {
      itemsToShow: 2,
    },
  },
}
</script>

<template>
  <div class="my-8 z-10">
    <h2 class="text-2xl font-semibold text-center mb-4 pb-4">{{ title }}</h2>
    <hr class="mx-auto w-1/2 border-1 border-primary-600"/>
  <p v-if="error" class="text-sm text-red-300 text-center pt-6">{{ error }}</p>
  <p v-else-if="!images.length" class="text-sm text-gray-300 text-center pt-6">
    No media yet.
  </p>
  <Carousel v-else v-bind="carouselConfig" class="pt-12">
    <Slide v-for="image in images" :key="image.id">
      <img :src="image.url" :alt="image.alt" />
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
  </div>
</template>

<style>
@media (max-width: 640px) {
  .carousel__next, .carousel__prev {
    display: none !important;
  }
}
:root {
  --carousel-transition: 300ms;
  --carousel-opacity-inactive: 0.7;
  --carousel-opacity-active: 1;
  --carousel-opacity-near: 0.9;

  background-color: #242424;
}

.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}

img {
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition:
      opacity var(--carousel-transition),
      transform var(--carousel-transition);
}

.carousel.is-dragging .carousel__slide {
  transition:
      opacity var(--carousel-transition),
      transform var(--carousel-transition);
}

.carousel__slide {
  opacity: var(--carousel-opacity-inactive);
  transform: translateX(10px) rotateY(-12deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: var(--carousel-opacity-near);
  transform: rotateY(-10deg) scale(0.90);
}

.carousel__slide--active {
  opacity: var(--carousel-opacity-active);
  transform: rotateY(0) scale(1);
}

.carousel__slide--next {
  opacity: var(--carousel-opacity-near);
  transform: rotateY(10deg) scale(0.90);
}

.carousel__slide--next ~ .carousel__slide {
  opacity: var(--carousel-opacity-inactive);
  transform: translateX(-10px) rotateY(12deg) scale(0.9);
}
</style>
