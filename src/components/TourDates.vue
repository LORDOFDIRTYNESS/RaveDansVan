<script setup>
import { onMounted, ref } from 'vue';
import { fetchStory } from '../lib/storyblok';

const concerts = ref([]);
const error = ref('');

const findBlock = (blocks, names) => {
  if (!Array.isArray(blocks)) return null;
  return blocks.find((block) => names.includes(block.component)) || null;
};

const loadDates = async () => {
  try {
    const story = await fetchStory('home');
    const body = story?.content?.body || [];
    const block = findBlock(body, [
      'tour_dates',
      'tour-dates',
      'Tour Dates',
      'tourDates',
    ]);

    if (!block) {
      error.value = 'Tour dates block not found.';
      return;
    }

    const items = Array.isArray(block.dates)
      ? block.dates
      : Array.isArray(block.items)
        ? block.items
        : [];

    concerts.value = items
      .map((item) => ({
        date: item.date,
        state: item.state,
        city: item.city,
        venue: item.venue,
      }))
      .filter((item) => item.date && item.venue);
  } catch (err) {
    error.value = 'Unable to load tour dates.';
    console.warn('Storyblok tour-dates failed', err);
  }
};

onMounted(loadDates);

const formatDate = (dateString) => {
  if (!dateString) return ['', '', ''];
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return ['', '', ''];
  const options = { year: 'numeric', month: 'short', day: '2-digit' };
  const formattedDate = date.toLocaleDateString('en-US', options).toUpperCase().replace(',', '').split(' ');
  return [formattedDate[0], formattedDate[1], formattedDate[2]];
};
</script>

<template>
  <div class="tour-dates-container text-center p-4 z-10">
    <h1 class="text-4xl mb-4 pb-4"><span class="font-semibold">Prochains</span> <span id="rdv" class="text-primary-600 text-3xl">RDV</span></h1>
    <hr class="mx-auto w-1/2 border-1 border-primary-600"/>
    <div class="flex flex-col items-center pt-4">
      <p v-if="error" class="text-sm text-red-300 py-6">{{ error }}</p>
      <p v-else-if="!concerts.length" class="text-sm text-gray-300 py-6">No dates announced yet.</p>
      <div v-else v-for="(concert, index) in concerts" :key="concert.date" class="tour-date w-full max-w-4xl relative">
        <div class="date-info">
          <div class="day">{{ formatDate(concert.date)[2] }}</div>
          <div class="month">{{ formatDate(concert.date)[0] }}</div>
          <div class="year">{{ formatDate(concert.date)[1] }}</div>
        </div>
        <div class="venue text-xs sm:text-xl font-bold w-30">{{ concert.venue }}</div>
        <div class="location text-xs sm:text-xl w-20">{{ concert.city }}, {{ concert.state }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tour-dates-container {
  border-radius: 8px;
  padding: 16px;
}

.tour-date {
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #e5e7eb;
}

.tour-date:last-child {
  border-bottom: none;
}

.date-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 16px;
  font-weight: bold;
  color: #374151;
}

.date-info .day {
  font-size: 12px;
  color: #9ca3af;
}

.date-info .month,
.date-info .year {
  font-size: 20px;
  color: #9ca3af;
}

.venue {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: #9ca3af;
}

.location {
  margin-left: auto;
  color: #9ca3af;
}
</style>
