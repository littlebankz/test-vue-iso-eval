<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-btn
            type="button"
            color="primary"
            class="white--text"
            depressed
            @click="signOut"
          >Sign Out</v-btn>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import router from "../router";
import axios from "axios";

export default {
  name: "Home",
  components: {},
  created() {
    // Get username, token, created date from local storage
    let username = localStorage.getItem("username");
    let token = localStorage.getItem("user-token");

    // If items in local storage exist -> allow on this page
    // If not, try removing items in local storage (just in case) and redirect to signin
    if (username != null && token != null) {
      // Validate the token with api server
      axios
        .post(process.env.VUE_APP_API_URL + "/login/authtoken", {
          username,
          token
        })
        .then(res => {
          const { isValid } = res.data;
          if (isValid) {
            // Allow on this page
          } else {
            // Remove items in local storage and redirect to singin
            localStorage.removeItem("username");
            localStorage.removeItem("user-token");
            router.push("/signin");
          }
        })
        .catch(e => console.log(e));
    } else {
      // Remove items in local storage and redirect to singin
      localStorage.removeItem("username");
      localStorage.removeItem("user-token");
      router.push("/signin");
    }
  },
  methods: {
    signOut() {
      // Remove items in local storage and redirect to singin
      localStorage.removeItem("username");
      localStorage.removeItem("user-token");
      router.push("/signin");
    }
  }
};
</script>
