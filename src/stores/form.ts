import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

interface UserRecord {
  id: number
  tags: string[]
  recordType: 'LDAP' | 'Локальная'
  login: string
  password: string
}

interface FormData {
  tags: string
  recordType: string
  login: string
  password: string
}

export const useFormStore = defineStore('formData', () => {
  const formState = reactive({
    tags: '',
    recordType: 'ldap',
    login: '',
    password: '',
  }) as FormData
  const id = ref(0)
  const data = reactive([]) as UserRecord[]
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

  const formFieldsValid = computed(() => {
    return {
      tags: true,
      recordType: checkValidRecordType(formState.recordType),
      login: checkValidLogin(formState.login),
      password: true,
    }
  })
  const isFormValid = computed(() => {
    Object.values(formFieldsValid).every((value) => value === true)
  })

  // Validators

  const isPasswordRequired = computed(() => formState.recordType === 'local')

  const checkValidRecordType = (recordType: string) =>
    recordType === 'LDAP' || recordType === 'Локальная'
  const checkValidLogin = (login: string) => login.length > 0 && login.length < 100
  const checkValidPassword = (password: string) => password.length < 100

  const convertTagsField = (data: string) => {
    const arrayData = data.trim().split(';')
    return arrayData.map((item) => ({ text: item.trim() }))
  }

  // Actions
  const saveRecord = (record: FormData) => {
    if (!isFormValid) console.log(`Данные не записаны, форма не валидна`)
    data.push({
      id: id.value++,
      tags: convertTagsField(formState.tags),
      recordType: formState.recordType,
      login: formState.login,
      password: formState.password,
    } as unknown as UserRecord)
  }
  const deleteRecord = (record_id: number) => {
    const index = data.findIndex((record) => record.id === record_id)
    if (index > -1) {
      data.splice(index, 1)
      console.log(`Успешно удалено`)
    } else {
      console.error(`Запись не найдена`)
    }
  }
  return {
    formState,
    formFieldsValid,
    isFormValid,
    deleteRecord,
    saveRecord,
    isPasswordRequired,
    recordTypeSuggestions,
  }

  // state: () => ({
  //   data: [] as UserRecord[],
  //   formState: {} as FormData,
  // }),
  // getters: {
  //   isFormValid(): boolean {
  //     return Object.values(this.formFieldsValid).every((value) => value)
  //   },
  //   formFieldsValid(state) {
  //     return {
  //       tags: true,
  //       recordType: true,
  //       login: true,
  //       password: true,
  //     }
  //   },
  // },
  // actions: {
  //   deleteRecord(record_id: number) {
  //     const index = this.data.findIndex((record) => record.id === record_id)
  //     if (index > -1) {
  //       this.data.splice(index, 1)
  //       console.log(`Успешно удалено`)
  //     } else {
  //       console.error(`Запись не найдена`)
  //     }
  //   },
  //   addRecord() {
  //     const emptyRecord: FormData = {
  //       tags: '',
  //       recordType: 'LDAP',
  //       login: '',
  //       password: '',
  //     }
  //     this.data.push(emptyRecord as FormData)
  //   },
  // },
})
