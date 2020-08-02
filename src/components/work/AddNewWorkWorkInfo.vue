<template>
  <v-container class="pb-0 mb-0">
    <v-row dense>
      <v-col cols="5">
        <v-subheader>ขื่องาน</v-subheader>
      </v-col>
      <v-col cols="7">
        <v-text-field outlined dense v-model="buffer_input_work.work_name" label="ชื่องาน"></v-text-field>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="5">
        <v-subheader>บริษัท/หน่วยงาน</v-subheader>
      </v-col>
      <v-col cols="4">
        <v-select outlined dense :items="headers_company" v-model="buffer_input_work.work_company" label="บริษัท"></v-select>
      </v-col>
      <v-col cols="3">
        <v-select
          outlined
          dense
          :items="headers_department"
          v-model="buffer_input_work.work_department"
          label="หน่วยงาน"
        ></v-select>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="5">
        <v-subheader>ลักษณะการประเมิน</v-subheader>
      </v-col>
      <v-col cols="7">
        <v-select
          outlined
          dense
          :items="headers_eval_type"
          v-model="buffer_input_work.work_eval_type"
          label="ลักษณะการประเมิน"
        ></v-select>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="5">
        <v-subheader>ผู้จัดทำ</v-subheader>
      </v-col>
      <v-col cols="7">
        <v-text-field outlined dense v-model="buffer_input_work.work_author" label="ผู้จัดทำ"></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AddNewWorkWorkInfo",
  props: [],
  data() {
    return {
      buffer_input_work: {
        work_name: "",
        work_company: "",
        work_department: "",
        work_eval_type: "",
        work_author: ""
      },
      headers_company: ["บริษัท ก", "บริษัท ข", "บริษัท ค", "บริษัท ง"],
      headers_department: ["หน่วยงาน ก", "หน่วยงาน ข", "หน่วยงาน ค", "หน่วยงาน ง"],
      headers_eval_type: [
        "ประจำปี",
        "ก่อนเปลี่ยนแปลง",
        "ระหว่างเปลี่ยนแปลง",
        "หลังเปลี่ยนแปลง",
        "เกิดอุบัติการณ์/ข้อร้องเรียน"
      ]
    };
  },
  watch: {
    work: {
      handler(val) {
        this.$store.commit("updateWorkBuffer", val);
      },
      deep: true
    }
  },
  methods: {
    clearForm() {
      this.buffer_input_work.work_name = "";
      this.buffer_input_work.work_company = "";
      this.buffer_input_work.work_department = "";
      this.buffer_input_work.work_eval_type = "";
      this.buffer_input_work.work_author = "";
    }
  }
};
</script>

<style>
</style>