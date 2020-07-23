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
import WorksDataTable from "../../components/work/WorksDataTable";
export default {
  name: "Work",
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