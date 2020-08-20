<template>
  <v-card>
    <v-card-title>
      <v-container>
        <v-row>
          <v-col cols="6">
            <AddNewCompanyDialog />
            <v-spacer></v-spacer>
          </v-col>
          <v-col cols="3">
            <v-select
              v-model="selected_company_id"
              dense
              solo
              single-line
              hide-details
              :items="getCompanyList"
              item-text="company_name"
              item-value="company_id"
              label="เลือกบริษัท"
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-select
              :disabled="lock_department_select"
              v-model="selected_department_id"
              dense
              solo
              single-line
              hide-details
              :items="departmentIdName"
              item-text="department_name"
              item-value="department_id"
              label="เลือกหน่วยงาน"
            ></v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-card-title>

    <v-data-table
      v-if="selected_company_id !== '' && selected_department_id !== ''"
      :headers="headers_area_table"
      :items="getAreaList_dup(selected_company_id, selected_department_id)"
      :items-per-page="10"
      class="elevation-1"
    ></v-data-table>
  </v-card>
</template>

<script>
import AddNewCompanyDialog from "./AddNewCompanyDialog";
import { mapGetters } from "vuex";
export default {
  components: {
    AddNewCompanyDialog,
  },
  data() {
    return {
      selected_company_id: "",
      selected_department_id: "",
      selected_area_id: "",

      headers_area_table: [
        {
          text: "ชื่อพื้นที่",
          align: "start",
          sortable: false,
          value: "area_name",
        },
        { text: "ชนิดพื้นที่", value: "area_type" },
      ],
    };
  },
  computed: {
    ...mapGetters(["getCompanyList", "getDepartmentList", "getAreaList_dup"]),
    lock_department_select() {
      return this.selected_company_id === "";
    },
    departmentIdName() {
      if (this.selected_company_id !== "") {
        return this.getDepartmentList(this.selected_company_id);
      } else {
        return [];
      }
    },
  },
};
</script>

<style>
</style>