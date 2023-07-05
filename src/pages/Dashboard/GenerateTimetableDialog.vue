<template>
  <v-dialog persistent v-model="timeTableDialog" width="600">
      <v-card class="pa-4">
        <div class="d-flex">
          <v-card-text>
            Generate Timetable
          </v-card-text>
          <v-card-actions>
            <v-btn @click="closeDialog" icon><v-icon>mdi-close</v-icon></v-btn>
          </v-card-actions>
        </div>
        <v-text-field v-model="form.name" class="mb-4" outlined label="Name" :rules="rules" hide-details="auto"></v-text-field>
        <v-select
          v-model="form.id"
          :items="days"
          label="day"
          item-text="name"
          item-value="id"
          multiple
          chips
          outlined
          persistent-hint
        ></v-select>
        <v-card-actions class="justify-end mt-4">
          <v-btn color="primary" @click="generateTimeTable" >Submit</v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script>
import axios from "../../axios.js";

export default {
  props: {
    timeTableDialog: false
  },
  data() {
    return {
      form: {
        id: [],
        name: ''
      },
      days: [
        { id: 1, name: 'Monday' },
        { id: 2, name: 'Tuesday' },
        { id: 3, name: 'Wednesday' },
        { id: 4, name: 'Thursday' },
        { id: 5, name: 'Friday' },
        { id: 6, name: 'Saturday' },
        { id: 7, name: 'Sunday' }
      ],
      rules: [
        value => !!value || 'Required.',
      ]
    };
  },
  methods: {
    closeDialog() {
      this.$emit('dialog-closed');
    },
    generateTimeTable() 
    {
      let payload = {
        name: this.form.name,
        day_ids: this.form.id
      }
      axios.post('/time-table', payload)
      .then(response => {
        this.closeDialog();
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
}
</script>