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
            <v-card-text class="pa-0">
              <v-simple-table>
                <template v-slot:default>
                  <thead class="pl-2">
                    <tr>
                      <th class="text-left pa-6">NAME</th>
                      <th class="text-left pa-6">STATUS</th>
                      <th class="text-left">PRINT</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in mock.table" :key="item.name">
                      <td class="pa-6">{{ item.name }}</td>
                      <td v-if="item.status === 'Sent'">
                        <v-chip link color="success" class="ma-2 ml-0">
                          Sent
                        </v-chip>
                      </td>
                      <td v-else-if="item.status === 'Pending'">
                        <v-chip link color="warning" class="ma-2 ml-0">
                          Pending
                        </v-chip>
                      </td>
                      <td v-else-if="item.status === 'Declined'">
                        <v-chip link color="secondary" class="ma-2 ml-0">
                          Declined
                        </v-chip>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import axios from "../../axios.js";

export default {
  components: {
  },
  data () {
    return {
      dashboardData: {},
    }
  },
  methods: {
  },
  mounted () {
    axios.get("/dashboard")
    .then((response) => {
      this.dashboardData = response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });
  }
}
</script>
