import './assets/main.css'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';



import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { Button, InputText, Message, Password, Select, Tooltip } from 'primevue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});
app.component("P-Button", Button)
app.component("P-Password", Password)
app.component("P-InputText", InputText)
app.component("P-Select", Select)
app.component('P-Message',Message)
app.directive('tooltip', Tooltip);

app.mount('#app')
