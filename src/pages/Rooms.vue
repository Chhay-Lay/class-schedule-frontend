<template>
  <v-container fluid>
    <div class="tables-basic">
      <h1 class="page-title mt-10 mb-6">Rooms</h1>
          <v-simple-table>
            <template v-slot:default>
              <thead class="pl-2">
                <tr>
                  <th class="text-center pa-6">NAME</th>
                  <th class="text-center pa-6">CAPACITY</th>
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
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'Typography',
};
</script>