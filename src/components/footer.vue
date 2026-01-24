<script setup>
import { ref } from "vue";

const currentYear = new Date().getFullYear();
const isContactOpen = ref(false);
const isSubmitting = ref(false);
const submitStatus = ref("idle");

const openContact = () => {
  isContactOpen.value = true;
};

const closeContact = () => {
  isContactOpen.value = false;
};

const handleSubmit = async (event) => {
  if (isSubmitting.value) return;
  isSubmitting.value = true;
  submitStatus.value = "idle";

  const form = event.target;
  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      submitStatus.value = "error";
      return;
    }

    submitStatus.value = "success";
    form.reset();
    setTimeout(() => {
      closeContact();
      submitStatus.value = "idle";
    }, 1500);
  } catch (error) {
    submitStatus.value = "error";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <footer class="footer bg-surface-900 text-surface-200">
    <div class="container mx-auto py-6 text-center">
            <button
        type="button"
        class="mb-4 text-2xl font-semibold text-primary-400 hover:text-primary-300"
        @click="openContact"
      >
        Contactez-nous
      </button>
      <p class="text-sm">&copy; {{ currentYear }} Rave Dans Van. Tous droits réservés.</p>
      <div class="flex justify-center space-x-4 mt-3">
        <a href="https://www.instagram.com/rave_dans_van/#" target="_blank" class="hover:text-primary-600">
          <font-awesome-icon :icon="['fab', 'instagram']" />
        </a>
        <a href="https://www.youtube.com/@RaveDansVan" target="_blank" class="hover:text-primary-600">
          <font-awesome-icon :icon="['fab', 'youtube']" />
        </a>
        <a href="https://calendly.com/ravedansvan-info/30min" target="_blank" class="hover:text-primary-600">
          <font-awesome-icon :icon="['fas', 'calendar']" />
        </a>
      </div>

    </div>

    <div v-if="isContactOpen" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/70" @click="closeContact"></div>
      <div class="relative w-full max-w-lg rounded-lg bg-surface-900 p-6 text-left shadow-lg">
        <button
          type="button"
          class="absolute right-4 top-3 text-surface-400 hover:text-surface-200"
          aria-label="Fermer"
          @click="closeContact"
        >
          ×
        </button>
        <h3 class="text-sm font-semibold uppercase tracking-wide text-surface-300">Contact</h3>
        <form
          action="https://formspree.io/f/meeejrrr"
          method="POST"
          @submit.prevent="handleSubmit"
          class="mt-3 flex w-full flex-col gap-3"
        >
          <input
            type="text"
            name="name"
            placeholder="Votre nom"
            class="rounded-md border border-surface-700 bg-surface-800 px-3 py-2 text-sm text-surface-100 placeholder-surface-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Votre email"
            class="rounded-md border border-surface-700 bg-surface-800 px-3 py-2 text-sm text-surface-100 placeholder-surface-400"
            required
          />
          <textarea
            name="message"
            rows="4"
            placeholder="Votre message"
            class="rounded-md border border-surface-700 bg-surface-800 px-3 py-2 text-sm text-surface-100 placeholder-surface-400"
            required
          ></textarea>
          <div class="flex items-center justify-end gap-3">
            <button
              type="button"
              class="rounded-md border border-surface-600 px-4 py-2 text-sm text-surface-200 hover:border-surface-500"
              @click="closeContact"
            >
              Annuler
            </button>
            <button
              type="submit"
              class="rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-surface-900 hover:bg-primary-500 disabled:opacity-60"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? "Envoi..." : "Envoyer" }}
            </button>
          </div>
        </form>
        <p v-if="submitStatus === 'success'" class="mt-2 text-xs text-green-300">
          Merci ! Votre message a bien ete envoye.
        </p>
        <p v-else-if="submitStatus === 'error'" class="mt-2 text-xs text-red-300">
          Oups, un probleme est survenu. Merci de reessayer.
        </p>
      </div>
    </div>
  </footer>
</template>

<style>
.footer {
  position: relative;
  z-index: 10; /* Assure qu'il passe devant */
}
</style>
