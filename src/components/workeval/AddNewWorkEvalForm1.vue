<template>
  <div>
    <v-card-title>{{ title }}</v-card-title>
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-select
            v-model="selected_area_id"
            dense
            outlined
            single-line
            hide-details
            :items="headers_area_list"
            item-text="name"
            item-value="id"
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
              item-text="name"
              item-value="id"
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
      <template v-slot:item.data-table-select="{ item }" v-if="readOnly != 'true'">
        <v-btn icon @click="handleDeleteClick(item.risk_id)" color="error">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
      </template>
      <template v-slot:no-data>No data available</template>
      <template v-slot:no-results>No matching records found</template>
      <template v-slot:item.risk_environment="{ item }">
        <v-dialog width="700">
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on"> <v-icon left>mdi-magnify</v-icon>ดู </v-btn>
          </template>
          <EnvironmentFormShow :item="item" />
        </v-dialog>
      </template>
      <template v-slot:item.risk_security="{ item }">
        <v-dialog width="700">
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on"> <v-icon left>mdi-magnify</v-icon>ดู </v-btn>
          </template>
          <SecurityFormShow :item="item" />
        </v-dialog>
      </template>
      <template v-slot:body.append v-if="readOnly != 'true'">
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
            <v-dialog v-model="dialog_environment" width="700">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="white--black" v-bind="attrs" v-on="on">
                  <v-icon left>mdi-cogs</v-icon>สิ่งแวดล้อม
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  สิ่งแวดล้อม
                  <v-spacer></v-spacer>
                  <v-btn icon @click="dialog_environment = false">
                    <v-icon>mdi-window-close</v-icon>
                  </v-btn>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row dense class="pb-0" align="center" justify="start">
                      <v-col class="text-left">ด้านสิ่งแวดล้อม</v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="4">
                        <v-checkbox
                          v-model="buffer_input_risk.risk_environment.resource"
                          hide-details
                          dense
                          class="shrink mt-0 mx-2"
                          label="การใช้ทรัพยากร (R)"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="buffer_input_risk.risk_environment.pollution"
                          hide-details
                          dense
                          class="shrink mt-0 mx-2"
                          label="การเกิดมลพิษ (P)"
                        ></v-checkbox>
                      </v-col>
                      <v-col cols="4">
                        <v-select
                          v-model="buffer_input_risk.risk_environment.aspect"
                          :items="[]"
                          label="ลักษณะปัญหา (A)"
                          dense
                          solo
                          hide-details
                        ></v-select>
                      </v-col>
                      <v-col cols="4">
                        <v-select
                          v-model="buffer_input_risk.risk_environment.impact"
                          :items="[]"
                          label="ผลกระทบ (I)"
                          dense
                          solo
                          hide-details
                        ></v-select>
                      </v-col>
                    </v-row>
                    <v-row dense class="pb-0" align="center" justify="start">
                      <v-col class="text-left">สภาวะการเกิดความเสี่ยง</v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-checkbox
                          v-model="buffer_input_risk.risk_environment.status.normal"
                          hide-details
                          dense
                          class="shrink mt-0 mx-2"
                          label="สภาวะปกติ (N)"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="buffer_input_risk.risk_environment.status.abnormal"
                          hide-details
                          dense
                          class="shrink mt-0 mx-2"
                          label="ผิดปกติ (A)"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="buffer_input_risk.risk_environment.status.emergency"
                          hide-details
                          dense
                          class="shrink mt-0 mx-2"
                          label="ฉุกเฉิน (E)"
                        ></v-checkbox>
                      </v-col>
                    </v-row>
                    <v-row dense class="pb-0" align="center" justify="start">
                      <v-col class="text-left">กฎหมาย</v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-checkbox
                          v-model="buffer_input_risk.risk_environment.status.law"
                          hide-details
                          dense
                          class="shrink mt-0 mx-2"
                          label="มีกฎหมาย (L)"
                        ></v-checkbox>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-dialog>
          </td>
          <td>
            <v-dialog v-model="dialog_security" width="700">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="white--black" v-bind="attrs" v-on="on">
                  <v-icon left>mdi-cogs</v-icon>ความปลอดภัย
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  ความปลอดภัย
                  <v-spacer></v-spacer>
                  <v-btn icon @click="dialog_security = false">
                    <v-icon>mdi-window-close</v-icon>
                  </v-btn>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row dense class="pb-0" align="center" justify="start">
                      <v-col class="text-left">ด้านความปลอดภัย</v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="4">
                        <v-checkbox
                          v-model="buffer_input_risk.risk_security.safety"
                          hide-details
                          dense
                          class="shrink mt-0 mx-2"
                          label="ความปลอดภัย (S)"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="buffer_input_risk.risk_security.health"
                          hide-details
                          dense
                          class="shrink mt-0 mx-2"
                          label="อาชีวอนามัย (H)"
                        ></v-checkbox>
                      </v-col>
                      <v-col cols="4">
                        <v-select
                          v-model="buffer_input_risk.risk_security.risk"
                          :items="[]"
                          label="ความเสี่ยง (R)"
                          dense
                          solo
                          hide-details
                        ></v-select>
                      </v-col>
                      <v-col cols="4">
                        <v-select
                          v-model="buffer_input_risk.risk_security.hazard"
                          :items="[]"
                          label="ลักษณะอันตราย (H)"
                          dense
                          solo
                          hide-details
                        ></v-select>
                      </v-col>
                    </v-row>
                    <v-row dense class="pb-0" align="center" justify="start">
                      <v-col class="text-left">สภาวะการเกิดความเสี่ยง</v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-checkbox
                          v-model="buffer_input_risk.risk_security.status.normal"
                          hide-details
                          dense
                          class="shrink mt-0 mx-2"
                          label="สภาวะปกติ (N)"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="buffer_input_risk.risk_security.status.abnormal"
                          hide-details
                          dense
                          class="shrink mt-0 mx-2"
                          label="ผิดปกติ (A)"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="buffer_input_risk.risk_security.status.emergency"
                          hide-details
                          dense
                          class="shrink mt-0 mx-2"
                          label="ฉุกเฉิน (E)"
                        ></v-checkbox>
                      </v-col>
                    </v-row>
                    <v-row dense class="pb-0" align="center" justify="start">
                      <v-col class="text-left">กฎหมาย</v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-checkbox
                          v-model="buffer_input_risk.risk_security.status.law"
                          hide-details
                          dense
                          class="shrink mt-0 mx-2"
                          label="มีกฎหมาย (L)"
                        ></v-checkbox>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-dialog>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import EnvironmentFormShow from "./EnvironmentFormShow";
