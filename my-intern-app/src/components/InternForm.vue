<template>
  <v-form ref="formRef" @submit.prevent="onSubmit" class="intern-form">
      <v-text-field
        v-model="form.name"
        :rules="nameRules"
        :error-messages="nameError ? [nameError] : []"
        label="Name"
        required
        density="compact"
        @blur="() => (touched.name = true)"
      />

    <v-text-field
      v-model="form.email"
      :rules="emailRules"
      :error-messages="emailError ? [emailError] : []"
      label="Email"
      type="email"
      required
      density="compact"
      @blur="() => (touched.email = true)"
    />

    <v-select
      v-model="form.role"
      :items="roles"
      :rules="roleRules"
      :error-messages="roleError ? [roleError] : []"
      label="Role"
      density="compact"
      :menu-props="{ maxHeight: '200' }"
      @blur="() => (touched.role = true)"
    />

    <v-text-field
      v-model="form.dateJoined"
      label="Date Joined"
      type="date"
      density="compact"
    />

    <div class="actions">
      <v-btn class="save-btn" type="submit" variant="contained" color="primary">Save</v-btn>
      <v-btn class="reset-btn" type="button" variant="text" @click="reset">Reset</v-btn>
    </div>

    <p v-if="snackbar.show" class="snackbar">{{ snackbar.message }}</p>
  </v-form>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import type { VForm } from 'vuetify/components'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/plugins/firebase'

const formRef = ref<VForm>()
const form = reactive({ name: '', email: '', role: '', dateJoined: '' })
const roles = ['Developer', 'Designer', 'Tester']
const snackbar = reactive({ show: false, message: '' })
const touched = reactive({ name: false, email: false, role: false })
const submitted = ref(false)

// validation rules
const nameRules = [(v: string) => !!v || 'Name is required']
const emailRules = [
  (v: string) => !!v || 'Email is required',
  (v: string) => /\S+@\S+\.\S+/.test(v) || 'Email must be valid',
]
const roleRules = [(v: string) => !!v || 'Role is required']

const nameError = computed(() => {
  if (!touched.name && !submitted.value) return ''
  const res = nameRules.map((r) => r(form.name)).find((v) => v !== true)
  return res === true ? '' : (res as string) || ''
})

const emailError = computed(() => {
  if (!touched.email && !submitted.value) return ''
  const res = emailRules.map((r) => r(form.email)).find((v) => v !== true)
  return res === true ? '' : (res as string) || ''
})

const roleError = computed(() => {
  if (!touched.role && !submitted.value) return ''
  const res = roleRules.map((r) => r(form.role)).find((v) => v !== true)
  return res === true ? '' : (res as string) || ''
})

function reset() {
  form.name = ''
  form.email = ''
  form.role = ''
  form.dateJoined = ''
  if (formRef.value && formRef.value.resetValidation) formRef.value.resetValidation()
}

async function onSubmit() {
  submitted.value = true
  touched.name = true
  touched.email = true
  touched.role = true

  // proper Vuetify 3 form validation
  const isValid = formRef.value?.validate() ?? false
  if (!isValid) {
    snackbar.message = 'Please fix validation errors.'
    snackbar.show = true
    setTimeout(() => (snackbar.show = false), 3000)
    return
  }

  // Additional manual guard: ensure required fields are present and email is valid
  const emailRegex = /\S+@\S+\.\S+/
  const manualValid = (form.name || '').toString().trim() !== '' && emailRegex.test((form.email || '').toString()) && (form.role || '').toString().trim() !== ''
  if (!manualValid) {
    // mark touched so inline errors show
    touched.name = true
    touched.email = true
    touched.role = true
    snackbar.message = 'Please fix validation errors.'
    snackbar.show = true
    setTimeout(() => (snackbar.show = false), 3000)
    return
  }

  // Only runs if form is valid
  try {
    // trim values before saving
    const payload = {
      name: (form.name || '').toString().trim(),
      email: (form.email || '').toString().trim(),
      role: (form.role || '').toString().trim(),
      dateJoined: form.dateJoined || null,
    }
    const docRef = await addDoc(collection(db, 'interns'), payload)
    console.log('Document written with ID: ', docRef.id)
    snackbar.message = 'Intern saved!'
    snackbar.show = true
    setTimeout(() => (snackbar.show = false), 3000)
    reset()
  } catch (e) {
    console.error('Error adding intern: ', e)
    snackbar.message = 'Error saving intern.'
    snackbar.show = true
    setTimeout(() => (snackbar.show = false), 3000)
  }
}
</script>

<style scoped>
.intern-form { display: grid; gap: 0.5rem; max-width: 420px }
.intern-form label { display: block; font-weight: 600 }
.intern-form input { width: 100%; padding: 0.35rem }
.actions { display:flex; gap:0.5rem; margin-top:0.5rem }
.snackbar { margin-top: 0.5rem; color: green }

/* Button styles */
.save-btn {
  background: #1976d2 !important;
  color: #fff !important;
  border-radius: 8px;
}
.save-btn:hover,
.save-btn:focus {
  outline: 3px solid rgba(44,62,80,0.15);
}
.reset-btn {
  background: var(--vt-c-indigo);
  color: #fff !important;
  border-radius: 8px;
}
.reset-btn:hover,
.reset-btn:focus {
  outline: 3px solid rgba(44,62,80,0.08);
}
</style>
