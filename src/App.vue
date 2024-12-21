<script setup lang="ts">
import { useFormStore } from '@/stores/form.ts'
import {
  Button as PButton,
  InputText as PInputText,
  Message as PMessage,
  Password as PPassword,
  Select as PSelect,
} from 'primevue'
import { computed } from 'vue'

const store = useFormStore()

const gridClass = computed(() => store.isPasswordRequired ? 'fourFields' : 'threeFields')

</script>

<template>
  <div class="wrapper">
    <div class="header">
      <h1>Учетные записи</h1>
      <p-button variant="outlined" class="add-button">+</p-button>
    </div>
    <p-message severity="secondary" class="message"
    >Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
    </p-message>

    <div class="form">
      <div class="form-header">
        <label>Метки</label>
        <label>Тип Записи</label>
        <label>Логин</label>
        <label>Пароль</label>
      </div>
      <div class="form-item" :class="gridClass">
        <p-input-text placeholder="Значение" v-model="store.formState.tags"/>
        <P-Select
          v-model="store.formState.recordType"
          :options="store.recordTypeSuggestions"
          option-label="name"
          option-value="code"
        />
        <P-InputText placeholder="Значение" v-model="store.formState.login" />
        <p-password v-if="store.isPasswordRequired" v-model="store.formState.password" toggle-mask />
        <p-button variant="outlined">Del</p-button>
      </div>
      <div class="form-item" :class="gridClass">
        <p-input-text placeholder="Значение" v-model="store.formState.tags"/>
        <P-Select
          v-model="store.formState.recordType"
          :options="store.recordTypeSuggestions"
          option-label="name"
          option-value="code"
        />
        <P-InputText placeholder="Значение" v-model="store.formState.login" />
        <p-password v-if="store.isPasswordRequired" v-model="store.formState.password" toggle-mask />
        <p-button variant="outlined">Del</p-button>
      </div>
      <div class="form-item" :class="gridClass">
        <p-input-text placeholder="Значение" v-model="store.formState.tags"/>
        <P-Select
          v-model="store.formState.recordType"
          :options="store.recordTypeSuggestions"
          option-label="name"
          option-value="code"
        />
        <P-InputText placeholder="Значение" v-model="store.formState.login" />
        <p-password v-if="store.isPasswordRequired" v-model="store.formState.password" toggle-mask />
        <p-button variant="outlined">Del</p-button>
      </div>
    </div>
  </div>
</template>

<style scoped>


.wrapper {
  width: 100%;
}
.message {
  margin-bottom: 20px;
}
.form{
  display:grid;
  grid-template-columns: 1fr;

  .form-header{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 40px;
    gap: 10px;
    padding: 10px;
  }
  .form-item{
    display: grid;
    gap: 10px;
    padding: 10px;
  }
}

.threeFields{
  grid-template-columns: 1fr 1fr 2fr 40px;
}
.fourFields{
  grid-template-columns: 1fr 1fr 1fr 1fr 40px;
}


.header {
  display: flex;
  margin-bottom: 20px;

  .add-button {
    padding: 0 15px;
    font-weight: bold;
    margin-left: 20px;
  }
}
</style>
