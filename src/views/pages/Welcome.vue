<template>
  <v-container>
    <v-row>
      <v-col cols="12" align="left">
        <WorksDataTable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import WorksDataTable from "../../components/WorksDataTable";
export default {
  name: "Welcome",
  components: {
    WorksDataTable
  },
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>

<style>
</style>