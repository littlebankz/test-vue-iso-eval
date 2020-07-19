<template>
  <v-navigation-drawer
    color="primary"
    dark
    app
    :mini-variant="miniVariant"
    :expand-on-hover="miniVariant"
    mobile-breakpoint="0">
    <v-list dense nav>
      <v-list-item two-line class="px-0">
        <v-list-item-avatar>
          <v-icon>mdi-account-circle</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>John Doe</v-list-item-title>
          <v-list-item-subtitle>Safety Instructor</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider dark></v-divider>
      <v-list-item :key="index" v-for="(menu, index) in menuList" :to="menu.to">
        <v-list-item-action>
          <v-icon>{{menu.icon}}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{menu.title}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider dark></v-divider>
    </v-list>
    <template v-slot:append>
      <v-list dense nav>
        <v-list-item to="/signout">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sign Out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "DrawerMenu",
  props: ["menuList"],
  data: function() {
    return {
      miniVariant: false
    };
  },
  created() {
    setTimeout(() => {
      this.miniVariant = true
    }, 2500)
  }
};
</script>

<style>
</style>