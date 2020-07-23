<template>
  <div>
    <v-select
      v-model="selected_area"
      dense
      outlined
      single-line
      hide-details
      :items="area_list"
      item-text="area_name"
      item-value="area_id"
      :label="(areaScope == 'inner') ? 'เลือกพื้นที่ภายใน' : 'เลือกพื้นที่ภายนอก'"
    ></v-select>
    <v-data-table
      :headers="headers_activity"
      :items="activity"
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
      selected_area: "",
      activity: [],
      buffer_activity: [],
      buffer_input_activity: {
        activity_id: "",
        activity_name: "",
        activity_type: "",
        activity_work_area: "",
        activity_performer: "",
        activity_stakesholder: ""
      },
      next_activity_id: 0,
      //
      search: "",
      headers_activity: [
        {
          text: "กิจกรรม",
          align: "start",
          value: "activity_name"
        },
        {
          text: "ลักษณะงาน",
          value: "activity_type"
        },
        {
          text: "พื้นที่ปฎิบัติงาน",
          value: "activity_work_area"
        },
        {
          text: "ผู้ปฎิบัติ",
          value: "activity_performer"
        },
        {
          text: "ผู้ได้รับผลกระทบ",
          value: "activity_stakesholder"
        }
      ],
      headers_add_activity_name: [
        "กิจกรรม 1",
        "กิจกรรม 2",
        "กิจกรรม 3",
        "กิจกรรม 4",
        "กิจกรรม 5"
      ],
      headers_add_activity_types: ["Routine", "Non-routine"],
      headers_add_activity_work_areas: ["ทำภายในบริษัท", "ทำภายนอกบริษัท"],
      headers_add_activity_performers: [
        "พนักงาน",
        "ผู้รับเหมา",
        "ผู้จำหน่าย",
        "ลูกค้า",
        "อื่น ๆ"
      ],
      headers_add_activity_stakesholders: [
        "พนักงาน",
        "ผู้รับเหมา",
        "ผู้จำหน่าย",
        "ลูกค้า",
        "ชุมชน",
        "อื่น ๆ"
      ]
    };
  },
  watch: {
    activity: {
      handler(val) {
        // Loop over buffer_activity to find activity array of current area_id
        this.buffer_activity.forEach(bufferActivity => {
          // If found, update activity in to buffer
          if (bufferActivity.area_id == this.selected_area) {
            bufferActivity.activity = Array.from(val);
          }
        });
      },
      deep: true
    },
    area_list: {
      // Listen for changes in area_list (triggered by area selection step (2/4))
      handler(val, oldVal) {
        // Find difference between old area_list and new area_list
        let onlyInNew = val.filter(new_list => {
          return !oldVal.some(old_list => {
            return old_list.area_id == new_list.area_id;
          });
        });
        let onlyInOld = oldVal.filter(old_list => {
          return !val.some(new_list => {
            return new_list.area_id == old_list.area_id;
          });
        });

        // There is an extra area_id in a new one -> Need buffer in buffer_activity
        if (onlyInNew.length != 0 && onlyInOld.length == 0) {
          // Create a new activity blank buffer for differed area_id
          let obj = {
            area_id: onlyInNew[0].area_id,
            activity: []
          };

          // Push blank buffer into buffer_activity
          this.buffer_activity.push(obj);

          // There is an unwanted area_id in an old one -> get rid of it in buffer_activity
        } else if (onlyInOld.length != 0 && onlyInNew.length == 0) {
          // Filtered the buffer_activity to get rid of unwanted area_id
          this.buffer_activity = this.buffer_activity.filter(
            x => x.area_id != onlyInOld[0].area_id
          );

          // Check if current selected area is in new area_list
          let isSelectedInAreaList = val.some(val => {
            return val.area_id == this.selected_area;
          });
          // console.log(isSelectedInAreaList);

          // If current selected area is NOT in new area_list -> cancel selection and clear rendered table
          if (!isSelectedInAreaList) {
            this.selected_area = "";
            this.activity = [];
          }
        }
      }
    },
    selected_area: {
      // Listen for changes in area selection box
      // Then swap the rendering data in the v-data-table and stored the rendered one to buffer_activity
      handler(val, oldVal) {
        // Prepare a new activity array
        let new_activity = [];

        // Loop over buffer_activity to find activity array of old area_id and new area_id
        this.buffer_activity.forEach(bufferActivity => {
          // If it is an activity for old area_id, store the rendered activity into it
          if (bufferActivity.area_id == oldVal) {
            bufferActivity.activity = Array.from(this.activity);
          }

          // If it is a new area_id, render them in v-data-table
          if (bufferActivity.area_id == val) {
            new_activity = bufferActivity.activity;
            // console.log(new_activity);
          }
        });

        // Render in v-data-table
        this.activity = Array.from(new_activity);
      }
    },
    next_activity_id: {
      handler(val) {
        // Automatically assign value of activity_id in buffer_input
        this.buffer_input_activity.activity_id = val;
      }
    },
    buffer_activity: {
      handler(val) {
        if (this.areaScope == "inner") {
          this.$store.commit("updateInnerBufferActivity", val);
        } else if (this.areaScope == "outer") {
          this.$store.commit("updateOuterBufferActivity", val);
        }
      },
      deep: true
    }
  },
  computed: {
    area_list() {
      // Determine the area_list to be display according to areaScope prop from parent
      if (this.areaScope == "inner") {
        return this.$store.state.buffer.area.inner;
      } else {
        return this.$store.state.buffer.area.outer;
      }
    }
  },
  methods: {
    // When user press + icon after selected the activity information
    handleAddClick() {
      // Did user select the area yet ?
      if (this.selected_area) {
        // Push user input into render view
        this.activity.push({ ...this.buffer_input_activity });

        // Reset the selection boxes
        this.buffer_input_activity = {
          activity_id: "",
          activity_name: "",
          activity_type: "",
          activity_work_area: "",
          activity_performer: "",
          activity_stakesholder: ""
        };

        // ID incremental
        this.next_activity_id++;

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
      this.activity = this.activity.filter(
        activity => activity.activity_id != id
      );
    }
  }
};
</script>

<style>
</style>