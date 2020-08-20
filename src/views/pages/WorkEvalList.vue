<template>
  <v-container>
    <v-row>
      <v-col cols="12" align="left">
        <ReportHeader currentPage="WorkEvalList" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" align="left">
        <WorkEvalDataTable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ReportHeader from "../../components/ReportHeader";
import WorkEvalDataTable from "../../components/workeval/WorkEvalDataTable";
export default {
  name: "WorkEvalList",
  components: {
    ReportHeader,
    WorkEvalDataTable,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style></style>
