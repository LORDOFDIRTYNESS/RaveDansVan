<script setup>
import AppTopBar from "./components/AppTopBar.vue";
import TourDates from "./components/TourDates.vue";
import TourDatesTimeline from "./components/TourDatesTimeline.vue";
import MediaGallery from "./components/MediaGallery.vue";
import MediaCarousel from "./components/MediaCarousel.vue";
import OurLinks from "./components/OurLinks.vue";
import Banner from "./components/Banner.vue";
import AllInOne from "./components/AllInOne.vue";
import Footer from "./components/footer.vue";
import ScrollToTop from "./components/sub/ScrollToTop.vue";
</script>

<template>
  <Banner/>
  <video autoplay muted loop playsinline webkit-playsinline disablePictureInPicture id="background-video">
    <source src="/rdvspace.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <div id="video-overlay"></div>
  <AppTopBar/>
    <div class="bg-surface-50 dark:bg-surface-950 min-h-screen p-8 flex flex-col gap-6">
      <AllInOne/>
      <TourDates/>
      <MediaCarousel/>
<!--      <TourDatesTimeline/>-->
<!--      <MediaGallery/>-->

      <OurLinks/>
    </div>
  <Footer/>
  <ScrollToTop/>
</template>
<style>
@font-face {
  font-family: saira;
  src: url('./assets/fonts/SairaStencilOne-Regular.ttf');
}

#rdv{
  font-family: saira,serif;
}

#background-video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

#video-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6); /* Semi-transparent overlay */
  z-index: 0;
}


.app-container {
  position: relative;
  z-index: 1;
}
</style>


