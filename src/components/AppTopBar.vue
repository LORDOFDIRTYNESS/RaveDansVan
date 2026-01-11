<template>
  <Disclosure as="nav" :class="['w-full sticky top-0 left-0 z-50 transition-all duration-300 bg-surface-900',
  { 'py-4': !isScrolled, 'py-1' : isScrolled }]" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400
          hover:bg-gray-700 hover:text-white">
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
            <XMarkIcon v-else class="block size-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex shrink-0 items-center">
            <span class="text-2xl sm:text-4xl text-primary-600 ml-2" id="rdv">RaveDansVan</span>
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <a v-for="item in navigation" :key="item.name" :href="item.href"
                 class="nav-link text-gray-300 hover:text-white
                  px-3 py-2 text-sm font-medium">{{ item.name }}
              </a>
            </div>
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

    <DisclosurePanel class="sm:hidden absolute top-full left-0 w-full z-40 bg-surface-900 flex justify-center">
      <div class="space-y-1 px-2 pt-2 pb-3 flex flex-col items-center">
        <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href"
                          class="text-gray-300 hover:bg-gray-700 hover:text-white block
                          rounded-md px-3 py-2 text-base font-medium">{{ item.name }}
        </DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import {onMounted, onUnmounted, ref} from "vue";

const navigation = []

const social = [
  {name: 'Instagram', href: 'https://www.instagram.com/rave_dans_van/#', icon: "fa-brands fa-instagram"},
  {name: 'Shopify', href: 'https://www.youtube.com/@RaveDansVan', icon: "fa-brands fa-youtube"},
  {name: 'Calendly', href: 'https://www.calendly.com', icon: "fa fa-calendar-days"},
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

<style scoped>
.nav-link {
  position: relative;
  overflow: hidden;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: currentColor;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
  visibility: hidden; /* Hide by default */
}

.nav-link:hover::after {
  transform: translateX(0);
  visibility: visible; /* Show on hover */
}

.backdrop-blur {
  z-index: 50;
  backdrop-filter: blur(10px);
}
</style>