<template>
  <v-card>
    <v-card-title>
      <v-col cols="5">
        <AddNewWorkEvalDialog v-on:add-work="handleAddNewWorkEval" ref="addNewWorkEvalDialog" />
        <v-spacer></v-spacer>
      </v-col>
      <v-col cols="3">
        <v-select
          v-model="search_box_search_by"
          dense
          solo
          single-line
          hide-details
          :items="keys"
          label="ขอบเขตในการค้นหา"
        ></v-select>
      </v-col>
      <v-col cols="4">
        <v-text-field
          v-model="search_box_search_text"
          prepend-inner-icon="mdi-magnify"
          append-icon="mdi-dots-vertical"
          label="ค้นหา"
          dense
          solo
          single-line
          hide-details
          @click:append="handleSearchClick"
        ></v-text-field>
      </v-col>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="allWorkEvalInfo(this.$route.params.id)"
      :search="data_table_search"
      :items-per-page="10"
      class="elevation-1"
    >
      <template v-slot:item.work_eval_name="{ item }">
        <a @click="handleWorkEvalClick(item.work_eval_id)">{{ item.work_eval_name }}</a>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import AddNewWorkEvalDialog from "./AddNewWorkEvalDialog";
import router from "../../router";
import { mapGetters } from "vuex";

export default {
  name: "WorkEvalDataTable",
  components: {
    AddNewWorkEvalDialog,
  },
  data() {
    return {
      data_table_search: "",
      search_box_search_by: "",
      search_box_search_text: "",
      keys: ["ชื่อรายงาน", "บริษัท", "หน่วยงาน", "ผู้จัดทำ"],
    };
  },
  created() {},
  computed: {
    ...mapGetters(["allWorkEvalInfo"]),
    headers() {
      return [
        {
          text: "ชื่อรายงาน",
          value: "work_eval_name",
          filter: (value) => {
            if (
              this.search_box_search_by != "ชื่อรายงาน" ||
              this.search_box_search_text == null
            )
              return true;
            return value.toString().indexOf(this.search_box_search_text) !== -1;
          },
        },
        {
          text: "บริษัท",
          value: "work_eval_company",
          filter: (value) => {
            if (
              this.search_box_search_by != "บริษัท" ||
              this.search_box_search_text == null
            )
              return true;
            return value.toString().indexOf(this.search_box_search_text) !== -1;
          },
        },
        {
          text: "หน่วยงาน",
          value: "work_eval_department",
          filter: (value) => {
            if (
              this.search_box_search_by != "หน่วยงาน" ||
              this.search_box_search_text == null
            )
              return true;
            return value.toString().indexOf(this.search_box_search_text) !== -1;
          },
        },
        {
          text: "ผู้จัดทำ",
          value: "work_eval_author",
          filter: (value) => {
            if (
              this.search_box_search_by != "ผู้จัดทำ" ||
              this.search_box_search_text == null
            )
              return true;
            return value.toString().indexOf(this.search_box_search_text) !== -1;
          },
        },
        {
          text: "วันที่จัดทำ",
          value: "work_eval_date",
        },
      ];
    },
  },
  methods: {
    handleSearchClick() {
      alert("Search Click");
    },
    handleAddNewWorkEval() {},
    handleWorkEvalClick(eval_id) {
      router.push(router.currentRoute.fullPath + "/" + eval_id + "/");
    },
  },
};
</script>

<style></style>
