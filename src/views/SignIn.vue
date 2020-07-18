<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6" lg="4" xl="4">
            <v-card outlined>
              <v-card-title>
                <h3>Sign in</h3>
              </v-card-title>
              <v-card-text class="pb-0 pt-4">
                <v-form
                  @submit.prevent="handleFormSubmit"
                  id="sign-in-form"
                  ref="signInForm"
                  v-model="formValidation"
                  lazy-validation
                >
                  <v-text-field
                    label="Username"
                    name="username"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="username"
                    :rules="usernameRules"
                    @click="handleClickCancelValidation"
                    required
                    outlined
                    dense
                  ></v-text-field>
                  <v-text-field
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                    :rules="passwordRules"
                    @click="handleClickCancelValidation"
                    required
                    outlined
                    dense
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions class="pt-0">
                <v-spacer></v-spacer>
                <v-col cols="4">
                  <v-btn
                  type="submit"
                  form="sign-in-form"
                  color="primary"
                  class="white--text"
                  depressed
                  block
                >
                  Login
                </v-btn>
                </v-col>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
import router from '../router'

export default {
  name: 'SignIn',
  data() {
    return {
      formValidation: true,
      usernameRules: [
        v => !!v || 'Username is required',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 8)   || 'Password must be longer than 8 characters'
      ],
      username: '',
      password: '',
      submitted: false
    };
  },
  methods: {
    setUsername(username) {
      // Retrieve username from localStorage
      localStorage.setItem('username', username)
    },
    setAuthToken(authToken) {
      // Retrieve authToken from localStorage
      localStorage.setItem('user-token', authToken)
    },
    signIn(username, password) {
      // Try login to api server
      return axios.post(process.env.VUE_APP_API_URL + '/login', { username, password })
        .then(result => {
          if (result.status == 200) {
            return result.data;
          } else {
            return false
          }
        })
        .catch(error => {
          console.log(error)
          return false
        })
    },
    async handleFormSubmit() {
      // Validate entire form according to each input rules
      if(this.$refs.signInForm.validate()) {
        let loginResult = await this.signIn(this.username, this.password)
        let { username, authToken } = loginResult
        if (username != null && authToken != null) {
          this.setUsername(username);
          this.setAuthToken(authToken);
          router.push('/')
        } else {
          // Login invalid
          this.submitted = true;
          this.usernameRules.push('Your username or password is invalid')
          this.passwordRules.push('Your username or password is invalid')
          this.$refs.signInForm.validate()
        }
      }
    },
    handleClickCancelValidation() {
      if (this.submitted) {
        this.submitted = false;
        this.usernameRules.pop()
        this.passwordRules.pop()
        this.$refs.signInForm.validate()
      }
    }
  }
};
</script>

<style>
</style>