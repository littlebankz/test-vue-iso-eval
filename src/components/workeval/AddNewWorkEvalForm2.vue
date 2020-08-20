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
      <template v-slot:body.append v-if="readOnly != 'true'">
        <tr>
          <td>
            <v-btn icon @click="handleAddClick" color="primary">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </td>
          <td>
            <v-select
              v-model="buffer_input_evaluate.risk_name"
              :items="headers_add_risk_name"
              label="ประเด็นความเสี่ยง"
              dense
              solo
              hide-details
            ></v-select>
          </td>
          <td>
            <v-select
              v-model="buffer_input_evaluate.p1"
              :items="header_score_1"
              label="P1"
              dense
              solo
              hide-details
            ></v-select>
          </td>
          <td>
            <v-select
              v-model="buffer_input_evaluate.p2"
              :items="header_score_1"
              label="P2"
              dense
              solo
              hide-details
            ></v-select>
          </td>
          <td>
            <v-select
              v-model="buffer_input_evaluate.p3"
              :items="header_score_1"
              label="P3"
              dense
              solo
              hide-details
            ></v-select>
          </td>
          <td>
            <v-select
              v-model="buffer_input_evaluate.p4"
              :items="header_score_1"
              label="P4"
              dense
              solo
              hide-details
            ></v-select>
          </td>
          <td>
            <v-select
              v-model="buffer_input_evaluate.p5"
              :items="header_score_1"
              label="P5"
              dense
              solo
              hide-details
            ></v-select>
          </td>
          <td>
            <v-select
              v-model="buffer_input_evaluate.r1"
              :items="header_score_2"
              label="R1"
              dense
              solo
              hide-details
            ></v-select>
          </td>
          <td>
            <v-select
              v-model="buffer_input_evaluate.r2"
              :items="header_score_1"
              label="R2"
              dense
              solo
              hide-details
            ></v-select>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "AddNewWorkEvalForm2",
  components: {},
  props: ["title", "areaScope", "activitySlot", "formScope", "readOnly"],
  created() {
    this.next_evaluate_id = 1;
  },
  data() {
    return {
      selected_area_id: "",
      selected_activity_id: "",
      buffer_evaluate: [],
      buffer_input_evaluate: {
        risk_name: "",
        p1: "",
        p2: "",
        p3: "",
        p4: "",
        p5: "",
        r1: "",
        r2: "",
      },
      next_evaluate_id: 0,

      search: "",
      header_work_eval: [
        {
          text: "ประเด็นความเสี่ยง",
          align: "start",
          value: "risk_name",
        },
        {
          text: "P1",
          value: "p1",
        },
        {
          text: "P2",
          value: "p2",
        },
        {
          text: "P3",
          value: "p3",
        },
        {
          text: "P4",
          value: "p4",
        },
        {
          text: "P5",
          value: "p5",
        },
        {
          text: "R1",
          value: "r1",
        },
        {
          text: "R2",
          value: "r2",
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
      header_score_1: [0, 1, 2],
      header_score_2: [1, 2, 4, 8],
    };
  },
  watch: {
    buffer_evaluate: {
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
        this.buffer_input_evaluate.area_id = val;
      },
    },
    selected_activity_id: {
      handler(val) {
        this.buffer_input_evaluate.activity_id = val;
      },
    },
    "$store.state.workeval.next_evaluate_id": {
      handler(val) {
        this.buffer_input_evaluate.eval_id = val;
      },
    },
  },
  computed: {
    ...mapGetters([
      "riskInAreaAndActivity",
      "riskInArea",
      "getAreaList",
      "getActivityList",
    ]),
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
    ...mapActions(["updateRiskBuffer", "increaseNextEvalID"]),
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
          this.buffer_evaluate.push({ ...this.buffer_input_evaluate });

          // Reset the selection boxes
          this.buffer_input_evaluate = {
            area_id: this.selected_area_id,
            risk_name: "",
            p1: "",
            p2: "",
            p3: "",
            p4: "",
            p5: "",
            r1: "",
            r2: "",
          };

          if (this.activitySlot === "enable") {
            this.buffer_input_evaluate.activity_id = this.selected_activity_id;
          }
          // ID incremental
          this.increaseNextEvalID();
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
      this.buffer_evaluate = this.buffer_evaluate.filter(
        (evaluate) => evaluate.eval_id != id
      );
    },

    clearForm() {},
  },
};
</script>

<style></style>
