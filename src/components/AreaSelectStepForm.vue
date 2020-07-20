<template>
  <v-container>
    <v-row>
      <v-col cols="5">
        <v-select
          v-model="area.inner"
          :items="innerArea"
          label="เลือกพื้นที่ภายใน"
          multiple
          chips
          outlined
        ></v-select>
      </v-col>
      <v-col cols="2">
        <v-divider vertical></v-divider>
      </v-col>
      <v-col cols="5">
        <v-select
          v-model="area.outer"
          :items="outerArea"
          label="เลือกพื้นที่ภายนอก"
          multiple
          chips
          outlined
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AreaSelectStepForm",
  props: [],
  data() {
    return {
      area: {
        inner: [],
        outer: []
      },
      // Select items
      innerArea: ["พื้นที่ ก", "พื้นที่ ข", "พื้นที่ ค"],
      outerArea: ["พื้นที่ ง", "พื้นที่ จ", "พื้นที่ ฉ"]
    };
  },
  watch: {
    area: {
      handler(val) {
        this.$store.commit("updateArea", val);
      },
      deep: true
    }
  },
  methods: {
    clearForm() {
      this.area.inner = [];
      this.area.outer = [];
    }
  }
};
</script>

<style>
</style>