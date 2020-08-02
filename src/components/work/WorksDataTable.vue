<template>
  <v-card>
    <v-card-title>
      <v-col cols="5">
        <AddNewWorkDialog v-on:add-work="handleAddNewWork" ref="addNewWorkDialog" />
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
      :items="works"
      :search="data_table_search"
      :items-per-page="10"
      class="elevation-1"
    >
      <template v-slot:item.work_name="{ item }">
        <a @click="handleWorkNameClick(item.work_id)">{{ item.work_name }}</a>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import AddNewWorkDialog from "./AddNewWorkDialog";
import { mapGetters, mapActions } from "vuex";
import router from "../../router";

export default {
  name: "WorksDataTable",
  components: {
    AddNewWorkDialog,
  },
  data() {
    return {
      data_table_search: "",
      search_box_search_by: "",
      search_box_search_text: "",
      temp_dialog: false,
      keys: ["ชื่องาน", "บริษัท", "หน่วยงาน", "ผู้จัดทำ"],
    };
  },
  created() {},
  computed: {
    ...mapGetters({
      works: "allWorkInfo",
    }),
    headers() {
      return [
        {
          text: "id",
          value: "work_id",
        },
        {
          text: "ชื่องาน",
          value: "work_name",
          filter: (value) => {
            if (
              this.search_box_search_by != "ชื่องาน" ||
              this.search_box_search_text == null
            )
              return true;
            return value.toString().indexOf(this.search_box_search_text) !== -1;
          },
        },
        {
          text: "บริษัท",
          value: "work_company",
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
          value: "work_department",
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
          value: "work_author",
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
          value: "work_date",
        },
      ];
    },
  },
  methods: {
    ...mapActions(["pushBufferToState", "clearBuffer"]),
    handleSearchClick() {
      alert("Search Click");
    },
    handleAddNewWork() {
      console.log("ADDED!");
      this.pushBufferToState();
      this.$refs.addNewWorkDialog.closeDialog_clear();
    },
    handleWorkNameClick(id) {
      router.push("/work/" + id);
    },
  },
};
</script>

<style></style>
