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
  id: number
  tags: string
  recordType: string
  login: string
  password: string
}

export const useFormStore = defineStore('formData', () => {
  const formState = reactive([
    {
      id: 0,
      tags: '',
      recordType: 'ldap',
      login: '',
      password: '',
    },
  ]) as FormData[]
  const id = ref(1)
  const data = reactive([]) as UserRecord[]
  const newRecord = computed(() =>(
    {
      id: id.value,
      tags: '',
      recordType: 'ldap',
      login: '',
      password: '',
    } as FormData
  ))

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

  const isPasswordRequired = computed(() => ((id: number) => {
    const findIndex = formState.findIndex((record) => record.id === id)
    if(findIndex > -1) {
      return formState[findIndex].recordType === 'local'
    }else{
      console.log(`isPasswordRequired - Error, ID doesnt exist in state`)
    }
  }))

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


  const addRecord = () =>  {
    formState.push(newRecord.value)
    id.value++
  }

  const deleteRecord = (record_id: number) => {
    const index = formState.findIndex((record) => record.id === record_id)
    if (index > -1) {
      formState.splice(index, 1)
      console.log(`Успешно удалено`)
    } else {
      console.error(`Запись не найдена`)
    }
  }
  return {
    addRecord,
    formState,
    formFieldsValid,
    isFormValid,
    deleteRecord,
    saveRecord,
    isPasswordRequired,
  }
})
