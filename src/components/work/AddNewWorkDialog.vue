<template>
  <v-dialog v-model="add_dialog" :max-width="maxWidth" persistent no-click-animation>
    <template v-slot:activator="{ on: add_dialog }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn v-on="{ ...tooltip, ...add_dialog }" color="primary">
            <v-icon left>mdi-plus</v-icon>เพิ่ม
          </v-btn>
        </template>
        <span>เพิ่มงานใหม่</span>
      </v-tooltip>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">เพิ่มทะเบียนงาน</span>
        <v-spacer></v-spacer>
        <v-dialog v-model="close_dialog" :max-width="700">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-on="on" v-bind="attrs" @click="clear = false" icon>
              <v-icon>mdi-window-close</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>ละทิ้งข้อมูล</v-card-title>
            <v-card-text>
              คุณต้องการละทิ้งข้อมูลการเพิ่มทะเบียนงานนี้ใช่หรือไม่
              <div class="pa-5">
                <v-btn text @click="closeDialog_cancel">ยกเลิก</v-btn>
                <v-btn color="error" @click="closeDialog_clear">
                  ละทิ้ง
                  <v-icon right>mdi-close</v-icon>
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-card-text>
        <v-stepper v-model="currentStep">
          <v-stepper-header>
            <v-stepper-step :complete="currentStep > 1" :step="1" editable>ข้อมูลทะเบียนงาน</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="currentStep > 2" :step="2" editable>พื้นที่</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="currentStep > 3" :step="3" editable>กิจกรรม / พื้นที่ภายใน</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="currentStep > 4" :step="4" editable>กิจกรรม / พื้นที่ภายนอก</v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1" class="pa-3">
              <AddNewWorkWorkInfo ref="workInfoStep" />
              <StepControlButton
                :step="1"
                v-on:previous-step="previousStep"
                v-on:next-step="nextStep"
                v-on:add-work="addDialog_save"
              />
            </v-stepper-content>
            <v-stepper-content step="2" class="pa-3">
              <AddNewWorkArea ref="areaStep" />
              <StepControlButton
                :step="2"
                v-on:previous-step="previousStep"
                v-on:next-step="nextStep"
                v-on:add-work="addDialog_save"
              />
            </v-stepper-content>
            <v-stepper-content step="3" class="pa-3">
              <AddNewWorkActivity ref="innerActivityStep" :areaScope="'inner'" />
              <StepControlButton
                :step="3"
                v-on:previous-step="previousStep"
                v-on:next-step="nextStep"
                v-on:add-work="addDialog_save"
              />
            </v-stepper-content>
            <v-stepper-content step="4" class="pa-3">
              <AddNewWorkActivity ref="outerActivityStep" :areaScope="'outer'" />
              <StepControlButton
                :step="4"
                v-on:previous-step="previousStep"
                v-on:next-step="nextStep"
                v-on:add-work="addDialog_save"
              />
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import StepControlButton from "./StepControlButton";
import AddNewWorkWorkInfo from "./AddNewWorkWorkInfo";
import AddNewWorkArea from "./AddNewWorkArea";
import AddNewWorkActivity from "./AddNewWorkActivity";

export default {
  name: "AddNewWorkButton",
  components: {
    StepControlButton,
    AddNewWorkWorkInfo,
    AddNewWorkArea,
    AddNewWorkActivity,
  },
  props: [],
  data() {
    return {
      currentStep: 1,
      steps: 4,
      add_dialog: false,
      close_dialog: false,
      clear: false,
    };
  },
  computed: {
    maxWidth() {
      if (this.currentStep == 1) return "800px";
      else if (this.currentStep == 2) return "800px";
      else if (this.currentStep == 3) return "1100px";
      else if (this.currentStep == 4) return "1100px";
      else return "1100px";
    },
  },
  methods: {
    nextStep() {
      this.currentStep++;
    },
    previousStep() {
      this.currentStep--;
    },
    addDialog_close() {
      this.add_dialog = false;
    },
    addDialog_save() {
      this.$emit("add-work");
    },
    closeDialog_clear() {
      this.addDialog_close();
      this.close_dialog = false;
      this.$refs.workInfoStep.clearForm();
      this.$refs.areaStep.clearForm();
      this.$refs.innerActivityStep.clearForm();
      this.$refs.outerActivityStep.clearForm();
      this.currentStep = 1;
    },
    closeDialog_cancel() {
      this.close_dialog = false;
    },
  },
};
</script>

<style></style>
