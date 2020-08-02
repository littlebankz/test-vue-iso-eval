<template>
  <div>
    <v-select
      v-model="selected_area_id"
      dense
      outlined
      single-line
      hide-details
      :items="areaList(areaScope)"
      item-text="area_name"
      item-value="area_id"
      :label="areaScope == 'inner' ? 'เลือกพื้นที่ภายใน' : 'เลือกพื้นที่ภายนอก'"
    ></v-select>
    <v-data-table
      :headers="headers_activity"
      :items="activityInArea(this.selected_area_id)"
      :search="search"
      :items-per-page="10"
      show-select
      class="elevation-1"
    >
      <template v-slot:header.data-table-select></template>
      <template v-slot:item.data-table-select="{ item }">
        <v-btn icon @click="handleDeleteClick(item.activity_id)" color="error">
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
              v-model="buffer_input_activity.activity_name"
              :items="headers_add_activity_name"
              label="กิจกรรม"
              dense
              solo
              hide-details
            ></v-select>
          </td>
          <td>
            <v-select
              v-model="buffer_input_activity.activity_type"
              :items="headers_add_activity_types"
              label="ลักษณะงาน"
              dense
              solo
              hide-details
            ></v-select>
          </td>
          <td>
            <v-select
              v-model="buffer_input_activity.activity_work_area"
              :items="headers_add_activity_work_areas"
              label="พื้นที่ปฎิบัติงาน"
              dense
              solo
              hide-details
            ></v-select>
          </td>
          <td>
            <v-select
              v-model="buffer_input_activity.activity_performer"
              :items="headers_add_activity_performers"
              label="ผู้ปฎิบัติ"
              dense
              solo
              hide-details
            ></v-select>
          </td>
          <td>
            <v-select
              v-model="buffer_input_activity.activity_stakesholder"
              :items="headers_add_activity_stakesholders"
              label="ผู้ได้รับผลกระทบ"
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
  name: "AddNewWorkActivity",
  components: {},
  props: ["areaScope"],
  created() {
    // Trigger changes in next_activity_id
    this.next_activity_id = 1;
  },
  data() {
    return {
      selected_area_id: "",
      buffer_activity: [],
      buffer_input_activity: {
        activity_name: "",
        activity_type: "",
        activity_work_area: "",
        activity_performer: "",
        activity_stakesholder: "",
      },
      next_activity_id: 0,
      //
      search: "",
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
      headers_add_activity_name: [
        "กิจกรรม 1",
        "กิจกรรม 2",
        "กิจกรรม 3",
        "กิจกรรม 4",
        "กิจกรรม 5",
      ],
      headers_add_activity_types: ["Routine", "Non-routine"],
      headers_add_activity_work_areas: ["ทำภายในบริษัท", "ทำภายนอกบริษัท"],
      headers_add_activity_performers: [
        "พนักงาน",
        "ผู้รับเหมา",
        "ผู้จำหน่าย",
        "ลูกค้า",
        "อื่น ๆ",
      ],
      headers_add_activity_stakesholders: [
        "พนักงาน",
        "ผู้รับเหมา",
        "ผู้จำหน่าย",
        "ลูกค้า",
        "ชุมชน",
        "อื่น ๆ",
      ],
    };
  },
  watch: {
    "$store.state.works.buffer.area": {
      handler(val) {
        const areaIDList = val
          .map((area) => {
            if (area.area_type == this.areaScope) return area.area_id;
          })
          .filter((id) => {
            return id != undefined;
          });

        this.buffer_activity = this.buffer_activity.filter((activity) => {
          return areaIDList.includes(activity.area_id);
        });

        if (!areaIDList.includes(this.selected_area_id)) {
          this.selected_area_id = "";
        }
      },
      deep: true,
    },
    buffer_activity: {
      handler(val) {
        const payload = {
          buffer_input: val,
          area_scope: this.areaScope,
        };
        this.updateActivityBuffer(payload);
      },
    },
    selected_area_id: {
      handler(val) {
        this.buffer_input_activity.area_id = val;
      },
    },
    "$store.state.works.next_activity_id": {
      handler(val) {
        this.buffer_input_activity.activity_id = val;
      },
    },
  },
  computed: {
    ...mapGetters(["areaList", "activityInArea", "nextActivityID"]),
  },
  methods: {
    ...mapActions(["updateActivityBuffer", "increaseNextActivityID"]),
    // When user press + icon after selected the activity information
    handleAddClick() {
      // Did user select the area yet ?
      if (this.selected_area_id) {
        // Push user input into render view
        this.buffer_activity.push({ ...this.buffer_input_activity });

        // Reset the selection boxes
        this.buffer_input_activity = {
          activity_name: "",
          activity_type: "",
          activity_work_area: "",
          activity_performer: "",
          activity_stakesholder: "",
          area_id: this.selected_area_id,
        };

        // ID incremental
        this.increaseNextActivityID();

        // If user did not select the area
      } else {
        // Tell them to select the area first
        alert(
          "Please specify the area that you want to add this new activity to."
        );
      }
    },

    // When user press - icon in v-data-table
    handleDeleteClick(id) {
      // Remove selected id from the array
      this.buffer_activity = this.buffer_activity.filter(
        (activity) => activity.activity_id != id
      );
    },

    clearForm() {
      this.selected_area_id = "";
      this.buffer_activity = [];
      this.buffer_input_activity = {
        activity_name: "",
        activity_type: "",
        activity_work_area: "",
        activity_performer: "",
        activity_stakesholder: "",
      };
      this.next_activity_id = 1;
    },
  },
};
</script>

<style></style>
