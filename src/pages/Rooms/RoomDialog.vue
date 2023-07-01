<template>
  <v-dialog persistent v-model="roomDialog" width="600">
      <v-card class="pa-4">
        <div class="d-flex">
          <v-card-text>
            {{ form.roomName ? 'Update Room' : 'Add New Room' }}
          </v-card-text>
          <v-card-actions>
            <v-btn @click="closeDialog" icon><v-icon>mdi-close</v-icon></v-btn>
          </v-card-actions>
        </div>
        <v-text-field v-model="form.roomName" class="mb-4" outlined label="Name" :rules="rules" hide-details="auto"></v-text-field>
        <v-text-field v-model="form.roomCapacity" outlined label="Capacity" :rules="rules" hide-details="auto"></v-text-field>
        <v-card-actions class="justify-end mt-4">
          <v-btn color="primary" @click="value ? updateRoom() : createRoom()">Submit</v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script>
import axios from "../../axios.js";

export default {
  props: {
    value: {
      roomId: '',
      roomName: '',
      roomCapacity: '',
    },
    roomDialog: false
  },
  data() {
    return {
      form: {
        roomId: '',
        roomName: '',
        roomCapacity: '',
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
            roomId: value.roomId,
            roomName: value.roomName,
            roomCapacity: value.roomCapacity,
          }
        }else{
          this.form = {
            roomId: '',
            roomName: '',
            roomCapacity: '',
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
    createRoom() {
      axios.post('/rooms', {
        name: this.form.roomName,
        capacity: this.form.roomCapacity
      })
      .then(response => {
        console.error(response);
        this.closeDialog();
      })
      .catch(error => {
        console.error(error);
      });

    },
    updateRoom() {
      axios.put(`/rooms/${this.form.roomId}`, {
        name: this.form.roomName,
        capacity: parseInt(this.form.roomCapacity)
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