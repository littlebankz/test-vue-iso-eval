<template>
  <v-container>
    <div v-if="n == 1">
      <v-row>
        <v-col cols="5">
          <v-subheader>ขื่องาน</v-subheader>
        </v-col>
        <v-col cols="7">
          <v-text-field outlined dense v-model="newWork.workname" label="ชื่องาน"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5">
          <v-subheader>บริษัท/หน่วยงาน</v-subheader>
        </v-col>
        <v-col cols="4">
          <v-select outlined dense :items="companies" v-model="newWork.company" label="บริษัท"></v-select>
        </v-col>
        <v-col cols="3">
          <v-select
            outlined
            dense
            :items="departments"
            v-model="newWork.department"
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
            v-model="newWork.evalType"
            label="ลักษณะการประเมิน"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5">
          <v-subheader>ผู้จัดทำ</v-subheader>
        </v-col>
        <v-col cols="7">
          <v-text-field outlined dense v-model="newWork.author" label="ผู้จัดทำ"></v-text-field>
        </v-col>
      </v-row>
    </div>

    <div v-if="n == 2">
      <v-row>
        <v-col cols="5">
          <v-subheader>พื้นที่ภายใน</v-subheader>
          <v-select
            v-model="newWork.innerAreaList"
            :items="innerArea"
            label="เลือกพื้นที่ภายใน"
            multiple
            chips
          ></v-select>
        </v-col>
        <v-col cols="2">
          <v-divider vertical></v-divider>
        </v-col>
        <v-col cols="5">
          <v-subheader>พื้นที่ภายนอก</v-subheader>
          <v-select
            v-model="newWork.outerAreaList"
            :items="outerArea"
            label="เลือกพื้นที่ภายนอก"
            multiple
            chips
          ></v-select>
        </v-col>
      </v-row>
    </div>
    <div v-if="n == 3"></div>
    <div v-if="n == 4"></div>

    <v-btn text @click="$emit('previous-step', n)" v-if="n > 1">ย้อนกลับ</v-btn>

    <v-btn color="primary" @click="$emit('next-step', n)" v-if="n < 4">
      ต่อไป
      <v-icon right>mdi-arrow-right</v-icon>
    </v-btn>

    <v-btn color="success" @click="$emit('add-work')" v-if="n == 4">
      <v-icon left>mdi-check</v-icon>เพิ่ม
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: "AddNewWorkForms",
  data() {
    return {
      newWork: {
        workname: "",
        company: "",
        department: "",
        evalType: "",
        author: "",

        innerAreaList: [],
        outerAreaList: []
      },
      companies: ["บริษัท ก", "บริษัท ข", "บริษัท ค", "บริษัท ง"],
      departments: ["หน่วยงาน ก", "หน่วยงาน ข", "หน่วยงาน ค", "หน่วยงาน ง"],
      evalTypes: [
        "ประจำปี",
        "ก่อนเปลี่ยนแปลง",
        "ระหว่างเปลี่ยนแปลง",
        "หลังเปลี่ยนแปลง",
        "เกิดอุบัติการณ์/ข้อร้องเรียน"
      ],
      innerArea: ["พื้นที่ ก", "พื้นที่ ข", "พื้นที่ ค"],
      outerArea: ["พื้นที่ ง", "พื้นที่ จ", "พื้นที่ ฉ"]
    };
  },
  watch: {
    "newWork.workname": function(val) {
      if (val) {
        this.$store.commit("updateWorkname", val);
      }
    },
    "newWork.company": function(val) {
      if (val) {
        this.$store.commit("updateCompany", val);
      }
    },
    "newWork.department": function(val) {
      if (val) {
        this.$store.commit("updateDepartment", val);
      }
    },
    "newWork.evalType": function(val) {
      if (val) {
        this.$store.commit("updateEvalType", val);
      }
    },
    "newWork.author": function(val) {
      if (val) {
        this.$store.commit("updateAuthor", val);
      }
    },
    "newWork.innerAreaList": function(val) {
      if (val) {
        this.$store.commit("updateInnerAreaList", val);
      }
    },
    "newWork.outerAreaList": function(val) {
      if (val) {
        this.$store.commit("updateOuterAreaList", val);
      }
    }
  },
  props: ["n", "saveTrigger"]
};
</script>

<style>
</style>