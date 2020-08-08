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
                    @change="handleCancelValidation"
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
                    @change="handleCancelValidation"
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
                    >Login</v-btn
                  >
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
// import authentication from "../plugins/authentication";
import { mapActions } from "vuex";
import router from "../router";

export default {
  name: "SignIn",
  data() {
    return {
      formValidation: true,
      usernameRules: [(v) => !!v || "Username is required"],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 8) || "Password must be longer than 8 characters",
      ],
      username: "",
      password: "",
      submitted: false,
    };
  },
  methods: {
    ...mapActions(["setUserInfo"]),
    async handleFormSubmit() {
      // Validate entire form according to each input rules
      if (this.$refs.signInForm.validate()) {

        /* REMOVE COMMENT ON PRODUCTION */

        // const { username, authToken, role } = await authentication.signIn(
        //   this.username,
        //   this.password
        // );

        /*                              */

        /* REMOVE ON PRODUCTION */
        const username = 'administrator'
        const authToken = 'donotcheck'
        const role = 'admin'
        /*                      */

        if (username != null && authToken != null && role != null) {
          this.setUserInfo({ username, authToken, role });
          router.push("/");
        } else {
          // Login invalid
          this.submitted = true;
          this.usernameRules.push("Your username or password is invalid");
          this.passwordRules.push("Your username or password is invalid");
          this.$refs.signInForm.validate();
        }
      }
    },
    handleCancelValidation() {
      if (this.submitted) {
        this.submitted = false;
        this.usernameRules.pop();
        this.passwordRules.pop();
        this.$refs.signInForm.validate();
      }
    },
  },
};
</script>

<style></style>
