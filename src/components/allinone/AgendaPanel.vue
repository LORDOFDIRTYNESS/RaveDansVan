<template>
  <div class="relative max-lg:order-1 lg:row-span-2 lg:order-1">
    <div class="absolute inset-px rounded-lg bg-surface-900 lg:rounded-l-[2rem]" />
    <div class="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
      <div class="px-6 pt-4 pb-3 sm:px-10 sm:pt-6 sm:pb-4 text-center flex flex-col h-full">
        <p class="mt-2 text-lg md:text-2xl font-medium tracking-tight text-surface-200">Sur votre agenda</p>
        <div class="mt-4 space-y-4 flex-1 flex flex-col">
          <p v-if="error" class="text-sm text-red-300">{{ error }}</p>
          <p v-else-if="!upcomingDates.length" class="text-sm text-gray-300">Aucun rendez-vous pour l'instant.</p>
          <div
            v-else
            v-for="concert in upcomingDates"
            :key="concert.key"
            class="p-4 bg-surface-700 border-1 border-primary-600 rounded-lg shadow-md flex-1 flex flex-col justify-center"
          >
            <a
              :href="concert.googleUrl"
              target="_blank"
              rel="noopener"
              aria-label="Ajouter a Google Calendar"
              class="group inline-block cursor-pointer"
              title="Ajouter a Google Calendar"
            >
              <p class="text-xs text-surface-200 group-hover:text-primary-300">
                <strong class="font-semibold md:text-lg">{{ concert.year }}</strong>
              </p>
              <p class="text-xl md:text-3xl font-bold text-surface-200 group-hover:text-primary-300">
                {{ concert.month }}
              </p>
              <p class="text-xl md:text-3xl font-bold text-surface-200 group-hover:text-primary-300">
                {{ concert.day }}
              </p>
              <p class="mt-2 text-xs uppercase tracking-wide text-primary-400 opacity-80 group-hover:opacity-100">
                Ajouter au calendrier
              </p>
            </a>
            <hr class="my-4 mx-10 border-surface-600 border-t-2">
            <p class="text-sm/6 md:text-lg text-surface-200">{{ concert.venue }}</p>
            <p class="text-sm/6 md:text-lg text-surface-200">{{ concert.location }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded-l-[2rem]" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { fetchStory } from "../../lib/storyblok";

const upcomingDates = ref([]);
const error = ref("");

const findBlock = (blocks, names) => {
  if (!Array.isArray(blocks)) return null;
  return blocks.find((block) => names.includes(block.component)) || null;
};

const formatDate = (dateString) => {
  if (!dateString) return ["", "", ""];
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return ["", "", ""];
  const options = { year: "numeric", month: "short", day: "2-digit" };
  const formattedDate = date
    .toLocaleDateString("en-US", options)
    .toUpperCase()
    .replace(",", "")
    .split(" ");
  return [formattedDate[0], formattedDate[1], formattedDate[2]];
};

const buildLocation = (city, state) => {
  if (city && state) return `${city}, ${state}`;
  return city || state || "";
};

const formatGoogleDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
};

const buildGoogleCalUrl = (date, venue, location) => {
  if (!date) return "";
  const start = formatGoogleDate(date);
  const endDate = new Date(date);
  endDate.setDate(endDate.getDate() + 1);
  const end = formatGoogleDate(endDate);
  const title = `RaveDansVan — ${venue || "Rendez-vous"}`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${start}/${end}`,
    location: location || "",
  });
  return `https://www.google.com/calendar/render?${params.toString()}`;
};

const loadDates = async () => {
  try {
    const story = await fetchStory("home");
    const body = story?.content?.body || [];
    const block = findBlock(body, [
      "tour_dates",
      "tour-dates",
      "Tour Dates",
      "tourDates",
    ]);

    if (!block) {
      error.value = "Tour dates block not found.";
      return;
    }

    const items = Array.isArray(block.dates)
      ? block.dates
      : Array.isArray(block.items)
        ? block.items
        : [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const normalized = items
      .map((item) => {
        const date = new Date(item.date);
        if (!item.date || Number.isNaN(date.getTime())) return null;
        return {
          date,
          venue: item.venue,
          location: buildLocation(item.city, item.state),
          key: item._uid || item.date,
        };
      })
      .filter((item) => item && item.venue)
      .filter((item) => item.date >= today)
      .sort((a, b) => a.date - b.date)
      .slice(0, 2)
      .map((item) => {
        const [month, day, year] = formatDate(item.date.toISOString());
        return {
          ...item,
          month,
          day,
          year,
          googleUrl: buildGoogleCalUrl(item.date, item.venue, item.location),
        };
      });

    upcomingDates.value = normalized;
  } catch (err) {
    error.value = "Unable to load tour dates.";
    console.warn("Storyblok tour-dates failed", err);
  }
};

onMounted(loadDates);
</script>
