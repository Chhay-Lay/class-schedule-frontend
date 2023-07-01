<template>
  <v-dialog persistent v-model="courseDialog" width="600">
      <v-card class="pa-4">
        <div class="d-flex">
          <v-card-text>
            {{ form.name ? 'Update Course' : 'Add New Course' }}
          </v-card-text>
          <v-card-actions>
            <v-btn @click="closeDialog" icon><v-icon>mdi-close</v-icon></v-btn>
          </v-card-actions>
        </div>
        <v-text-field v-model="form.course_code" class="mb-4" outlined label="Course code" :rules="rules" hide-details="auto"></v-text-field>
        <v-text-field v-model="form.name" class="mb-4" outlined label="Name" :rules="rules" hide-details="auto"></v-text-field>
        <v-select
          v-model="form.selectedProfessors"
          :items="professors"
          label="Professors"
          item-text="name"
          item-value="id"
          multiple
          chips
          outlined
          persistent-hint
        ></v-select>
        <v-card-actions class="justify-end mt-4">
          <v-btn color="primary" @click="value ? updateCourse() : createCourse()">Submit</v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script>
import axios from "../../axios.js";

export default {
  props: {
    value: {
      id: '',
      name: '',
      course_code: '',
      professors: []
    },
    courseDialog: false,
    professors: [],
    selectedProfessors: []
  },
  data() {
    return {
      form: {
        id: '',
        name: '',
        course_code: '',
        selectedProfessors: []
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
            course_code: value.course_code,
            selectedProfessors: value.professors
          }
        }else{
          this.form = {
            id: '',
            name: '',
            course_code: '',
            selectedProfessors: []
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
    createCourse() {
      axios.post('/courses', {
        name: this.form.name,
        course_code: this.form.course_code,
        professor_ids: this.form.selectedProfessors
      })
      .then(response => {
        console.error(response);
        this.closeDialog();
      })
      .catch(error => {
        console.error(error);
      });

    },
    updateCourse() {
      axios.put(`/courses/${this.form.id}`, {
        name: this.form.name,
        course_code: this.form.course_code,
        professor_ids: this.$isArrayOfObj(this.form.selectedProfessors)
        ? this.form.selectedProfessors.map( obj => obj.id )
        : this.form.selectedProfessors
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