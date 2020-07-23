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
      <template v-slot:item.work_name="{ item }">
        <a @click="handleWorkNameClick(item.work_id)">{{ item.work_name }}</a>
      </template>
    </v-data-table>

    <v-dialog v-model="temp_dialog" max-width="800px">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" color="primary">
          <v-icon left>mdi-magnify</v-icon>Buffer
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">งาน</span>
          <v-spacer></v-spacer>
          <v-btn @click="temp_dialog = false" icon>
            <v-icon>mdi-window-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <div v-if="this.buffer.length != 0">
            {{this.buffer.work.work_id}}
            {{this.buffer.work.work_name}}
            {{this.buffer.work.work_company}}
            {{this.buffer.work.work_department}}
            {{this.buffer.work.work_author}}
            {{this.buffer.work.area_inner_id_list}}
            {{this.buffer.work.area_outer_id_list}}
            {{this.buffer.area.inner}}
            {{this.buffer.area.outer}}
            {{this.buffer.area.area_inner_activity_id_list}}
            {{this.buffer.area.area_outer_activity_id_list}}
            {{this.buffer.inner_activity}}
            {{this.buffer.outer_activity}}
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
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
      buffer: "",
      temp_dialog: false,
      works: [
        {
          work_id: 1,
          work_name: "งาน 1",
          work_company_department: "บริษัท กอไก่ หน่วยงาน ก",
          work_eval_type: "ประจำปี",
          work_author: "ผู้จัดทำ ก",
          date: "16/07/2020"
        },
        {
          work_id: 2,
          work_name: "งาน 2",
          work_company_department: "บริษัท ขอไข่ หน่วยงาน ข",
          work_eval_type: "ประจำปี",
          work_author: "ผู้จัดทำ ข",
          date: "17/07/2020"
        },
        {
          work_id: 3,
          work_name: "งาน 3",
          work_company_department: "บริษัท คอควาย หน่วยงาน ค",
          work_eval_type: "ประจำปี",
          work_author: "ผู้จัดทำ ค",
          date: "18/07/2020"
        },
        {
          work_id: 4,
          work_name: "งาน 4",
          work_company_department: "บริษัท งองู หน่วยงาน ง",
          work_eval_type: "ประจำปี",
          work_author: "ผู้จัดทำ ง",
          date: "19/07/2020"
        },
        {
          work_id: 5,
          work_name: "งาน 1",
          work_company_department: "บริษัท กอไก่ หน่วยงาน ก",
          work_eval_type: "ประจำปี",
          work_author: "ผู้จัดทำ ก",
          date: "16/07/2020"
        },
        {
          work_id: 6,
          work_name: "งาน 2",
          work_company_department: "บริษัท ขอไข่ หน่วยงาน ข",
          work_eval_type: "ประจำปี",
          work_author: "ผู้จัดทำ ข",
          date: "17/07/2020"
        },
        {
          work_id: 7,
          work_name: "งาน 3",
          work_company_department: "บริษัท คอควาย หน่วยงาน ค",
          work_eval_type: "ประจำปี",
          work_author: "ผู้จัดทำ ค",
          date: "18/07/2020"
        },
        {
          work_id: 8,
          work_name: "งาน 4",
          work_company_department: "บริษัท งองู หน่วยงาน ง",
          work_eval_type: "ประจำปี",
          work_author: "ผู้จัดทำ ง",
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
          value: "work_name",
          filter: value => {
            if (this.searchBy != "ชื่องาน" || this.searchTxt == null)
              return true;
            return value.toString().indexOf(this.searchTxt) !== -1;
          }
        },
        {
          text: "บริษัท/หน่วยงาน",
          value: "work_company_department",
          filter: value => {
            if (this.searchBy != "บริษัท/หน่วยงาน" || this.searchTxt == null)
              return true;
            return value.toString().indexOf(this.searchTxt) !== -1;
          }
        },
        {
          text: "ผู้จัดทำ",
          value: "work_author",
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
        work_id: this.nextWorkId,
        work_name: this.$store.state.buffer.work.work_name,
        work_company_department:
          this.$store.state.buffer.work.work_company +
          " " +
          this.$store.state.buffer.work.work_department,
        work_eval_type: this.$store.state.buffer.work.work_eval_type,
        work_author: this.$store.state.buffer.work.work_author,
        date: moment().format("DD/MM/YYYY")
      };
      console.log(this.$store.state.buffer);
      this.buffer = {...this.$store.state.buffer}
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