import { createApp } from 'vue'
import App from './App.vue'

import dayjs from "dayjs"
import 'dayjs/locale/ko'
import 'dayjs/locale/en'
import relativeTime from 'dayjs/plugin/relativeTime'

import FontAwesomeIcon from '@/fontawsome-icon'

import './assets/style/tailwind.css'

dayjs.extend(relativeTime)
dayjs.locale('en')

const app = createApp(App);

app.config.globalProperties.$dayjs = dayjs

app.component('FaIcon', FontAwesomeIcon)

app.mount('#app')
