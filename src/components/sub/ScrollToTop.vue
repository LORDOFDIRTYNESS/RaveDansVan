<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isVisible = ref(false);

const toggleVisibility = () => {
  isVisible.value = window.scrollY > 1;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

onMounted(() => {
  window.addEventListener('scroll', toggleVisibility);
});

onUnmounted(() => {
  window.removeEventListener('scroll', toggleVisibility);
});
</script>

<template>
  <div v-if="isVisible" class="fixed border-2 border-b-surface-200 bottom-5 right-5 w-10 h-10 bg-surface-900 text-white flex justify-center
  items-center rounded-full cursor-pointer z-50 transition-transform duration-300 hover:scale-120" @click="scrollToTop">
    <font-awesome-icon :icon="['fas', 'arrow-up']" class="text-primary-600" />
  </div>
</template>