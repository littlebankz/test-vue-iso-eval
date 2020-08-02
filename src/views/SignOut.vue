<template>
  <div></div>
</template>

<script>
import { mapActions } from "vuex";
import router from "../router";
export default {
  name: "SignOut",
  methods: {
    ...mapActions(["clearUserInfo"]),
  },
  created() {
    this.clearUserInfo();
    router.push("/signin");
  },
};
</script>

<style></style>
