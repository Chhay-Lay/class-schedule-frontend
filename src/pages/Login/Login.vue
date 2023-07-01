<template>
  <v-app>
    <v-container fluid>
      <v-row no-gutters class="align-start">
        <v-col cols="12" class="login-part d-flex align-center justify-center flex-column">
          <div class="login-wrapper pt-md-4 pt-0">
            <v-tabs grow>
              <v-tabs-slider></v-tabs-slider>
              <v-tab :href="`#tab-login`">
                LOGIN
              </v-tab>

              <v-tab-item :value="'tab-login'" >
                <v-form>
                  <v-container>
                    <v-row class="flex-column">
                      <v-form>
                        <v-col>
                          <v-text-field
                              v-model="email"
                              :rules="emailRules"
                              label="Email Address"
                              required
                          ></v-text-field>
                          <v-text-field
                              v-model="password"
                              :rules="passRules"
                              type="password"
                              label="Password"
                              hint="At least 4 characters"
                              required
                          ></v-text-field>

                        </v-col>
                        <v-col class="d-flex justify-center">
                          <v-btn
                              class="text-capitalize"
                              large
                              :disabled="password.length === 0 || email.length === 0"
                              color="primary"
                              @click="login"
                          >
                            Login</v-btn>
                          <!-- <v-btn large text class="text-capitalize primary--text">Forget Password</v-btn> -->
                        </v-col>
                      </v-form>
                    </v-row>
                  </v-container>
                </v-form>
              </v-tab-item>
            </v-tabs>
          </div>
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <v-footer>
            <div class="primary--text">© 2014-2020 <a href="https://flatlogic.com/" class="text-decoration-none">Flatlogic</a>, LLC. All rights reserved.</div>
          </v-footer>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
  import axios from "../../axios.js";

  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        password: ''
      }
    },
    methods: {
      login(){
        axios.post('/login', {
          email: this.email,
          password: this.password
        })
        .then(response => {
          const { token, refresh } = response.data.data;

          localStorage.setItem('token', token);
          localStorage.setItem('refresh-token', refresh);

          this.$router.push('/dashboard');
        })
        .catch(error => {
          console.error(error);
        });
      }
    },
    created() {
      if (window.localStorage.getItem('token') === 'true') {
        this.$router.push('/dashboard');
      }
    }
  }

</script>

<style src="./Login.scss" lang="scss"/>
