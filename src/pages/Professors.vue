<template>
  <v-container fluid>
    <div class="tables-basic">
      <h1 class="page-title mt-10 mb-6">Professors</h1>
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
              <!-- <tbody>
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
              </tbody> -->
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>

export default {
  name: 'Notifications',
  data() {
    return {}
  },
  methods: {
    addInfoNotification() {
      this.$toast.info("New user feedback received", {
        position: this.position,
        timeout: 6000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true
      });
    },
    addErrorNotification() {
      this.$toast.error("Message was not sent!", {
        position: this.position,
        timeout: 6000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true
      });
    },
    addSuccessNotification() {
      this.$toast.success("The item was shipped", {
        position: this.position,
        timeout: 6000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true
      });
    },

    toggleLocation(position) {
      this.position = position;
      this.$toasted.options.position = this.position;
      this.$toasted.show(null);
    },
  }
};

</script>