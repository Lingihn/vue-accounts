<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useFormStore } from '@/stores/form.ts'
import {
  Button as PButton,
  InputText as PInputText,
  Password as PPassword,
  Select as PSelect,
} from 'primevue'

const store = useFormStore()
const recordTypeSuggestions = [
  {
    name: 'LDAP',
    code: 'ldap',
  },
  {
    name: 'Локальная',
    code: 'local',
  },
]

const model_id = defineModel('id')
const [model_tags, modifier] = defineModel('tags',{
  set(value) {
    console.log(`value - set`, value)
    if (modifier.split) {
      const array = value.split(';')
      return array.map(item => ({text: item.trim()}))
    }
    return value
  },
  get(value){
    console.log(`value - get`, value)
    if (modifier.split) {
      if(Array.isArray(value)){
        return value.map(item => (item.text)).join('; ')
      }else{
        return value
      }
    }
    return value
  }
})
const model_recordType = defineModel('recordType')
const model_login = defineModel('login')
const model_password = defineModel('password')

const loginFieldTouched = ref(false)
const tagsFieldTouched = ref(false)
const passwordFieldTouched = ref(false)

const loginErrors = ref([])
const tagsErrors = ref([])
const passwordErrors = ref([])
const anyErrors = computed(() => {
  return loginErrors.value.length > 0 ||
    tagsErrors.value.length > 0 || passwordErrors.value.length > 0
})
watch(anyErrors, () => {
  const index = store.formState.findIndex((item) => item.id === model_id.value)
  store.rowsValid[index] = !anyErrors.value;
})

// Validators
const checkValidTags = (tags: string) => {
  tagsErrors.value = []
  if (tags.length && tags.trim().length > 50) {
    tagsErrors.value.push('Введите < 50 символов' as never)
  }
}
const checkValidPassword = (password: string) => {
  passwordErrors.value = []
  if (password.trim().length > 100) {
    passwordErrors.value.push('Введите < 100 символов' as never)
  }
}
const checkValidLogin = (login: string) => {
  loginErrors.value = []
  if (!login.trim().length) {
    loginErrors.value.push('Обязательно для заполнения' as never)
  }
  if (login.trim().length > 100) {
    loginErrors.value.push('Введите < 100 символов' as never)
  }
}
// EventFocus
const onFocusLogin = (event) => {
  loginFieldTouched.value = true
}
const onFocusPassword = (event) => {
  passwordFieldTouched.value = true
}
const onFocusTags = (event) => {
  tagsFieldTouched.value = true
}
// EventBlur
const onBlurLogin = (event) => {
  if (loginFieldTouched.value) {
    checkValidLogin(event.target.value)
  }
}
const onBlurPassword = (event) => {
  if (passwordFieldTouched.value) {
    checkValidPassword(event.target.value)
  }
}
const onBlurTags = (event) => {
  if (tagsFieldTouched.value) {
    checkValidTags(event.target.value)
  }
}
</script>
<template>
  <P-InputText
    @blur="onBlurTags"
    @focus="onFocusTags"
    :invalid="!!tagsErrors.length"
    v-tooltip.bottom="tagsErrors.join(',')"
    placeholder="Значение"
    v-model="model_tags"
  />
  <P-Select
    v-model="model_recordType"
    :options="recordTypeSuggestions"
    option-label="name"
    option-value="code"
  />
  <P-InputText
    @blur="onBlurLogin"
    @focus="onFocusLogin"
    :invalid="!!loginErrors.length"
    v-tooltip.bottom="loginErrors.join(',')"
    placeholder="Значение"
    v-model="model_login"
  />
  <p-password
    v-if="store.isPasswordRequired(model_id as number)"
    @blur="onBlurPassword"
    @focus="onFocusPassword"
    :invalid="!!passwordErrors.length"
    v-tooltip.bottom="passwordErrors.join(',')"
    v-model="model_password"
    toggle-mask
  />
  <p-button
    @click="store.deleteRecord(model_id as number)"
    variant="outlined"
  >
    Del
  </p-button>
</template>
