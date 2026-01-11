import "./assets/styles/main.css";

import Aura from "@primeuix/themes/aura";
import Button from "primevue/button";
import PrimeVue from "primevue/config";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import SelectButton from "primevue/selectbutton";
import StyleClass from "primevue/styleclass";
import ToggleSwitch from "primevue/toggleswitch";
import Toolbar from "primevue/toolbar";
import { createApp } from "vue";
import App from "./App.vue";
import {appState, useLayout} from "./composables/useLayout";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

/* add icons to the library */
library.add(fas, fab)

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(PrimeVue, {
	theme: {
		preset: Aura,
		options: {
			darkModeSelector: ".p-dark",
		},
	},
});

app.component("Button", Button);
app.component("InputText", InputText);
app.component("FloatLabel", FloatLabel);
app.component("Toolbar", Toolbar);
app.component("ToggleSwitch", ToggleSwitch);
app.component("SelectButton", SelectButton);
app.directive("styleclass", StyleClass);

// Set dark mode by default
appState.value.darkMode = true;
document.documentElement.classList.add("p-dark");
useLayout().updateColors("primary", "violet");

app.mount("#app");
