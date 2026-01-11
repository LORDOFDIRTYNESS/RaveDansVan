<template>
  <div class="card">
    <p v-if="error" class="text-sm text-red-300 text-center pt-4">{{ error }}</p>
    <p v-else-if="!images.length" class="text-sm text-gray-300 text-center pt-4">No products yet.</p>
    <Carousel
      v-else
      :value="images"
      :responsiveOptions="responsiveOptions"
      :show-navigators="showNavigators"
    >
      <template #item="slotProps">
        <div class="dark:border-surface-700 rounded mt-4">
          <div class="mb-4">
            <div class="relative mx-auto">
              <img :src="slotProps.data.url" class="w-1/2 h-1/2 md:w-full md:h-full rounded" :alt="slotProps.data.alt" />
            </div>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useWindowSize } from '@vueuse/core';
import { fetchStory } from '../../lib/storyblok';

const images = ref([]);
const error = ref('');

const findBlock = (blocks, names) => {
  if (!Array.isArray(blocks)) return null;
  return blocks.find((block) => names.includes(block.component)) || null;
};

const loadImages = async () => {
  try {
    const story = await fetchStory('home');
    const body = story?.content?.body || [];
    const block = findBlock(body, [
      'instagram-card',
      'instagram_card',
      'Instagram Card',
      'instagramCard',
    ]);

    if (!block) {
      error.value = 'Instagram card block not found.';
      return;
    }

    const assets = Array.isArray(block.images) ? block.images : [];
    images.value = assets
      .map((asset, index) => ({
        id: asset.id ?? asset._uid ?? index + 1,
        url: asset.filename,
        alt: asset.alt || `product ${index + 1}`,
      }))
      .filter((asset) => asset.url);
  } catch (err) {
    error.value = 'Unable to load products.';
    console.warn('Storyblok shopify card failed', err);
  }
};

onMounted(loadImages);

const responsiveOptions = ref([
  {
    breakpoint: '1024px',
    numVisible: 1,
    numScroll: 3,
  },
  {
    breakpoint: '768px',
    numVisible: 1,
    numScroll: 3,
  },
  {
    breakpoint: '560px',
    numVisible: 1,
    numScroll: 3,
  },
]);

const { width } = useWindowSize();
const showNavigators = computed(() => width.value >= 640);
</script>

<style scoped>
@media (min-width: 650px) {
  .p-carousel-prev,
  .p-carousel-next {
    display: none !important;
  }
}
</style>
