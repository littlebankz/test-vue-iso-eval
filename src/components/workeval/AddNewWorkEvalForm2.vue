<template>
  <div>
    <v-card-title>{{ title }}</v-card-title>
    <!-- <v-container>
      <v-row>
        <v-col cols="6">
          <v-select
            v-model="selected_area_id"
            dense
            outlined
            single-line
            hide-details
            :items="headers_area_list"
            item-text="area_name"
            item-value="area_id"
            :label="areaScope == 'inner' ? 'เลือกพื้นที่ภายใน' : 'เลือกพื้นที่ภายนอก'"
          ></v-select>
        </v-col>
        <v-col cols="6">
          <div v-if="activitySlot === 'enable'">
            <v-select
              v-model="selected_activity_id"
              dense
              outlined
              single-line
              hide-details
              :items="headers_activity_list"
              item-text="activity_name"
              item-value="activity_id"
              label="กิจกรรม"
            ></v-select>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-data-table
      :headers="header_work_eval"
      :items="rendered_items"
      :search="search"
      :items-per-page="10"
      show-select
      class="elevation-1"
    >
      <template v-slot:header.data-table-select></template>
      <template v-slot:item.data-table-select="{ item }">
        <v-btn icon @click="handleDeleteClick(item.risk_id)" color="error">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
      </template>
      <template v-slot:no-data>No data available</template>

      <template v-slot:no-results>No matching records found</template>

      <template v-slot:body.append>
        <tr>
          <td>
            <v-btn icon @click="handleAddClick" color="primary">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </td>
          <td>
            <v-select
              v-model="buffer_input_risk.risk_name"
              :items="headers_add_risk_name"
              label="ประเด็นความเสี่ยง"
              dense
              solo
              hide-details
            ></v-select>
          </td>
          <td>
            <v-select
              v-model="buffer_input_risk.risk_source"
              :items="headers_add_risk_source"
              label="ที่มาความเสี่ยง"
              dense
              solo
              hide-details
            ></v-select>
          </td>
          <td>
            <v-select
              v-model="buffer_input_risk.risk_environment"
              :items="headers_add_risk_environment"
              label="สิ่งแวดล้อม"
              dense
              solo
              hide-details
            ></v-select>
          </td>
          <td>
            <v-select
              v-model="buffer_input_risk.risk_environment_status"
              :items="headers_add_risk_environment_status"
              label="สภาวะการเกิด"
              dense
              solo
              hide-details
            ></v-select>
          </td>
          <td>
            <v-select
              v-model="buffer_input_risk.risk_security"
              :items="headers_add_risk_security"
              label="ความปลอดภัย"
              dense
              solo
              hide-details
            ></v-select>
          </td>
          <td>
            <v-select
              v-model="buffer_input_risk.risk_security_status"
              :items="headers_add_risk_security_status"
              label="สภาวะการเกิด"
              dense
              solo
              hide-details
            ></v-select>
          </td>
        </tr>
      </template>
    </v-data-table>-->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "AddNewWorkEvalForm2",
  components: {},
  props: ["title", "areaScope", "activitySlot", "formScope"],
  created() {
    this.next_risk_id = 1;
  },
  data() {
    return {
      selected_area_id: "",
      selected_activity_id: "",
      buffer_risk: [],
      buffer_input_risk: {
        risk_name: "",
        risk_source: "",
        risk_environment: "",
        risk_environment_status: "",
        risk_security: "",
        risk_security_status: "",
      },
      next_risk_id: 0,

      search: "",
      header_work_eval: [
        {
          text: "ประเด็นความเสี่ยง",
          align: "start",
          value: "risk_name",
        },
        {
          text: "ที่มาความเสี่ยง",
          value: "risk_source",
        },
        {
          text: "สิ่งแวดล้อม",
          value: "risk_environment",
        },
        {
          text: "สภาวะการเกิด",
          value: "risk_environment_status",
        },
        {
          text: "ความปลอดภัย",
          value: "risk_security",
        },
        {
          text: "สภาวะการเกิด",
          value: "risk_security_status",
        },
      ],

      headers_add_risk_name: [
        "ประเด็น 1",
        "ประเด็น 2",
        "ประเด็น 3",
        "ประเด็น 4",
        "ประเด็น 5",
        "ประเด็น 6",
      ],
      headers_add_risk_source: [
        "ที่มา 1",
        "ที่มา 2",
        "ที่มา 3",
        "ที่มา 4",
        "ที่มา 5",
        "ที่มา 6",
      ],
      headers_add_risk_environment: [],
      headers_add_risk_environment_status: ["N", "A", "E", "L"],
      headers_add_risk_security: [],
      headers_add_risk_security_status: ["N", "A", "E", "L"],
    };
  },
  watch: {
    buffer_risk: {
      handler(val) {
        const payload = {
          buffer_input: val,
          form_scope: this.formScope,
        };

        this.updateRiskBuffer(payload);
      },
    },
    selected_area_id: {
      handler(val) {
        this.buffer_input_risk.area_id = val;
      },
    },
    selected_activity_id: {
      handler(val) {
        this.buffer_input_risk.activity_id = val;
      },
    },
    "$store.state.workeval.next_risk_id": {
      handler(val) {
        this.buffer_input_risk.risk_id = val;
      },
    },
  },
  computed: {
    ...mapGetters(["nextRiskID", "riskInAreaAndActivity", "riskInArea"]),
    ...mapGetters({
      headers_area_list: "getExampleAreaList",
    }),
    ...mapGetters({
      headers_activity_list: "getExampleActivityList",
    }),
    rendered_items() {
      if (this.activitySlot === "enable") {
        return this.riskInAreaAndActivity(
          this.formScope,
          this.selected_area_id,
          this.selected_activity_id
        );
      } else {
        return this.riskInArea(this.formScope, this.selected_area_id);
      }
    },
  },
  methods: {
    ...mapActions(["updateRiskBuffer", "increaseNextRiskID"]),
    // When user press + icon after selected the activity information
    handleAddClick() {
      // Did user select the area yet ?
      if (this.selected_area_id) {
        if (this.activitySlot == "enable" && !this.selected_activity_id) {
          // Tell them to select the area first
          alert(
            "Please specify the activity that you want to add this new risk to."
          );
        } else {
          // Push user input into render view
          this.buffer_risk.push({ ...this.buffer_input_risk });

          // Reset the selection boxes
          this.buffer_input_risk = {
            area_id: this.selected_area_id,
            risk_name: "",
            risk_source: "",
            risk_environment: "",
            risk_environment_status: "",
            risk_security: "",
            risk_security_status: "",
          };

          if (this.activitySlot === "enable") {
            this.buffer_input_risk.activity_id = this.selected_activity_id;
          }
          // ID incremental
          this.increaseNextRiskID();
        }

        // If user did not select the area
      } else {
        // Tell them to select the area first
        alert("Please specify the area that you want to add this new risk to.");
      }
    },

    // When user press - icon in v-data-table
    handleDeleteClick(id) {
      // Remove selected id from the array
      this.buffer_risk = this.buffer_risk.filter((risk) => risk.risk_id != id);
    },

    clearForm() {},
  },
};
</script>

<style></style>
