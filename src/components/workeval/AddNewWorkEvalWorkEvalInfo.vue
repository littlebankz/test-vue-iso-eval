<template>
  <v-container class="pb-0 mb-0">
    <v-row dense>
      <v-col cols="2">
        <v-subheader>ขื่อรายงาน</v-subheader>
      </v-col>
      <v-col cols="4">
        <v-text-field
          outlined
          dense
          v-model="buffer_input_work_eval.work_eval_name"
          label="ชื่อรายงาน"
        ></v-text-field>
      </v-col>

      <v-col cols="2">
        <v-subheader>ลักษณะการประเมิน</v-subheader>
      </v-col>
      <v-col cols="4">
        <v-select
          outlined
          dense
          :items="headers_eval_type"
          v-model="buffer_input_work_eval.work_eval_type"
          label="ลักษณะการประเมิน"
        ></v-select>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="2">
        <v-subheader>บริษัท/หน่วยงาน</v-subheader>
      </v-col>
      <v-col cols="2">
        <v-select
          outlined
          dense
          :items="headers_company"
          v-model="buffer_input_work_eval.work_eval_company"
          label="บริษัท"
        ></v-select>
      </v-col>
      <v-col cols="2">
        <v-select
          outlined
          dense
          :items="headers_department"
          v-model="buffer_input_work_eval.work_eval_department"
          label="หน่วยงาน"
        ></v-select>
      </v-col>

      <v-col cols="2">
        <v-subheader>ครั้งที่/ประจำปี</v-subheader>
      </v-col>
      <v-col cols="2">
        <v-text-field
          outlined
          dense
          v-model="buffer_input_work_eval.work_eval_count"
          label="ครั้งที่"
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field
          outlined
          dense
          v-model="buffer_input_work_eval.work_eval_year"
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
          outlined
          dense
          v-model="buffer_input_work_eval.work_eval_evaluator"
          label="ผู้ประเมิน"
        ></v-text-field>
      </v-col>

      <v-col cols="2">
        <v-subheader>วันที่</v-subheader>
      </v-col>
      <v-col cols="4">
        <v-text-field
          outlined
          dense
          v-model="buffer_input_work_eval.work_eval_date"
          label="วัน / เดือน / ปี"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddNewWorEvalkWorkEvalInfo",
  props: [],
  data() {
    return {
      buffer_input_work_eval: {
        work_eval_name: "",
        work_eval_type: "",
        work_eval_company: "",
        work_eval_department: "",
        work_eval_count: "",
        work_eval_year: "",
        work_eval_evaluator: "",
        work_eval_date: "",
      },
      headers_eval_type: [
        "ประจำปี",
        "ก่อนเปลี่ยนแปลง",
        "ระหว่างเปลี่ยนแปลง",
        "หลังเปลี่ยนแปลง",
        "เกิดอุบัติการณ์ หรือ จากข้อร้องเรียน",
      ],
      headers_company: ["บริษัท ก", "บริษัท ข", "บริษัท ค", "บริษัท ง"],
      headers_department: [
        "หน่วยงาน ก",
        "หน่วยงาน ข",
        "หน่วยงาน ค",
        "หน่วยงาน ง",
      ],
    };
  },
  computed: {},
  watch: {
    buffer_input_work_eval: {
      handler(val) {
        this.updateWorkEvalBuffer(val);
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions(["updateWorkEvalBuffer"]),
    clearForm() {
      this.buffer_input_work_eval = {
        work_eval_name: "",
        work_eval_type: "",
        work_eval_company: "",
        work_eval_department: "",
        work_eval_count: "",
        work_eval_year: "",
        work_eval_evaluator: "",
        work_eval_date: "",
      };
    },
  },
};
</script>

<style></style>
