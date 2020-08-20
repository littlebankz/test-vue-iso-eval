<template>
  <v-container>
    <v-row>
      <v-col cols="12" align="left">
        <EvalReportHeader />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" align="left">
        <v-card>
          <v-card-title>ข้อมูลรายงาน</v-card-title>
          <v-card-text>
            <v-container class="pb-0 mb-0">
              <v-row dense>
                <v-col cols="2">
                  <v-subheader>ขื่อรายงาน</v-subheader>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    disabled
                    outlined
                    dense
                    v-model="this.getWorkEvalInfo.name"
                    label="ชื่อรายงาน"
                  ></v-text-field>
                </v-col>

                <v-col cols="2">
                  <v-subheader>ลักษณะการประเมิน</v-subheader>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    disabled
                    outlined
                    dense
                    v-model="this.getWorkEvalInfo.evaluateType"
                    label="ลักษณะการประเมิน"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="2">
                  <v-subheader>บริษัท/หน่วยงาน</v-subheader>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    disabled
                    outlined
                    dense
                    v-model="this.getWorkEvalInfo.work_eval_company"
                    label="บริษัท"
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    disabled
                    outlined
                    dense
                    v-model="this.getWorkEvalInfo.work_eval_department"
                    label="หน่วยงาน"
                  ></v-text-field>
                </v-col>

                <v-col cols="2">
                  <v-subheader>ครั้งที่/ประจำปี</v-subheader>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    disabled
                    outlined
                    dense
                    v-model="this.getWorkEvalInfo.evaluateNumber"
                    label="ครั้งที่"
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    disabled
                    outlined
                    dense
                    v-model="this.getWorkEvalInfo.evaluateDate"
                    label="ประจำปี"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="2">
                  <v-subheader>ผู้ประเมิน</v-subheader>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    disabled
                    outlined
                    dense
                    v-model="this.getWorkEvalInfo.work_eval_evaluator"
                    label="ผู้ประเมิน"
                  ></v-text-field>
                </v-col>

                <v-col cols="2">
                  <v-subheader>วันที่</v-subheader>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    disabled
                    outlined
                    dense
                    v-model="this.getWorkEvalInfo.evaluateDate"
                    label="วัน / เดือน / ปี"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <AddNewWorkEvalForm1
            title="ความเสี่ยงในพื้นที่ / พื้นที่ภายใน"
            areaScope="inner"
            formScope="area_inner"
            read-only="true"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <AddNewWorkEvalForm1
            title="ความเสี่ยงในพื้นที่ / พื้นที่ภายนอก"
            areaScope="outer"
            formScope="area_outer"
            read-only="true"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <AddNewWorkEvalForm1
            title="ความเสี่ยงในกิจกรรม / พื้นที่ภายใน"
            areaScope="inner"
            formScope="activity_inner"
            activitySlot="enable"
            read-only="true"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <AddNewWorkEvalForm1
            title="ความเสี่ยงในกิจกรรม / พื้นที่ภายนอก"
            areaScope="outer"
            formScope="activity_outer"
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
import AddNewWorkEvalForm1 from "../../components/workeval/AddNewWorkEvalForm1";
import { mapGetters } from "vuex";
export default {
  name: "WorkEvalReport",
  components: {
    EvalReportHeader,
    AddNewWorkEvalForm1,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getWorkEvalInfo"]),
  },
  methods: {},
};
</script>

<style></style>
