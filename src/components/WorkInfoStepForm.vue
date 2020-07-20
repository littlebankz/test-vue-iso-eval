<template>
  <v-container>
    <v-row>
      <v-col cols="5">
        <v-subheader>ขื่องาน</v-subheader>
      </v-col>
      <v-col cols="7">
        <v-text-field outlined dense v-model="workInfo.workname" label="ชื่องาน"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="5">
        <v-subheader>บริษัท/หน่วยงาน</v-subheader>
      </v-col>
      <v-col cols="4">
        <v-select outlined dense :items="companies" v-model="workInfo.company" label="บริษัท"></v-select>
      </v-col>
      <v-col cols="3">
        <v-select
          outlined
          dense
          :items="departments"
          v-model="workInfo.department"
          label="หน่วยงาน"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="5">
        <v-subheader>ลักษณะการประเมิน</v-subheader>
      </v-col>
      <v-col cols="7">
        <v-select
          outlined
          dense
          :items="evalTypes"
          v-model="workInfo.evalType"
          label="ลักษณะการประเมิน"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="5">
        <v-subheader>ผู้จัดทำ</v-subheader>
      </v-col>
      <v-col cols="7">
        <v-text-field outlined dense v-model="workInfo.author" label="ผู้จัดทำ"></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "WorkInfoStepForm",
  props: [],
  data() {
    return {
      workInfo: {
        workname: "",
        company: "",
        department: "",
        evalType: "",
        author: ""
      },
      // Select items
      companies: ["บริษัท ก", "บริษัท ข", "บริษัท ค", "บริษัท ง"],
      departments: ["หน่วยงาน ก", "หน่วยงาน ข", "หน่วยงาน ค", "หน่วยงาน ง"],
      evalTypes: [
        "ประจำปี",
        "ก่อนเปลี่ยนแปลง",
        "ระหว่างเปลี่ยนแปลง",
        "หลังเปลี่ยนแปลง",
        "เกิดอุบัติการณ์/ข้อร้องเรียน"
      ]
    };
  },
  watch: {
    workInfo: {
      handler(val) {
        this.$store.commit("updateWorkInfo", val);
      },
      deep: true
    }
  },
  methods: {
    clearForm() {
      this.workInfo.workname = "";
      this.workInfo.company = "";
      this.workInfo.department = "";
      this.workInfo.evalType = "";
      this.workInfo.author = "";
    }
  }
};
</script>

<style>
</style>