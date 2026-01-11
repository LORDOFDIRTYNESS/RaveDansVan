<template>
  <div v-if="isVisible" class="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1 transition-transform transform z-10" :class="{ 'translate-y-0': isVisible, '-translate-y-full': !isVisible }">
    <div class="absolute top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl" aria-hidden="true">
      <div class="aspect-577/310 w-[36.0625rem] bg-linear-to-r from-[#8b5cf6] to-[#2e1065] opacity-90" style="clip-path: polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)" />
    </div>
    <div class="absolute top-1/2 left-[max(45rem,calc(50%+8rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl" aria-hidden="true">
      <div class="aspect-577/310 w-[36.0625rem] bg-linear-to-r from-[#8b5cf6] to-[#2e1065] opacity-90`" style="clip-path: polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)" />
    </div>
    <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
      <p class="text-sm/6 text-gray-900">
        <strong class="font-semibold">Prochaine escale</strong>
        <svg viewBox="0 0 2 2" class="mx-2 inline size-0.5 fill-current" aria-hidden="true"><circle cx="1" cy="1" r="1" /></svg>
        <span v-if="nextStop" class="underline font-bold">{{ nextStop.city }}</span>
        <span v-else class="underline font-bold">À venir</span>
        <span v-if="nextStop"> Rejoignez-nous le <span class="underline font-bold">{{ nextStop.dateLabel }}</span> pour un show légendaire !</span>
      </p>
    </div>
    <div class="flex flex-1 justify-end">
      <button type="button" class="-m-3 p-3 focus-visible:outline-offset-[-4px]" @click="closeBanner">
        <span class="sr-only">Dismiss</span>
        <XMarkIcon class="size-5 text-gray-900" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { XMarkIcon } from '@heroicons/vue/20/solid';
import { fetchStory } from '../lib/storyblok';

const isVisible = ref(true);
const nextStop = ref(null);

const findBlock = (blocks, names) => {
  if (!Array.isArray(blocks)) return null;
  return blocks.find((block) => names.includes(block.component)) || null;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('fr-CA', {
    day: 'numeric',
    month: 'long',
  });
};

const loadNextStop = async () => {
  try {
    const story = await fetchStory('home');
    const body = story?.content?.body || [];
    const block = findBlock(body, [
      'tour_dates',
      'tour-dates',
      'Tour Dates',
      'tourDates',
    ]);

    if (!block) return;

    const items = Array.isArray(block.dates)
      ? block.dates
      : Array.isArray(block.items)
        ? block.items
        : [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming = items
      .map((item) => {
        const date = new Date(item.date);
        if (!item.date || Number.isNaN(date.getTime())) return null;
        return {
          date,
          city: item.city || '',
          state: item.state || '',
        };
      })
      .filter((item) => item && item.date >= today)
      .sort((a, b) => a.date - b.date)[0];

    if (!upcoming) return;

    nextStop.value = {
      city: upcoming.city || upcoming.state || 'A venir',
      dateLabel: formatDate(upcoming.date.toISOString()),
    };
  } catch (err) {
    console.warn('Storyblok banner next stop failed', err);
  }
};

function closeBanner() {
  isVisible.value = false;
}

onMounted(loadNextStop);
</script>
