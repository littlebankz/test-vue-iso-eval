<template>
  <v-container>
    <v-row>
      <v-col cols="12" align="left">
        <CompanyDataTable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CompanyDataTable from "../../components/company/CompanyDataTable";
export default {
  name: "Company",
  components: {
    CompanyDataTable,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style></style>
