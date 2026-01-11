<template>
  <div class="card self-center sm:w-2xl ease-in-out z-10 text-center">
    <h1 class="text-2xl mb-4 pb-4"><span class="font-semibold">Prochains</span> <span id="rdv" class="text-primary-600 text-3xl">RDV</span></h1>
    <hr class="mx-auto w-1/2 border-1 border-primary-600"/>
    <Timeline :value="computedEvents" align="alternate" class="customized-timeline pt-8">
      <template #marker="slotProps">
        <span class="flex w-8 h-8 items-center justify-center text-white rounded-full z-10 shadow-sm animate-fade-in"
              :style="{ backgroundColor: slotProps.item.color }">
          <i :class="slotProps.item.icon"></i>
        </span>
      </template>
      <template #content="slotProps">
        <Card :class="['mt-4 text-center max-w-md mx-auto animate-slide-up', slotProps.item.eventClass]">
          <template #title>
            {{ slotProps.item.venue }}
          </template>
          <template #subtitle>
            {{ slotProps.item.city }}, {{ slotProps.item.state }}
          </template>
          <template #content>
            <p>{{ slotProps.item.date }}</p>
          </template>
        </Card>
      </template>
    </Timeline>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { format, isBefore, parseISO, isEqual, startOfDay } from "date-fns";

const events = ref([
  { venue: 'Hollywood Bowl', city: 'Los Angeles', state: 'CA', date: '2023-11-01' },
  { venue: 'MGM Grand', city: 'Las Vegas', state: 'NV', date: '2023-11-05' },
  { venue: 'Austin City Limits', city: 'Austin', state: 'TX', date: '2025-03-22' },
  { venue: 'Madison Square Garden', city: 'New York', state: 'NY', date: '2025-03-25' }
]);

const today = new Date();

function isPastEvent(eventDate) {
  const eventDay = startOfDay(parseISO(eventDate));
  const todayDay = startOfDay(today);
  return isBefore(eventDay, todayDay);
}

function isTodayEvent(eventDate) {
  const eventDay = startOfDay(parseISO(eventDate));
  const todayDay = startOfDay(today);
  return isEqual(eventDay, todayDay);
}

const computedEvents = computed(() => {
  return events.value.map(event => {
    const isPast = isPastEvent(event.date);
    const isToday = isTodayEvent(event.date);
    const formattedDate = format(parseISO(event.date), 'MMMM dd, yyyy');

    return {
      ...event,
      date: formattedDate,
      icon: isPast ? 'pi pi-check' : isToday ? 'pi pi-calendar' : 'pi pi-clock',
      color: isPast ? '#9E9E9E' : isToday ? '#7c3aed' : '#4CAF50',
      eventClass: isPast ? 'past-event' : isToday ? 'today-event' : 'future-event'
    };
  });
});
</script>

<style lang="scss">
/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 1s ease-in-out;
}

.animate-slide-up {
  animation: slideUp 1s ease-in-out;
}

.past-event {
  border: 2px solid #555555; /* Lighter but darker gray */
}

.today-event {
  border: 2px solid #7c3aed;
}

.future-event {
  border: 2px solid #FFFFFF; /* Add white border for upcoming events */
}

/* Responsive Fix */
@media screen and (max-width: 650px) {
  .customized-timeline .p-timeline-event {
    flex-direction: row !important;

    .p-timeline-event-content {
      text-align: left;
    }
  }

  .customized-timeline .p-timeline-event-opposite {
    display: none;
  }
}

/* Utility Classes */
.max-w-md {
  max-width: 20rem;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
</style>
