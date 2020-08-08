<template>
  <v-container>
    <v-row>
      <v-col cols="12" align="left">
        <ReportHeader currentPage="WorkReport" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" align="left">
        <v-card>
          <v-card-title>ข้อมูลทะเบียนงาน</v-card-title>
          <v-card-text>
            <v-container class="pb-0 mb-0">
              <v-row dense>
                <v-col cols="5">
                  <v-subheader>ขื่องาน</v-subheader>
                </v-col>
                <v-col cols="7">
                  <v-text-field
                    disabled
                    outlined
                    dense
                    v-model="this.work_info.work_name"
                    label="ชื่องาน"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="5">
                  <v-subheader>บริษัท/หน่วยงาน</v-subheader>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    disabled
                    outlined
                    dense
                    v-model="this.work_info.work_company"
                    label="บริษัท"
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    disabled
                    outlined
                    dense
                    v-model="this.work_info.work_department"
                    label="หน่วยงาน"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="5">
                  <v-subheader>ผู้จัดทำ</v-subheader>
                </v-col>
                <v-col cols="7">
                  <v-text-field
                    disabled
                    outlined
                    dense
                    v-model="this.work_info.work_author"
                    label="ผู้จัดทำ"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" align="left">
        <v-card>
          <v-card-title class="text-h6">กิจกรรม / พื้นที่ภายใน</v-card-title>
          <div :key="a_id" v-for="a_id in inner_area_id">
            <v-subheader>{{ area_name_from_area_id(a_id) }}</v-subheader>
            <v-data-table
              :headers="headers_activity"
              :items="activity_info_from_id(a_id)"
              :items-per-page="10"
              class="elevation-1"
              hide-default-footer
              dense
            ></v-data-table>
            <v-divider />
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" align="left">
        <v-card>
          <v-card-title>กิจกรรม / พื้นที่ภายนอก</v-card-title>
          <div :key="a_id" v-for="a_id in outer_area_id">
            <v-subheader>{{ area_name_from_area_id(a_id) }}</v-subheader>
            <v-data-table
              :headers="headers_activity"
              :items="activity_info_from_id(a_id)"
              :items-per-page="10"
              class="elevation-1"
              hide-default-footer
              dense
            ></v-data-table>
            <v-divider />
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ReportHeader from "../../components/ReportHeader";
import { mapGetters } from "vuex";
export default {
  name: "WorkReport",
  components: {
    ReportHeader,
  },
  data() {
    return {
      buffer: {},
      headers_activity: [
        {
          text: "กิจกรรม",
          align: "start",
          value: "activity_name",
        },
        {
          text: "ลักษณะงาน",
          value: "activity_type",
        },
        {
          text: "พื้นที่ปฎิบัติงาน",
          value: "activity_work_area",
        },
        {
          text: "ผู้ปฎิบัติ",
          value: "activity_performer",
        },
        {
          text: "ผู้ได้รับผลกระทบ",
          value: "activity_stakesholder",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["workInfoFromID"]),
    work_info: function() {
      return this.workInfoFromID(this.$route.params.id).work;
    },
    area_info: function() {
      return this.workInfoFromID(this.$route.params.id).area;
    },
    inner_area_id: function() {
      return this.area_info
        .map((area) => {
          if (area.area_type == "inner") return area.area_id;
        })
        .filter((id) => {
          return id != undefined;
        });
    },
    outer_area_id: function() {
      return this.area_info
        .map((area) => {
          if (area.area_type == "outer") return area.area_id;
        })
        .filter((id) => {
          return id != undefined;
        });
    },
    activity_info: function() {
      return this.workInfoFromID(this.$route.params.id).activity;
    },
  },
  methods: {
    area_name_from_area_id(id) {
      return this.area_info.filter((area) => {
        return area.area_id == id;
      })[0].area_name;
    },
    activity_info_from_id(id) {
      return this.activity_info.filter((activity) => {
        return activity.area_id == id;
      });
    },
  },
};
</script>

<style></style>
