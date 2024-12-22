import { defineStore } from 'pinia'
import { computed, reactive, ref, watchEffect } from 'vue'

interface UserRecord {
  id: number
  tags: string[]
  recordType: 'LDAP' | 'Локальная'
  login: string
  password: string
}

interface FormData {
  id: number
  tags: string
  recordType: string
  login: string
  password: string
}

export const useFormStore = defineStore('formData', () => {
  const STORAGE_KEY = 'form_data'
  const storageDataRaw = localStorage.getItem(STORAGE_KEY)
  const storageData = storageDataRaw ? JSON.parse(storageDataRaw) : undefined

  const formState = reactive(
    storageData ?? [
      {
        id: 0,
        tags: '',
        recordType: 'ldap',
        login: '',
        password: '',
      },
    ],
  ) as FormData[]
  const id = ref(1)
  const data = reactive([]) as UserRecord[]
  const rowsValid = ref([true])
  const newRecord = computed(
    () =>
      ({
        id: id.value,
        tags: '',
        recordType: 'ldap',
        login: '',
        password: '',
      }) as FormData,
  )
  watchEffect(() => {
    const storageData = reactive(JSON.parse(localStorage.getItem(STORAGE_KEY)))
    const newStorage = formState.map((item, index) => {
      return (rowsValid.value[index]) ? item : storageData[index]
    })
    console.log(`Записано в Стор`, newStorage)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newStorage))
  })

  // const formFieldsValid = computed(() => {
  //   return {
  //     tags: true,
  //     recordType: checkValidRecordType(formState.recordType),
  //     login: checkValidLogin(formState.login),
  //     password: true,
  //   }
  // })
  // const isFormValid = computed(() => {
  //   Object.values(formFieldsValid).every((value) => value === true)
  // })

  // Validators

  const isPasswordRequired = computed(() => (id: number) => {
    const findIndex = formState.findIndex((record) => record.id === id)
    if (findIndex > -1) {
      return formState[findIndex].recordType === 'local'
    } else {
      console.log(`isPasswordRequired - Error, ID doesnt exist in state`)
    }
  })

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

  const addRecord = () => {
    formState.push(newRecord.value)
    rowsValid.value.push(true)
    id.value++
  }

  const deleteRecord = (record_id: number) => {
    const index = formState.findIndex((record) => record.id === record_id)
    if (index > -1) {
      formState.splice(index, 1)
      rowsValid.value.splice(index, 1)
      console.log(`Успешно удалено`)
    } else {
      console.error(`Запись не найдена`)
    }
  }
  return {
    addRecord,
    formState,
    // formFieldsValid,
    // isFormValid,
    deleteRecord,
    rowsValid,
    saveRecord,
    isPasswordRequired,
  }
})
