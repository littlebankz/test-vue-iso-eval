<template>
  <v-container>
    <v-row>
      <v-col cols="12" align="left">
        <EvalReportHeader />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <AddNewWorkEvalForm2
            title="ประเมินความเสี่ยงด้านความปลอดภัยในพื้นที่ / พื้นที่ภายใน"
            areaScope="inner"
            formScope="sec_area_inner"
            read-only="true"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <AddNewWorkEvalForm2
            title="ประเมินความเสี่ยงด้านความปลอดภัยในพื้นที่ / พื้นที่ภายนอก"
            areaScope="outer"
            formScope="sec_area_outer"
            read-only="true"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <AddNewWorkEvalForm2
            title="ประเมินความเสี่ยงด้านความปลอดภัยในกิจกรรม / พื้นที่ภายใน"
            areaScope="inner"
            formScope="sec_activity_inner"
            activitySlot="enable"
            read-only="true"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <AddNewWorkEvalForm2
            title="ประเมินความเสี่ยงด้านความปลอดภัยในกิจกรรม / พื้นที่ภายนอก"
            areaScope="outer"
            formScope="sec_activity_outer"
            activitySlot="enable"
            read-only="true"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EvalReportHeader from "../../components/EvalReportHeader";
import AddNewWorkEvalForm2 from "../../components/workeval/AddNewWorkEvalForm2";
export default {
  name: "WorkEvalReportSecurity",
  components: {
    EvalReportHeader,
    AddNewWorkEvalForm2,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style></style>
