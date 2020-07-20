<template>
  <v-card>
    <v-card-title>
      <v-col cols="5">
        <AddNewWorkButton v-on:add-work="handleAddNewWork" />
        <v-spacer></v-spacer>
      </v-col>
      <v-col cols="3">
        <v-select
          v-model="searchBy"
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
          v-model="searchTxt"
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
      :search="search"
      :items-per-page="10"
      class="elevation-1"
    >
      <template v-slot:item.workname="{ item }">
        <a @click="handleWorkNameClick(item.id)">{{ item.workname }}</a>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import moment from "moment";

import AddNewWorkButton from "./AddNewWorkButton";

export default {
  name: "WorksDataTable",
  components: {
    AddNewWorkButton
  },
  data() {
    return {
      search: "",
      searchBy: "",
      searchTxt: "",
      works: [
        {
          id: 1,
          workname: "งาน 1",
          company_department: "บริษัท กอไก่ หน่วยงาน ก",
          evalType: "ประจำปี",
          author: "ผู้จัดทำ ก",
          date: "16/07/2020"
        },
        {
          id: 2,
          workname: "งาน 2",
          company_department: "บริษัท ขอไข่ หน่วยงาน ข",
          evalType: "ประจำปี",
          author: "ผู้จัดทำ ข",
          date: "17/07/2020"
        },
        {
          id: 3,
          workname: "งาน 3",
          company_department: "บริษัท คอควาย หน่วยงาน ค",
          evalType: "ประจำปี",
          author: "ผู้จัดทำ ค",
          date: "18/07/2020"
        },
        {
          id: 4,
          workname: "งาน 4",
          company_department: "บริษัท งองู หน่วยงาน ง",
          evalType: "ประจำปี",
          author: "ผู้จัดทำ ง",
          date: "19/07/2020"
        },
        {
          id: 5,
          workname: "งาน 1",
          company_department: "บริษัท กอไก่ หน่วยงาน ก",
          evalType: "ประจำปี",
          author: "ผู้จัดทำ ก",
          date: "16/07/2020"
        },
        {
          id: 6,
          workname: "งาน 2",
          company_department: "บริษัท ขอไข่ หน่วยงาน ข",
          evalType: "ประจำปี",
          author: "ผู้จัดทำ ข",
          date: "17/07/2020"
        },
        {
          id: 7,
          workname: "งาน 3",
          company_department: "บริษัท คอควาย หน่วยงาน ค",
          evalType: "ประจำปี",
          author: "ผู้จัดทำ ค",
          date: "18/07/2020"
        },
        {
          id: 8,
          workname: "งาน 4",
          company_department: "บริษัท งองู หน่วยงาน ง",
          evalType: "ประจำปี",
          author: "ผู้จัดทำ ง",
          date: "19/07/2020"
        }
      ],
      nextWorkId: 9,
      keys: ["ชื่องาน", "บริษัท/หน่วยงาน", "ผู้จัดทำ"]
    };
  },
  computed: {
    headers() {
      return [
        {
          text: "ชื่องาน",
          align: "start",
          value: "workname",
          filter: value => {
            if (this.searchBy != "ชื่องาน" || this.searchTxt == null)
              return true;
            return value.toString().indexOf(this.searchTxt) !== -1;
          }
        },
        {
          text: "บริษัท/หน่วยงาน",
          value: "company_department",
          filter: value => {
            if (this.searchBy != "บริษัท/หน่วยงาน" || this.searchTxt == null)
              return true;
            return value.toString().indexOf(this.searchTxt) !== -1;
          }
        },
        {
          text: "ผู้จัดทำ",
          value: "author",
          filter: value => {
            if (this.searchBy != "ผู้จัดทำ" || this.searchTxt == null)
              return true;
            return value.toString().indexOf(this.searchTxt) !== -1;
          }
        },
        {
          text: "วันที่จัดทำ",
          value: "date"
        }
      ];
    }
  },
  methods: {
    handleSearchClick() {
      alert("Search Click");
    },
    handleAddNewWork() {
      let work = {
        id: this.nextWorkId,
        workname: this.$store.state.addNewWork.workInfo.workname,
        company_department:
          this.$store.state.addNewWork.workInfo.company +
          " " +
          this.$store.state.addNewWork.workInfo.department,
        evalType: this.$store.state.addNewWork.workInfo.evalType,
        author: this.$store.state.addNewWork.workInfo.author,
        date: moment().format("DD/MM/YYYY"),
        area: {
          inner: this.$store.state.addNewWork.area.inner,
          outerAreaList: this.$store.state.addNewWork.area.outer
        }
      };
      this.nextWorkId++;
      this.works.push(work);
    },
    handleWorkNameClick(id) {
      alert(id);
    }
  }
};
</script>

<style>
</style>