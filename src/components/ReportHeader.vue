<template>
  <v-card>
    <v-breadcrumbs :items="items" large></v-breadcrumbs>
  </v-card>
</template>

<script>
export default {
  name: "ReportHeader",
  props: ["currentPage"],
  computed: {},
  data() {
    return {
      items: [
        {
          text: "Work Registration",
          disabled: false,
          href: "/work/" + this.$route.params.id,
        },
        {
          text: "Work Risk Evaluation",
          disabled: false,
          href: "/workeval/" + this.$route.params.id,
        },
        {
          text: "Work Instruction",
          disabled: true,
          href: "/",
        },
        {
          text: "Work Risk Control and Improve",
          disabled: true,
          href: "/",
        },
        {
          text: "Work Improve Plan",
          disabled: true,
          href: "/",
        },
      ],
    };
  },
};
</script>

<style></style>
