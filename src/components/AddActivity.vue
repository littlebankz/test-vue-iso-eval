<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn icon @click="$emit('add-activity', activityInfo)">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
      <v-col cols>
        <v-select v-model="activityInfo.name" :items="activities" outlined></v-select>
      </v-col>
      <v-col cols>
        <v-select v-model="activityInfo.activity_types" :items="activity_types" label outlined></v-select>
      </v-col>
      <v-col cols>
        <v-select v-model="activityInfo.work_area" :items="work_areas" label outlined></v-select>
      </v-col>
      <v-col cols>
        <v-select v-model="activityInfo.performer" :items="performers" label outlined></v-select>
      </v-col>
      <v-col cols>
        <v-select v-model="activityInfo.stakesholder" :items="stakesholders" label outlined></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AddActivity",
  data() {
    return {
      activityInfo: {
        name: "",
        type: "",
        work_area: "",
        performer: "",
        stakesholder: ""
      },
      activities: [
        "กิจกกรรม 1",
        "กิจกกรรม 2",
        "กิจกกรรม 3",
        "กิจกกรรม 4",
        "กิจกกรรม 5"
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
  }
};
</script>

<style>
</style>