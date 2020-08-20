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
            title="ประเมินความเสี่ยงด้านสิ่งแวดล้อมในพื้นที่ / พื้นที่ภายใน"
            areaScope="inner"
            formScope="env_area_inner"
            read-only="true"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <AddNewWorkEvalForm2
            title="ประเมินความเสี่ยงด้านสิ่งแวดล้อมในพื้นที่ / พื้นที่ภายนอก"
            areaScope="outer"
            formScope="env_area_outer"
            read-only="true"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <AddNewWorkEvalForm2
            title="ประเมินความเสี่ยงด้านสิ่งแวดล้อมในกิจกรรม / พื้นที่ภายใน"
            areaScope="inner"
            formScope="env_activity_inner"
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
            title="ประเมินความเสี่ยงด้านสิ่งแวดล้อมในกิจกรรม / พื้นที่ภายนอก"
            areaScope="outer"
            formScope="env_activity_outer"
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
  name: "WorkEvalReportEnvironment",
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
