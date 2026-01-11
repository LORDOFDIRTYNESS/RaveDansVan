<template>
  <div class="relative max-lg:order-2 lg:order-2">
    <div class="absolute inset-px rounded-lg bg-surface-900" />
    <div class="relative text-center flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
      <div class="px-8 pt-4 sm:px-10 sm:pt-6 flex flex-col h-full">
        <p class="mt-2 text-lg md:text-2xl font-medium tracking-tight text-surface-200 max-lg:text-center">Abonne-toi sur YouTube</p>
        <p class="mt-2 max-w-lg text-sm sm:text-base lg:text-lg text-surface-200 max-lg:text-center">Vidéos, exclusivités et moments forts à ne pas manquer !</p>
        <div class="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
          <a href="https://www.youtube.com/@RaveDansVan" target="_blank" aria-label="YouTube">
            <font-awesome-icon :icon="['fab', 'youtube']" class="text-7xl text-primary-600 hover:text-surface-200" />
          </a>
        </div>
      </div>
    </div>
    <div class="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-t-[2rem]" />
  </div>
</template>
