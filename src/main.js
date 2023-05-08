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

/**
 * 데이터를 동적으로 렌더링할 컴포넌트를 반환합니다.
 * @param capsuleDto
 * @returns {string|string}
 */
app.config.globalProperties.$getValueComponent = (capsuleDto) => {
  if (capsuleDto.isScalarType) {
    return 'ScalarValue'
  }

  return capsuleDto.type === 'array' ? 'ArrayValue' : 'StdClassValue'
}

app.component('FaIcon', FontAwesomeIcon)

app.mount('#app')
