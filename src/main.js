import { createApp } from 'vue'
import App from './App.vue'

import FontAwesomeIcon from '@/fontawsome-icon'

import '@/assets/style/tailwind.css'
import '@/assets/style/fira_code.css'

const app = createApp(App);

app.config.globalProperties.$getValueComponent = (capsuleDto) => {
  if (capsuleDto.isScalarType) {
    return 'ScalarValue'
  }

  return capsuleDto.type === 'array' ? 'ArrayValue' : 'StdClassValue'
}

app.config.globalProperties.$convertKeyToCapsuleDto = (key) => {
  return {
    "type": typeof key,
    "isScalarType": true,
    "namespace": null,
    "className": null,
    "value": key
  }
}

app.component('FaIcon', FontAwesomeIcon)

app.mount('#app')
