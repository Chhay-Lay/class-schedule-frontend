<template>
  <v-container fluid>
    <div class="tables-basic">
      <div class="d-flex align-center justify-space-between">
        <h1 class="page-title mt-10 mb-6">Courses</h1>
        <v-btn class="green" @click="createCourseDialog"><v-icon color="white">mdi-plus</v-icon>Add new course</v-btn>
      </div>
      <v-row>
        <v-col cols="12">
          <v-simple-table>
            <template v-slot:default>
              <thead class="pl-2">
                <tr>
                  <th class="text-center pa-6">COURSE CODE</th>
                  <th class="text-center pa-6">NAME</th>
                  <th class="text-center pa-6">TAUGHT BY</th>
                  <th class="text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="course in courses" :key="course.id">
                  <td class="text-center pa-6">{{ course.course_code }}</td>
                  <td class="text-center pa-6">{{ course.name }}</td>
                  <td class="text-center pa-6">
                    <p v-for="professor in course.professors" :key="professor.id">{{ professor.name }}</p>
                  </td>
                  <td class="text-center pa-6">
                    <v-btn class="mx-2 green" @click="updateCourseDialog(course)"><v-icon color="white">mdi-pencil</v-icon></v-btn>
                    <v-btn class="mx-2 red" @click="deleteCourse(course)"><v-icon color="white">mdi-delete</v-icon></v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <course-dialog :courseDialog="courseDialog" v-model="selectedCourse" :professors="professors"  @dialog-closed="dialogClosed"/>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>

import axios from "../../axios.js";
import CourseDialog from './CourseDialog.vue';

export default {
  components: { CourseDialog },
  data () {
    return {
      courses: [],
      professors: [],
      courseDialog: false,
      selectedCourse: {
        id: '',
        course_code: '',
        name: '',
        professors: [],
      },
    }
  },
  mounted () {
    this.getCourses();
    this.getProfessors();
  },
  methods: {
    getCourses() {
      axios.get("/courses")
      .then((response) => {
        this.courses = response.data.data;
      })
      .catch((error) => {
        console.error(error);
      });
    },
    getProfessors() {
      axios.get("/professors")
      .then((response) => {
        this.professors = response.data.data;
      })
      .catch((error) => {
        console.error(error);
      });
    },
    deleteCourse(course) {
      if (confirm("Are you sure you want to delete this item?"))
      {
        axios.delete(`/courses/${course.id}`)
        .then((response) => {
          this.getCourses(); 
        })
        .catch((error) => {
          console.error(error);
        });
      }
    },
    createCourseDialog() {
      this.selectedCourse = null;
      this.courseDialog = true;
    },
    updateCourseDialog(course) {
      this.selectedCourse = {
        id: course.id,
        name: course.name,
        course_code: course.course_code,
        professors: course.professors,
      };
      this.courseDialog = true;
    },
    dialogClosed() {
      this.courseDialog = false;
      this.getCourses();
    }
  }
}
</script>
