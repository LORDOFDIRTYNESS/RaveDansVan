<template>
  <nav :class="['w-full sticky top-0 left-0 z-50 transition-all duration-300 bg-surface-900',
  { 'py-4': !isScrolled, 'py-1' : isScrolled }]">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between">
        <div class="flex flex-1 items-center justify-start">
          <div class="flex shrink-0 items-center">
            <span class="text-2xl sm:text-4xl text-primary-600 ml-2" id="rdv">RaveDansVan</span>
          </div>
        </div>
        <div class="absolute gap-1 inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <a v-for="item in social" :href="item.href" target="_blank" class="relative p-1 text-primary-600 hover:text-white">
            <span class="absolute -inset-1.5" />
            <span class="sr-only">{{ item.name }} link</span>
            <font-awesome-icon :icon="item.icon" class="text-xl" />
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const social = [
  {name: 'Instagram', href: 'https://www.instagram.com/rave_dans_van/#', icon: "fa-brands fa-instagram"},
  {name: 'Shopify', href: 'https://www.youtube.com/@RaveDansVan', icon: "fa-brands fa-youtube"},
  {name: 'Calendly', href: 'https://calendly.com/ravedansvan-info/30min', icon: "fa fa-calendar-days"},
]

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

</script>
