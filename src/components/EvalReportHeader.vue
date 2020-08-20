<template>
  <v-card>
    <v-breadcrumbs :items="items" large></v-breadcrumbs>
  </v-card>
</template>

<script>
export default {
  name: "EvalReportHeader",
  computed: {},
  data() {
    return {
      items: [
        {
          text: "Work Risk Report",
          disabled: false,
          href:
            "/workeval/" +
            this.$route.params.id +
            "/" +
            this.$route.params.eval_id +
            "/",
        },
        {
          text: "Work Risk Environment Evaluation Report",
          disabled: false,
          href:
            "/workeval/" +
            this.$route.params.id +
            "/" +
            this.$route.params.eval_id +
            "/environment",
        },
        {
          text: "Work Risk Security Evaluation Report",
          disabled: false,
          href:
            "/workeval/" +
            this.$route.params.id +
            "/" +
            this.$route.params.eval_id +
            "/security",
        },
      ],
    };
  },
};
</script>

<style></style>
