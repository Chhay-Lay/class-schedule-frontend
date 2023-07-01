<template>
  <v-dialog persistent v-model="classDialog" width="600">
      <v-card class="pa-4">
        <div class="d-flex">
          <v-card-text>
            {{ form.name ? 'Update Class Room' : 'Add New Class Room' }}
          </v-card-text>
          <v-card-actions>
            <v-btn @click="closeDialog" icon><v-icon>mdi-close</v-icon></v-btn>
          </v-card-actions>
        </div>
        <v-text-field v-model="form.name" class="mb-4" outlined label="Name" :rules="rules" hide-details="auto"></v-text-field>
        <v-text-field v-model="form.size" class="mb-4" outlined label="Size" :rules="rules" hide-details="auto"></v-text-field>
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
          v-model="form.selectedUnavailableRooms"
          :items="rooms"
          label="Unavailable Rooms"
          item-text="name"
          item-value="id"
          multiple
          chips
          outlined
          persistent-hint
        ></v-select>
        <v-card-actions class="justify-end mt-4">
          <v-btn color="primary" @click="value ? updateClass() : createClass()">Submit</v-btn>
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
      size: '',
      courses: [],
      unavailableRooms: []
    },
    courses: [],
    rooms: [],
    selectedCollegeClass: [],
    classDialog: false
  },
  data() {
    return {
      form: {
        id: '',
        name: '',
        size: '',
        selectedCourses: [],
        selectedUnavailableRooms: []
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
            size: value.size,
            selectedCourses: value.courses,
            selectedUnavailableRooms: value.unavailableRooms,
          }
        }else{
          this.form = {
            id: '',
            name: '',
            size: '',
            selectedCourses: [],
            selectedUnavailableRooms: []
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
    createClass() {
      axios.post('/classes', {
        name: this.form.name,
        size: this.form.size,
        courses: this.form.selectedCourses,
        unavailable_rooms: this.form.selectedUnavailableRooms,
      })
      .then(response => {
        console.error(response);
        this.closeDialog();
      })
      .catch(error => {
        console.error(error);
      });

    },
    updateClass() {
      axios.put(`/classes/${this.form.id}`, {
        name: this.form.name,
        size: this.form.size,
        courses: this.$isArrayOfObj(this.form.selectedCourses)
        ? this.form.selectedCourses.map( obj => obj.id )
        : this.form.selectedCourses,
        unavailable_rooms: this.$isArrayOfObj(this.form.selectedUnavailableRooms)
        ? this.form.selectedUnavailableRooms.map( obj => obj.id )
        : this.form.selectedUnavailableRooms
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