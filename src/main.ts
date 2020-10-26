import {createApp} from 'vue'
import App from '@/App.vue'
import {createState, stateSymbol} from "@/store";

createApp(App).provide(stateSymbol, createState()).mount('#app');