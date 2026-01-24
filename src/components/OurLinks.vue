<template>
  <div class="my-8 z-10">
    <h2 class="text-2xl font-semibold text-center mb-4 pb-4">SUIS LE SON</h2>
    <hr class="mx-auto w-1/2 border-1 border-primary-600"/>
    <div class="flex flex-wrap justify-center gap-4 pt-4">
      <div class="rounded-lg p-3 text-center transition-transform transform hover:-translate-y-1" v-for="link in links" :key="link.name">
        <a :href="link.href" target="_blank" class="no-underline text-surface-200 hover:text-primary-600">
          <font-awesome-icon :icon="link.icon" class="text-3xl sm:text-4xl mb-2" />
          <span class="block text-base sm:text-lg font-semibold">{{ link.name }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const links = ref([
  { name: 'Instagram', href: 'https://www.instagram.com/rave_dans_van/#', icon: faInstagram },
  { name: 'Youtube', href: 'https://www.youtube.com/@RaveDansVan', icon: faYoutube },
  { name: 'Calendly', href: 'https://calendly.com/ravedansvan-info/30min', icon: faCalendarAlt },
]);
</script>

<style scoped>
.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  width: 100%;
  max-width: 200px;
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-5px);
}

.card-link {
  text-decoration: none;
  color: inherit;
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
}

@media (min-width: 600px) {
  .card {
    width: calc(33.333% - 1rem);
  }
}
</style>
