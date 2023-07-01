<template>
  <v-container fluid>
    <div class="tables-basic">
      <div class="d-flex align-center justify-space-between">
        <h1 class="page-title mt-10 mb-6">Classes</h1>
        <v-btn class="green" @click="createClassDialog"><v-icon color="white">mdi-plus</v-icon>Add new class</v-btn>
      </div>
        <v-row>
        <v-col cols="12">
          <v-simple-table>
            <template v-slot:default>
              <thead class="pl-2">
                <tr>
                  <th width="15%" class="text-center pa-6">NAME</th>
                  <th width="15%" class="text-center pa-6">SIZE</th>
                  <th width="34%" class="text-center pa-6">COURSES</th>
                  <th width="18%" class="text-center pa-6">UNAVAILABLE ROOMS</th>
                  <th width="18%" class="text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="collegeClass in collegeClasses" :key="collegeClass.name">
                  <td class="text-center pa-6">{{ collegeClass.name }}</td>
                  <td class="text-center pa-6">{{ collegeClass.size }}</td>
                  <td class="pa-6">
                    <p class="ml-16" v-for="course in collegeClass.courses" :key="course.id">
                      {{ `&bull; ${course.name} (${course.course_code})` }}
                    </p>
                  </td>
                  <td class="pa-6">
                    <p class="ml-16" v-for="unavailable_room in collegeClass.unavailable_rooms" :key="unavailable_room.id">
                      {{ `&bull; ${unavailable_room.name} (${unavailable_room.capacity})` }}
                    </p>
                  </td>
                  <td class="text-center pa-6">
                    <v-btn class="mx-2 green" @click="updateClassDialog(collegeClass)"><v-icon color="white">mdi-pencil</v-icon></v-btn>
                    <v-btn class="mx-2 red" @click="deleteClass(collegeClass)"><v-icon color="white">mdi-delete</v-icon></v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <classes-dialog :classDialog="classDialog" v-model="selectedCollegeClass" :courses="courses" :rooms="rooms" @dialog-closed="dialogClosed"/>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import axios from "../../axios.js";
import ClassesDialog from './ClassesDialog.vue';

export default {
  components: { ClassesDialog },
  data() {
    return {
      collegeClasses: [],
      courses: [],
      rooms: [],
      selectedCollegeClass: {},
      classDialog: false
    };
  },
  mounted() {
    this.getClasses();
    this.getCourses();
    this.getRooms();
  },
  methods: {
    getClasses() {
      axios.get("/classes")
      .then((response) => {
        this.collegeClasses = response.data.data;
      })
      .catch((error) => {
        console.error(error);
      });
    },
    getCourses() {
      axios.get("/courses")
      .then((response) => {
        this.courses = response.data.data;
      })
      .catch((error) => {
        console.error(error);
      });
    },
    getRooms() {
      axios.get("/rooms")
      .then((response) => {
        this.rooms = response.data.data;
      })
      .catch((error) => {
        console.error(error);
      });
    },
    createClassDialog() {
      this.selectedCollegeClass = null;
      this.classDialog = true;
    },
    updateClassDialog(collegeClass) {
      this.selectedCollegeClass = {
        id: collegeClass.id,
        name: collegeClass.name,
        size: collegeClass.size,
        courses: collegeClass.courses,
        unavailableRooms: collegeClass.unavailable_rooms,
      };
      this.classDialog = true;
    },
    deleteClass(collegeClass) {
      if (confirm("Are you sure you want to delete this item?"))
      {
        axios.delete(`/classes/${collegeClass.id}`)
        .then((response) => {
          this.getClasses();
        })
        .catch((error) => {
          console.error(error);
        });
      }
    },
    dialogClosed() {
      this.classDialog = false;
      this.getClasses();
    }
  }
};
</script>
