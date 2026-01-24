<template>
  <div class="py-10 sm:py-12 z-10">
    <div class="mx-auto w-full max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <AllInOneHeader />
      <div class="mt-8 grid gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-3 lg:grid-rows-2">
        <AgendaPanel />
        <YoutubeCard />
        <CalendlyCard />
        <InstagramCard />
      </div>
    </div>
  </div>
</template>

<script setup>
import AgendaPanel from "./allinone/AgendaPanel.vue";
import AllInOneHeader from "./allinone/AllInOneHeader.vue";
import CalendlyCard from "./allinone/CalendlyCard.vue";
import InstagramCard from "./allinone/InstagramCard.vue";
import YoutubeCard from "./allinone/YoutubeCard.vue";
</script>
