<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="activitiesList"
      :search="search"
      :items-per-page="10"
      show-select
      class="elevation-1"
    >
      <template v-slot:header.data-table-select>

      </template>
      <template v-slot:item.data-table-select="{ item }">
        <v-btn icon @click="handleDeleteClick(item.id)" color="error">
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
              v-model="activityInfo.activity_name"
              :items="activities"
              label="กิจกรรม"
              dense
              solo
              hide-details
            ></v-select>
          </td>
          <td>
            <v-select
              v-model="activityInfo.activity_type"
              :items="activity_types"
              label="ลักษณะงาน"
              dense
              solo
              hide-details
            ></v-select>
          </td>
          <td>
            <v-select
              v-model="activityInfo.work_area"
              :items="work_areas"
              label="พื้นที่ปฎิบัติงาน"
              dense
              solo
              hide-details
            ></v-select>
          </td>
          <td>
            <v-select
              v-model="activityInfo.performer"
              :items="performers"
              label="ผู้ปฎิบัติ"
              dense
              solo
              hide-details
            ></v-select>
          </td>
          <td>
            <v-select
              v-model="activityInfo.stakesholder"
              :items="stakesholders"
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
  name: "ActivityStepForm",
  components: {
  },
  props: [],
  data() {
    return {
      search: "",
      activitiesList: [
        {
          id: "1",
          activity_name: "กิจกรรม 1",
          activity_type: "Routine",
          work_area: "ทำภายในบริษัท",
          performer: "พนักงาน",
          stakesholder: "พนักงาน"
        }
      ],
      nextItemId: 2,
      headers: [
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
          value: "work_area"
        },
        {
          text: "ผู้ปฎิบัติ",
          value: "performer"
        },
        {
          text: "ผู้ได้รับผลกระทบ",
          value: "stakesholder"
        }
      ],
      //
      activityInfo: {
        activity_name: "",
        activity_type: "",
        work_area: "",
        performer: "",
        stakesholder: ""
      },
      activities: [
        "กิจกรรม 1",
        "กิจกรรม 2",
        "กิจกรรม 3",
        "กิจกรรม 4",
        "กิจกรรม 5"
      ],
      activity_types: ["Routine", "Non-routine"],
      work_areas: ["ทำภายในบริษัท", "ทำภายนอกบริษัท"],
      performers: ["พนักงาน", "ผู้รับเหมา", "ผู้จำหน่าย", "ลูกค้า", "อื่น ๆ"],
      stakesholders: [
        "พนักงาน",
        "ผู้รับเหมา",
        "ผู้จำหน่าย",
        "ลูกค้า",
        "ชุมชน",
        "อื่น ๆ"
      ]
    };
  },
  watch: {},
  methods: {
    handleAddClick() {
      let payload = {
        id: this.nextItemId,
        ...this.activityInfo
      }
      this.activitiesList.push(payload)
      this.nextItemId++
    },
    handleDeleteClick(id) {
      this.activitiesList = this.activitiesList.filter(activity => activity.id != id)
    },
    clearForm() {
      console.log("Actv. cleared");
    }
  }
};
</script>

<style>
</style>