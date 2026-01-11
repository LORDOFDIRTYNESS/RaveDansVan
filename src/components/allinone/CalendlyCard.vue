<template>
  <div class="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2 lg:order-3 order-3">
    <div class="absolute inset-px rounded-lg bg-surface-900" />
    <div class="relative text-center flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
      <div class="px-8 pt-4 sm:px-10 sm:pt-6">
        <p class="mt-2 text-lg md:text-2xl font-medium tracking-tight text-surface-200 max-lg:text-center">Planifie un moment</p>
        <p class="mt-2 max-w-lg text-sm sm:text-base lg:text-lg text-surface-100 max-lg:text-center">Entre musique, rencontres et événements uniques.</p>
      </div>
      <div class="flex flex-1 items-center justify-center max-lg:py-6 lg:pb-2">
        <a href="https://calendly.com/" target="_blank" aria-label="Calendly">
          <font-awesome-icon :icon="['fas', 'calendar-days']" class="text-7xl text-primary-600 hover:text-surface-200" />
        </a>
      </div>
    </div>
    <div class="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5" />
  </div>
</template>
