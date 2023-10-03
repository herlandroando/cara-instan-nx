import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Tailwind from "primevue/passthrough/tailwind";
import InputText from "primevue/inputtext";
import Menubar from "primevue/menubar";
import ToggleButton from "primevue/togglebutton";
import { usePassThrough } from "primevue/passthrough";

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(PrimeVue, { unstyled: true, pt: Tailwind });
    nuxtApp.vueApp.component("Button", Button);
    nuxtApp.vueApp.component("InputText", InputText);
    nuxtApp.vueApp.component("Menubar", Menubar);
    nuxtApp.vueApp.component("ToggleButton", ToggleButton);

});