<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h1 class="page-title black--text">Dashboard</h1>
      </v-row>
      <v-row>
        <v-col lg="3" sm="6" md="5" cols="12">
          <v-card
            class="mx-auto"
            max-width="344"
            outlined
          >
            <v-list-item three-line>
              <v-list-item-content>
                <h2 class="mb-4">
                  Rooms
                </h2>
                <h1>
                  {{ dashboardData.rooms.value }}
                </h1>
              </v-list-item-content>

              <v-icon size="75">
                mdi-home
              </v-icon>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col lg="3" sm="6" md="7" cols="12">
          <v-card
            class="mx-auto"
            max-width="344"
            outlined
          >
            <v-list-item three-line>
              <v-list-item-content>
                <h2 class="mb-4">
                  Courses
                </h2>
                <h1>
                  {{ dashboardData.courses.value }}
                </h1>
              </v-list-item-content>

              <v-icon size="75">
                mdi-book
              </v-icon>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col lg="3" sm="6" md="7" cols="12">
          <v-card
            class="mx-auto"
            max-width="344"
            outlined
          >
            <v-list-item three-line>
              <v-list-item-content>
                <h2 class="mb-4">
                  Professors
                </h2>
                <h1>
                  {{ dashboardData.professors.value }}
                </h1>
              </v-list-item-content>

              <v-icon size="75">
                mdi-school
              </v-icon>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col lg="3" sm="6" md="5" cols="12">
          <v-card
            class="mx-auto"
            max-width="344"
            outlined
          >
            <v-list-item three-line>
              <v-list-item-content>
                <h2 class="mb-4">
                  Classes
                </h2>
                <h1>
                  {{ dashboardData.classes.value }}
                </h1>
              </v-list-item-content>

              <v-icon size="75">
                mdi-google-classroom
              </v-icon>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card class="support-requests mx-1 mb-1">
            <v-card-title class="pa-6 pb-0">
              <p>Schedule</p>
              <v-spacer></v-spacer>
            </v-card-title>
            <div class="text-center">
              <v-btn @click="timeTableDialog = true">Generate Schedule</v-btn>
            </div>
            <v-card-text class="pa-0">
              <v-simple-table>
                <template v-slot:default>
                  <thead class="pl-2">
                    <tr>
                      <th width="40%" class="text-left pa-6">NAME</th>
                      <th width="40%" class="text-left pa-6">STATUS</th>
                      <th width="20%" class="text-left pl-6">PRINT</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in timeTables" :key="item.id">
                      <td class="pa-6">{{ item.name }}</td>
                      <td class="pa-6">{{ item.status }}</td>
                      <td class="pa-6">
                        <v-btn @click="downloadPdf(item.id)">PRINTS</v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
            <generate-timetable-dialog :timeTableDialog="timeTableDialog" @dialog-closed="dialogClosed"/>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import axios from "../../axios.js";
import GenerateTimetableDialog from "./GenerateTimetableDialog.vue";

export default {
  components: {
    GenerateTimetableDialog
  },
  data () {
    return {
      dashboardData: {},
      timeTables: [],
      timeTableDialog: false
    }
  },
  methods: {
    downloadPdf(id) {
      // Make an API request to retrieve the PDF file
      axios.get(`time-table/get-pdf/${id}`, {
          responseType: 'blob' // Set the response type to blob
        })
        .then(response => {
          const blob = new Blob([response.data], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);

          // Open a new window with the PDF URL
          const printWindow = window.open(url, '_blank');
          
          // Wait for the window to load and then trigger the print function
          printWindow.onload = () => {
            printWindow.print();
          };
        })
        .catch(error => {
          console.error('Error downloading PDF:', error);
        });
    },
    dialogClosed() {
      this.timeTableDialog = false;
      this.getCourses();
    }
  },
  mounted () {
    axios.get("/dashboard")
    .then((response) => {
      this.dashboardData = response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });

    axios.get("/time-table")
    .then((response) => {
      this.timeTables = response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
  }
}
</script>
