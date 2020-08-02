<template>
  <v-app id="inspire">
    <DrawerMenu :menuList="menuList" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<script>
import DrawerMenu from "../components/DrawerMenu";

export default {
  name: "Page",
  components: {
    DrawerMenu
  },
  data: function() {
    return {
      menuList: [
        {
          title: "Home",
          icon: "mdi-home",
          to: "/"
        },
        {
          title: "Account",
          icon: "mdi-account-box",
          to: "/account"
        },
        {
          title: "About",
          icon: "mdi-information",
          to: "/about"
        }
      ]
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    }
  }
};
</script>
