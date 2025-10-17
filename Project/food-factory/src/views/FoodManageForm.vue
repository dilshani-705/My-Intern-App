<template>
  <v-container class="pa-6" max-width="600">
    <v-card elevation="5" class="pt-0 px-0 bg-primary text-white">
      <v-card-title class="text-h6 text-center">
        Food Factory Management System – Production
      </v-card-title>
    </v-card>
    <v-card elevation="5" class="pa-5">
      <!-- Input Form -->
      <v-row class="mt-4" dense>
        <v-col cols="12" sm="4">
          <label class="form-label">Product Name</label>
          <v-text-field ref="productNameField" v-model="productName" :rules="[v => !!v || 'Product name is required']"></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <label class="form-label">Batch Number</label>
          <v-text-field ref="batchNumberField" v-model="batchNumber" :rules="[v => !!v || 'Batch number is required']"></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <label class="form-label">Production Date</label>
          <v-text-field
            ref="productionDateField"
            type="date"
            v-model="productionDate"
            :rules="[v => !!v || 'Production date is required']"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-btn color="green" @click="addItem" class="ma-2" :disabled="!isFormValid">Add</v-btn>
      </v-row>

      <!-- Table -->
      <v-table class="mt-4">
        <thead class="bg-secondary text-black">
          <tr>
            <th>Product Name</th>
            <th>Batch Number</th>
            <th>Production Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in products" :key="index">
            <td>{{ item.productName }}</td>
            <td>{{ item.batchNumber }}</td>
            <td>{{ item.productionDate }}</td>
            <td>
              <v-btn color="red" @click="deleteItem(index)" small>Delete</v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>

      <!-- Submit -->
      <v-row justify="center">
        <v-btn color="blue" class="mt-4" @click="submitToFirebase">Submit</v-btn>
      </v-row>
    
    </v-card>
    <!-- Success dialog -->
    <v-dialog v-model="showSuccessDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">Submission successful</v-card-title>
        <v-card-text>Data successfully added to Firebase.</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="closeSuccessDialog">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";
import { db } from '@/plugins/firebase'
import { collection, addDoc } from 'firebase/firestore'

const productName = ref("");
const batchNumber = ref("");
const productionDate = ref("");
const products = ref([]);
const showSuccessDialog = ref(false);
const productNameField = ref(null)
const batchNumberField = ref(null)
const productionDateField = ref(null)

const closeSuccessDialog = () => {
  showSuccessDialog.value = false
}

const isFormValid = computed(() => {
  return !!(productName.value && batchNumber.value && productionDate.value)
});

const addItem = () => {
  if (!productName.value || !batchNumber.value || !productionDate.value) return;
  products.value.push({
    productName: productName.value,
    batchNumber: batchNumber.value,
    productionDate: productionDate.value,
  });
  productName.value = "";
  batchNumber.value = "";
  productionDate.value = "";
};

const deleteItem = (index) => {
  products.value.splice(index, 1);
};

const submitToFirebase = async () => {
  if (products.value.length === 0) return alert("No data to submit.");
  try {
    const collectionRef = collection(db, "production");
    for (const item of products.value) {
      await addDoc(collectionRef, item);
    }
    // clear form fields and products after successful submission
    products.value = [];
    productName.value = "";
    batchNumber.value = "";
    productionDate.value = "";
    // show success dialog
    showSuccessDialog.value = true;
    // reset validation and focus first field after DOM updates
    await nextTick()
    productNameField.value?.resetValidation?.()
    batchNumberField.value?.resetValidation?.()
    productionDateField.value?.resetValidation?.()
    productNameField.value?.focus?.()
  } catch (error) {
    console.error("Error adding documents: ", error);
  }
};
</script>

<style scoped>
.form-label {
  font-weight: 600;
  display: block;
  margin-bottom: 4px;
}
</style>

