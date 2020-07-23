<template>
  <v-container>
    <v-row>
      <v-col cols="5">
        <v-select
          v-model="buffer_input_area.inner"
          :items="headers_area_inner"
          item-text="area_name"
          return-object
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
          v-model="buffer_input_area.outer"
          :items="headers_area_outer"
          item-text="area_name"
          return-object
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
  name: "AddNewWorkArea",
  props: [],
  data() {
    return {
      buffer_input_area: {
        inner: [],
        outer: []
      },
      headers_area_inner: [
        { area_id: 1, area_name: "พื้นที่ ก" },
        { area_id: 2, area_name: "พื้นที่ ข" },
        { area_id: 3, area_name: "พื้นที่ ค" }
      ],
      headers_area_outer: [
        { area_id: 4, area_name: "พื้นที่ ง" },
        { area_id: 5, area_name: "พื้นที่ จ" },
        { area_id: 6, area_name: "พื้นที่ ฉ" }
      ]
    };
  },
  watch: {
    "buffer_input_area.inner": {
      handler(val) {
        this.$store.commit("updateInnerAreaBuffer", val);
      },
      deep: true
    },
    "buffer_input_area.outer": {
      handler(val) {
        this.$store.commit("updateOuterAreaBuffer", val);
      },
      deep: true
    }
  },
  methods: {
    clearForm() {
      this.buffer_input_area.inner = [];
      this.buffer_input_area.outer = [];
    }
  }
};
</script>

<style>
</style>