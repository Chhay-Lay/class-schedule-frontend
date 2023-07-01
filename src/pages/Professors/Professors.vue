<template>
  <v-container fluid>
    <div class="tables-basic">
      <div class="d-flex align-center justify-space-between">
        <h1 class="page-title mt-10 mb-6">Professors</h1>
        <v-btn class="green" @click="createProfessorDialog"><v-icon color="white">mdi-plus</v-icon>Add new professor</v-btn>
      </div>
      <v-row>
        <v-col cols="12">
          <v-simple-table>
            <template v-slot:default>
              <thead class="pl-2">
                <tr>
                  <th class="text-center pa-6">NAME</th>
                  <th class="text-center pa-6">EMAIL</th>
                  <th class="text-center pa-6">COURSES TAUGHT</th>
                  <th class="text-center pa-6">UNAVAILABLE PERIODS</th>
                  <th class="text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="professor in professors" :key="professor.id">
                  <td class="text-center pa-6">{{ professor.name }}</td>
                  <td class="text-center pa-6">{{ professor.email }}</td>
                  <td class="text-center pa-6">
                    <p v-for="course in professor.courses" :key="course.id">{{ `${course.name} (${course.course_code})` }}</p>  
                  </td>
                  <td class="text-center pa-6">
                    <p v-for="unavailableTimeslot in professor.unavailable_timeslots" :key="unavailableTimeslot.id">
                      {{ unavailableTimeslot.day + ' ' + unavailableTimeslot.time }}
                    </p>  
                  </td>
                  <td class="text-center pa-6">
                    <v-btn class="mx-2 green" @click="updateProfessorDialog(professor)"><v-icon color="white">mdi-pencil</v-icon></v-btn>
                    <v-btn class="mx-2 red" @click="deleteProfessor(professor)"><v-icon color="white">mdi-delete</v-icon></v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <professor-dialog 
            v-model="selectedProfessor" 
            :professorDialog="professorDialog" 
            :courses="courses"
            :DayTimeSlots="DayTimeSlots"
            @dialog-closed="dialogClosed"
          />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>

import axios from "../../axios.js";
import ProfessorDialog from './ProfessorDialog.vue';

export default {
  components: { ProfessorDialog },
  data() {
    return {
      professors     : [],
      courses        : [],
      timeSlots      : [],
      days           : [],
      DayTimeSlots   : [],
      professorDialog: false,
      selectedProfessor: {
        id             : '',
        email          : '',
        name           : '',
        courses        : [],
        unavailableTime: [],
      }
    };
  },
  mounted() {
    this.getCourses();
    this.getProfessors();
    this.getTimeSlots();
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
    getTimeSlots() {
      axios.get("/time-slots")
      .then((response) => {
        this.timeSlots = response.data.data;
        this.days      = response.data.days;
        this.generateDayTimeSlot()
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
    deleteProfessor(professor) {
      if (confirm("Are you sure you want to delete this item?"))
      {
        axios.delete(`/professors/${professor.id}`)
        .then((response) => {
          this.getProfessors(); 
        })
        .catch((error) => {
          console.error(error);
        });
      }
    },
    createProfessorDialog() {
      this.selectedProfessor = null;
      this.professorDialog   = true;
    },
    updateProfessorDialog(professor) {
      this.selectedProfessor = {
        id             : professor.id,
        name           : professor.name,
        email          : professor.email,
        courses        : professor.courses,
        unavailableTime: professor.unavailable_timeslots,
      };
      this.professorDialog = true;
    },
    dialogClosed() {
      this.professorDialog = false;
      this.getProfessors();
    },
    generateDayTimeSlot() {
      Object.values(this.days).forEach((dayObj) => {
        Object.values(this.timeSlots).forEach((timeSlot) => {
          const day_id      = dayObj.id;
          const timeslot_id = timeSlot.id;
          const day         = dayObj.day;
          const time        = timeSlot.time;
          this.DayTimeSlots.push({day_id, timeslot_id, day, time });
        });
      });
    }
  }
}

</script>
