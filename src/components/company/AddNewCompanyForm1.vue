<template>
  <div>
    <v-card-title>{{ title }}</v-card-title>
    <v-container>
      <v-row>
        <v-col cols="4">
          <v-subheader>ชื่อบริษัท</v-subheader>
        </v-col>
        <v-col cols="8">
          <v-text-field
            outlined
            dense
            v-model="buffer_input_company.company_name"
            label="ชื่อบริษัท"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <v-data-table
      :headers="headers_department"
      :items="buffer_input_company.department_list"
      show-select
      class="elecation-1"
    >
      <template v-slot:header.data-table-select></template>
      <template v-slot:item.data-table-select="{ item }">
        <v-btn icon @click="handleDeleteClick(item.department_name)" color="error">
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
            <v-text-field
              outlined
              dense
              v-model="buffer_input_company.department_name"
              label="ชื่อหน่วยงาน"
            ></v-text-field>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  components: {},
  props: [],
  created() {},
  data() {
    return {
      buffer_input_company: {
        company_name: "",
        department_name: "",
      },

      department_list: [
        {
          department_id: 1,
          department_name: "",
        },
      ],

      headers_department: [
        {
          text: "หน่วยงาน",
          value: "department_name",
        },
      ],
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleAddClick() {},
    handleDeleteClick(id) {
      alert(id);
    },
  },
};
</script>

<style></style>
