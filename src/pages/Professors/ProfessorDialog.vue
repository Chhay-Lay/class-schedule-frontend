<template>
  <v-dialog persistent v-model="professorDialog" width="600">
      <v-card class="pa-4">
        <div class="d-flex">
          <v-card-text>
            {{ form.name ? 'Update Professor info' : 'Add New Professor' }}
          </v-card-text>
          <v-card-actions>
            <v-btn @click="closeDialog" icon><v-icon>mdi-close</v-icon></v-btn>
          </v-card-actions>
        </div>
        <v-text-field v-model="form.name" class="mb-4" outlined label="Name" :rules="rules" hide-details="auto"></v-text-field>
        <v-text-field v-model="form.email" class="mb-4" outlined label="Email" hide-details="auto"></v-text-field>
        <v-select
          v-model="form.selectedCourses"
          :items="courses"
          label="Courses"
          item-text="name"
          item-value="id"
          multiple
          chips
          outlined
          persistent-hint
        ></v-select>
        <v-select
          v-model="form.selectedUnavailableTime"
          :items="DayTimeSlots"
          label="Unavailable periods"
          :item-text="(item) => `${item.day} ${item.time}`"
          :item-value="(item) => `${item.day_id},${item.timeslot_id}`"
          multiple
          chips
          outlined
          persistent-hint
        ></v-select>
        <v-card-actions class="justify-end mt-4">
          <v-btn color="primary" @click="value ? updateProfessor() : createProfessor()">Submit</v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script>
import axios from "../../axios.js";

export default {
  props: {
    value: {
      id             : '',
      email          : '',
      name           : '',
      courses        : [],
      unavailableTime: [],
    },
    professorDialog: false,
    courses: [],
    DayTimeSlots: [],
    selectedCourses: [],
    selectedUnavailableTime: []
  },
  data() {
    return {
      form: {
        id: '',
        name: '',
        email: '',
        courses: [],
        unavailableTime: []
      },
      rules: [
        value => !!value || 'Required.',
      ]
    };
  },
  watch: {
    value: {
      handler(value) {
        if (value) {
          this.form = {
            id: value.id,
            name: value.name,
            email: value.email,
            selectedCourses: value.courses,
            selectedUnavailableTime: value.unavailableTime
          }
          console.log(this.form.selectedUnavailableTime);
        }else{
          this.form = {
            id: '',
            name: '',
            email: '',
            selectedCourses: [],
            selectedUnavailableTime: []
          }
        }
      },
      deep: true
    }
  },
  methods: {
    closeDialog() {
      this.$emit('dialog-closed');
    },
    createProfessor() {
      axios.post('/professors', {
        name: this.form.name,
        email: this.form.email,
        course_ids: this.form.selectedCourses,
        unavailable_periods: this.form.selectedUnavailableTime
      })
      .then(response => {
        console.error(response);
        this.closeDialog();
      })
      .catch(error => {
        console.error(error);
      });

    },
    updateProfessor() {
      axios.put(`/professors/${this.form.id}`, {
        name: this.form.name,
        email: this.form.email,
        course_ids: 
        this.$isArrayOfObj(this.form.selectedCourses)
        ? this.form.selectedCourses.map( obj => obj.id )
        : this.form.selectedCourses,

        unavailable_periods: 
        this.$isArrayOfObj(this.form.selectedUnavailableTime)
        ? this.form.selectedUnavailableTime.map( obj => obj.day_id + ',' + obj.timeslot_id )
        : this.form.selectedUnavailableTime
      })
      .then(response => {
        console.error(response);
        this.closeDialog();
      })
      .catch(error => {
        console.error(error);
      });
    }
  }
}
</script>