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
                  v-model="valid"
                  lazy-validation
                >
                  <v-text-field
                    label="Username"
                    name="username"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="username"
                    :rules="usernameRules"
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
  name: "SignIn",
  components: {
  },
  data() {
    return {
      valid: true,
      usernameRules: [
        v => !!v || 'Username is required',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 8)   || 'Password must be longer than 8 characters'
      ],
      username: "",
      password: ""
    };
  },
  created() {
    // Get username, token, created date from local storage
    let username = localStorage.getItem('username')
    let token = localStorage.getItem('user-token')

    // If items in local storage exist -> redirect to main page
    // If not, try removing items in local storage (just in case)
    if (username != null && token != null) {

      // Validate the token with api server
      axios.post(process.env.VUE_APP_API_URL + '/login/authtoken', {username, token})
        .then(res => {
          const { isValid } = res.data
          if (isValid) {
            // Redirect user to home page
            router.push("/")
          } else {
            // Remove items in local storage
            localStorage.removeItem('username');
            localStorage.removeItem('user-token');
          }
        })
        .catch(e => console.log(e))

    } else {
      // Remove items in local storage
      localStorage.removeItem('username');
      localStorage.removeItem('user-token');
    }
            
  },
  methods: {
    // When sign in form is submitted
    handleFormSubmit() {
      // Validate entire form according to each input rules
      if(this.$refs.signInForm.validate()) {
        // Form is validated 
        const credential = {
          username: this.username,
          password: this.password
        }

        // Try login to api server
        axios.post(process.env.VUE_APP_API_URL + '/login', credential)
          .then(res => {
            // Check for status of the response
            if (res.status == 200) {
              const { username, authToken } = res.data
              if (username != null && authToken != null) {
                localStorage.setItem('username', username)
                localStorage.setItem('user-token', authToken)

                router.push("/")
              }
            }
            console.log(res.data)
          })
          .catch(e => console.log(e))
      }
    }
  }
};
</script>

<style>
</style>