<script setup lang="ts">
import { useFormStore } from '@/stores/form.ts'
import { Button as PButton, Message as PMessage } from 'primevue'
import { computed } from 'vue'
import FormRow from '@/components/FormRow.vue'
import 'primeicons/primeicons.css'

const store = useFormStore()

const gridClass = computed(() => (id: number) => {
  return store.isPasswordRequired(id) ? 'fourFields' : 'threeFields'
})
</script>

<template>
  <div class="wrapper">
    <div class="header">
      <h1>Учетные записи</h1>
      <p-button @click="store.addRecord" variant="outlined" class="add-button"
        ><span class="pi pi-plus"></span>
      </p-button>
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

      <div
        v-for="item in store.formState"
        :key="item.id"
        class="form-item"
        :class="gridClass(item.id)"
      >
        <FormRow
          v-model:id="item.id"
          v-model:tags.split="item.tags"
          v-model:recordType="item.recordType"
          v-model:login="item.login"
          v-model:password="item.password"
        />
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

.form {
  display: grid;
  grid-template-columns: 1fr;

  .form-header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 40px;
    gap: 10px;
    padding: 10px;
  }

  .form-item {
    display: grid;
    gap: 10px;
    padding: 10px;
  }
}

.threeFields {
  grid-template-columns: 1fr 1fr 2fr 40px;
}

.fourFields {
  grid-template-columns: 1fr 1fr 1fr 1fr 40px;
}

.header {
  display: flex;
  margin-bottom: 20px;

  .add-button {
    padding: 0 10px;
    margin-left: 20px;
  }
}
</style>