import SecurityFormShow from "./SecurityFormShow";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "AddNewWorkEvalForm1",
  components: {
    EnvironmentFormShow,
    SecurityFormShow,
  },
  props: ["title", "areaScope", "activitySlot", "formScope", "readOnly"],
  created() {
    this.next_risk_id = 1;
  },
  data() {
    return {
      dialog_environment: false,
      dialog_security: false,
      selected_area_id: "",
      selected_activity_id: "",
      buffer_risk: [],
      buffer_input_risk: {
        risk_name: "",
        risk_source: "",
        risk_environment: {
          resource: false,
          pollution: false,
          aspect: "",
          impact: "",
          status: {
            normal: false,
            abnormal: false,
            emergency: false,
            law: false,
          },
        },
        risk_security: {
          safety: false,
          health: false,
          risk: "",
          hazard: "",
          status: {
            normal: false,
            abnormal: false,
            emergency: false,
            law: false,
          },
        },
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
          text: "ความปลอดภัย",
          value: "risk_security",
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
      headers_add_risk_source: ["ที่มา 1", "ที่มา 2", "ที่มา 3", "ที่มา 4", "ที่มา 5", "ที่มา 6"],
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
    ...mapGetters(["riskInAreaAndActivity", "riskInArea", "getAreaList", "getActivityList"]),
    headers_area_list() {
      return this.getAreaList(this.$route.params.id);
    },
    headers_activity_list() {
      return this.getActivityList(this.$route.params.id);
    },
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
          alert("Please specify the activity that you want to add this new risk to.");
        } else {
          // Push user input into render view
          this.buffer_risk.push({ ...this.buffer_input_risk });

          // Reset the selection boxes
          this.buffer_input_risk = {
            area_id: this.selected_area_id,
            risk_name: "",
            risk_source: "",
            risk_environment: {
              resource: false,
              pollution: false,
              aspect: "",
              impact: "",
              status: {
                normal: false,
                abnormal: false,
                emergency: false,
                law: false,
              },
            },
            risk_security: {
              safety: false,
              health: false,
              risk: "",
              hazard: "",
              status: {
                normal: false,
                abnormal: false,
                emergency: false,
                law: false,
              },
            },
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
