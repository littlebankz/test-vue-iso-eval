<template>
  <v-dialog v-model="main_dialog" :max-width="700" persistent no-click-animation>
    <template v-slot:activator="{ on: main_dialog }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn v-on="{ ...tooltip, ...main_dialog }" color="primary">
            <v-icon left>mdi-plus</v-icon>เพิ่ม
          </v-btn>
        </template>
        <span>เพิ่มบริษัทใหม่</span>
      </v-tooltip>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">เพิ่มบริษัท</span>
        <v-spacer></v-spacer>
        <v-dialog v-model="prompt_dialog" :max-width="700">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-on="on" v-bind="attrs" icon>
              <v-icon>mdi-window-close</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>ละทิ้งข้อมูล</v-card-title>
            <v-card-text>
              คุณต้องการละทิ้งข้อมูลการเพิ่มบริษัทนี้ใช่หรือไม่
              <div class="pa-5">
                <v-btn text @click="promt_dialog_cancel_click">ยกเลิก</v-btn>
                <v-btn color="error" @click="promt_dialog_delete_click">
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
            <v-stepper-step :complete="currentStep > 1" :step="1" editable>ชื่อบริษัท และหน่วยงาน</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="currentStep > 2" :step="2" editable>พื้นที่</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="currentStep > 3" :step="3" editable>กิจกรรม</v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1" class="pa-3">
              <AddNewCompanyForm1 />
              <StepControlButton
                :currentStep="1"
                :maxStep="steps"
                v-on:previous-step="previousStep"
                v-on:next-step="nextStep"
              />
            </v-stepper-content>
            <v-stepper-content step="2" class="pa-3">
              <StepControlButton
                :currentStep="2"
                :maxStep="steps"
                v-on:previous-step="previousStep"
                v-on:next-step="nextStep"
              />
            </v-stepper-content>
            <v-stepper-content step="3" class="pa-3">
              <StepControlButton
                :currentStep="3"
                :maxStep="steps"
                v-on:previous-step="previousStep"
                v-on:next-step="nextStep"
              />
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import StepControlButton from "../StepControlButton";
import AddNewCompanyForm1 from "./AddNewCompanyForm1";
export default {
  components: {
    AddNewCompanyForm1,
    StepControlButton,
  },
  data() {
    return {
      main_dialog: false,
      prompt_dialog: false,
      currentStep: 1,
      steps: 3,
    };
  },
  methods: {
    nextStep() {
      this.currentStep++;
    },
    previousStep() {
      this.currentStep--;
    },
    promt_dialog_cancel_click() {
      this.prompt_dialog = false;
    },
    promt_dialog_delete_click() {
      this.prompt_dialog = false;
      this.main_dialog = false;
    },
  },
};
</script>

<style>
</style>