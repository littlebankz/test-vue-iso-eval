<template>
  <v-dialog v-model="dialog" max-width="700px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" color="primary">
        <v-icon left>mdi-plus</v-icon>เพิ่ม
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">เพิ่มทะเบียนงาน</span>
        <v-spacer></v-spacer>
        <v-btn @click="close" icon>
          <v-icon>mdi-window-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-stepper v-model="e1">
          <v-stepper-header>
            <template v-for="n in steps">
              <v-stepper-step :key="`${n}-step`" :complete="e1 > n" :step="n" editable>Step {{ n }}</v-stepper-step>
              <v-divider v-if="n !== steps" :key="n"></v-divider>
            </template>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content v-for="n in steps" :key="`${n}-content`" :step="n">
              <AddNewWorkForms
                :n="n"
                v-on:next-step="nextStep"
                v-on:previous-step="previousStep"
                v-on:add-work="save"
              />
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import AddNewWorkForms from "./AddNewWorkForms";

export default {
  name: "AddNewWorkButton",
  components: {
    AddNewWorkForms
  },
  data() {
    return {
      e1: 1,
      steps: 4,
      dialog: false
    };
  },
  watch: {
    steps(val) {
      if (this.e1 > val) {
        this.e1 = val;
      }
    }
  },
  methods: {
    nextStep(n) {
      this.e1 = n + 1;
    },
    previousStep(n) {
      this.e1 = n - 1;
    },
    close() {
      this.dialog = false;
    },
    save() {
      this.$emit("add-work");
      this.close();
    }
  }
};
</script>

<style>
</style>