<template>
  <v-dialog persistent v-model="timeDialog" width="600">
      <v-card class="pa-4">
        <div class="d-flex">
          <v-card-text>
            {{ form.timeSlotsId ? 'Update Time Period' : 'Add New Time Period' }}
          </v-card-text>
          <v-card-actions>
            <v-btn @click="closeDialog" icon><v-icon>mdi-close</v-icon></v-btn>
          </v-card-actions>
        </div>
        <v-select
          v-model="form.timeSlotsFrom"
          :items="generateTimeArray()"
          label="From"
          chips
          outlined
          persistent-hint
          :rules="rules"
        ></v-select>
        <v-select
          v-model="form.timeSlotsTo"
          :items="generateTimeArray()"
          label="To"
          chips
          outlined
          persistent-hint
          :rules="rules"
        ></v-select>
        <v-card-actions class="justify-end mt-4">
          <v-btn color="primary" @click="value ? updateTimeSlot() : createTimeSlot()">Submit</v-btn>
        </v-card-actions>
      </v-card>
      <v-snackbar v-model="snackbar" color="red">
        <div class="white--text">{{ snackbarText }}</div>
      </v-snackbar>
  </v-dialog>
</template>

<script>
import axios from "../../axios.js";

export default {
  props: {
    value: {
      timeSlotsId: '',
      timeSlotsFrom: '',
      timeSlotsTo: '',
    },
    timeDialog: false
  },
  data() {
    return {
      form: {
        timeSlotsId: '',
        timeSlotsFrom: '',
        timeSlotsTo: '',
      },
      rules: [
        value => !!value || 'Required.',
      ],
      defaultTimes: '',
      snackbar: false,
      snackbarText: '',
    };
  },
  watch: {
    value: {
      handler(value) {
        if (value) {
          this.form = {
            timeSlotsId: value.timeSlotsId,
            timeSlotsFrom: value.timeSlotsFrom,
            timeSlotsTo: value.timeSlotsTo,
          }
        }else{
          this.form = {
            timeSlotsId: '',
            timeSlotsFrom: '',
            timeSlotsTo: '',
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
    createTimeSlot() {
      axios.post('/time-slots', {
        from: this.form.timeSlotsFrom,
        to: this.form.timeSlotsTo
      })
      .then(response => {
        console.error(response);
        this.closeDialog();
      })
      .catch(error => {
        this.snackbarText = error.response.data[0];
        this.snackbar = true;
        console.error(error);
      });

    },
    updateTimeSlot() {
      console.log(this.form)
      axios.put(`/time-slots/${this.form.timeSlotsId}`, {
        from: this.form.timeSlotsFrom,
        to: this.form.timeSlotsTo
      })
      .then(response => {
        console.error(response);
        this.closeDialog();
      })
      .catch(error => {
        this.snackbarText = error.response.data[0];
        this.snackbar = true;
        console.error(error);
      });
    },
    generateTimeArray() {
      const times = [];
      for (let hour = 0; hour <= 23; hour++) {
        for (let minute = 0; minute <= 30; minute += 30) {
          const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          times.push(time);
        }
      }
      return times;
    },
  }
}
</script>