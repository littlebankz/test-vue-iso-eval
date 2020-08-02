<template>
  <v-container>
    <v-row>
      <v-col cols="5">
        <v-select
          v-model="buffer_input_area_inner"
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
          v-model="buffer_input_area_outer"
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
import { mapActions } from "vuex";
export default {
  name: "AddNewWorkArea",
  props: [],
  data() {
    return {
      buffer_input_area_inner: [],
      buffer_input_area_outer: [],
      headers_area_inner: [
        { area_id: 1, area_name: "พื้นที่ ก", area_type: "inner" },
        { area_id: 2, area_name: "พื้นที่ ข", area_type: "inner" },
        { area_id: 3, area_name: "พื้นที่ ค", area_type: "inner" },
      ],
      headers_area_outer: [
        { area_id: 4, area_name: "พื้นที่ ง", area_type: "outer" },
        { area_id: 5, area_name: "พื้นที่ จ", area_type: "outer" },
        { area_id: 6, area_name: "พื้นที่ ฉ", area_type: "outer" },
      ],
    };
  },
  watch: {
    buffer_input_area: {
      handler(val) {
        this.updateAreaBuffer(val);
      },
      deep: true,
    },
  },
  computed: {
    buffer_input_area: function () {
      return this.buffer_input_area_inner.concat(this.buffer_input_area_outer);
    },
  },
  methods: {
    ...mapActions(["updateAreaBuffer"]),
    clearForm() {
      this.buffer_input_area_inner = [];
      this.buffer_input_area_outer = [];
    },
  },
};
</script>

<style></style>
