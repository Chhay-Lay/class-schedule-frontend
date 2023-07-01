<template>
  <v-container fluid>
    <div class="tables-basic">
      <div class="d-flex align-center justify-space-between">
        <h1 class="page-title mt-10 mb-6">Rooms</h1>
        <v-btn class="green" @click="createRoomDialog"><v-icon color="white">mdi-plus</v-icon>Add new room</v-btn>
      </div>
      <v-simple-table>
        <template v-slot:default>
          <thead class="pl-2">
            <tr>
              <th width="40%" class="text-center pa-6">NAME</th>
              <th width="40%" class="text-center pa-6">CAPACITY</th>
              <th width="20%" class="text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="room in rooms" :key="room.id">
              <td class="text-center pa-6">{{ room.name }}</td>
              <td class="text-center pa-6">{{ room.capacity }}</td>
              <td class="text-center pa-6">
                <v-btn class="mx-2 green" @click="updateRoomDialog(room)"><v-icon color="white">mdi-pencil</v-icon></v-btn>
                <v-btn class="mx-2 red" @click="deleteRoom(room)"><v-icon color="white">mdi-delete</v-icon></v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <room-dialog :roomDialog="roomDialog" v-model="selectedRoom"  @dialog-closed="dialogClosed"/>
    </div>
  </v-container>
</template>

<script>
import axios from "../../axios.js";
import RoomDialog from './RoomDialog.vue';

export default {
  components: { RoomDialog },
  data() {
    return {
      rooms: [],
      roomName: '',
      roomCapacity: '',
      roomDialog: false,
      selectedRoom: {
        roomId: '',
        roomName: '',
        roomCapacity: '',
      },
    };
  },
  mounted() {
    this.getRooms();
  },
  methods: {
    getRooms() {
      axios.get("/rooms")
      .then((response) => {
        this.rooms = response.data.data;
      })
      .catch((error) => {
        console.error(error);
      });
    },
    deleteRoom(room) {
      if (confirm("Are you sure you want to delete this item?"))
      {
        axios.delete(`/rooms/${room.id}`)
        .then((response) => {
          console.error(response);
          this.getRooms();
        })
        .catch((error) => {
          console.error(error);
        });
      }
    },
    createRoomDialog() {
      this.selectedRoom = null;
      this.roomDialog = true;
    },
    updateRoomDialog(room) {
      this.selectedRoom = {
        roomId: room.id,
        roomName: room.name,
        roomCapacity: room.capacity,
      };
      this.roomDialog = true;
    },
    dialogClosed() {
      this.roomDialog = false;
      this.getRooms();
    }
  }
};
</script>
