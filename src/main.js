import { createApp } from 'vue'
import App from './App.vue'

import FontAwesomeIcon from '@/fontawsome-icon'

import './assets/style/tailwind.css'

const app = createApp(App);

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
