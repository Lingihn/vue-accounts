import { defineStore } from 'pinia'
import { computed, reactive, ref, watchEffect } from 'vue'

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
        recordType: 'local',
        login: '',
        password: '',
      },
    ],
  ) as FormData[]
  const id = ref(1)
  const rowsValid = ref([true])
  const newRecord = computed(
    () =>
      ({
        id: id.value,
        tags: '',
        recordType: 'local',
        login: '',
        password: '',
      }) as FormData,
  )
  watchEffect(() => {
    const storageDataRaw = localStorage.getItem(STORAGE_KEY)
    const storageData = storageDataRaw ? reactive(JSON.parse(storageDataRaw)) : undefined
    const newStorage = formState.map((item, index) => {
      return rowsValid.value[index] ? item : storageData[index]
    })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newStorage))
  })

  const isPasswordRequired = computed(() => (id: number) => {
    const findIndex = formState.findIndex((record) => record.id === id)
    if (findIndex > -1) {
      return formState[findIndex].recordType === 'local'
    } else {
      console.error(`isPasswordRequired - Error, ID doesnt exist in state`)
    }
  })

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
    } else {
      console.error(`deleteRecord - Error, ID doesnt exist in state`)
    }
  }
  return {
    addRecord,
    formState,
    deleteRecord,
    rowsValid,
    isPasswordRequired,
  }
})
