<template>
  <v-container fluid>
    <div class="tables-basic">
      <div class="d-flex align-center justify-space-between">
        <h1 class="page-title mt-10 mb-6">Times Period</h1>
        <v-btn class="green" @click="createTimeDialog"><v-icon color="white">mdi-plus</v-icon>Add new time period</v-btn>
      </div>
      <v-row>
        <v-col cols="12">
          <v-simple-table>
            <template v-slot:default>
              <thead class="pl-2">
                <tr>
                  <th width="80%" class="text-center pa-6">PERIOD</th>
                  <th class="text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="timeSlot in timeSlots" :key="timeSlot.name">
                  <td class="text-center pa-6">{{ timeSlot.time }}</td>
                  <td class="text-center pa-6">
                    <v-btn class="mx-2 green" @click="updateTimeDialog(timeSlot)"><v-icon color="white">mdi-pencil</v-icon></v-btn>
                <v-btn class="mx-2 red" @click="deleteTimeSlots(timeSlot)"><v-icon color="white">mdi-delete</v-icon></v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <time-dialog :timeDialog="timeDialog" v-model="selectedTimeSlots"  @dialog-closed="dialogClosed"/>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import axios from "../../axios.js";
import TimeDialog from './TimeDialog.vue';

export default {
  components: { TimeDialog },
  data() {
    return {
      timeDialog: false,
      timeSlots: [],
    };
  },
  mounted() {
    this.getTimeSlots();
  },
  methods: {
    getTimeSlots() {
      axios.get("/time-slots")
      .then((response) => {
        this.timeSlots = response.data.data;
      })
      .catch((error) => {
        console.error(error);
      });
    },
    deleteTimeSlots(timeSlots) {
      if (confirm("Are you sure you want to delete this item?"))
      {
        axios.delete(`/time-slots/${timeSlots.id}`)
        .then((response) => {
          console.error(response);
          this.getTimeSlots();
        })
        .catch((error) => {
          console.error(error);
        });
      }
    },
    createTimeDialog() {
      this.selectedTimeSlots = null;
      this.timeDialog = true;
    },
    updateTimeDialog(timeSlots) {
      this.selectedTimeSlots = {
        timeSlotsId: timeSlots.id,
        timeSlotsFrom: timeSlots.time.split('-')[0].trim(),
        timeSlotsTo: timeSlots.time.split('-')[1].trim(),
      };
      this.timeDialog = true;
    },
    dialogClosed() {
      this.timeDialog = false;
      this.getTimeSlots();
    }
  }
};
</script>
