<template>
  <v-dialog v-model="add_dialog" :max-width="maxWidth" persistent no-click-animation>
    <template v-slot:activator="{ on: add_dialog }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn v-on="{ ...tooltip, ...add_dialog }" color="primary">
            <v-icon left>mdi-plus</v-icon>เพิ่ม
          </v-btn>
        </template>
        <span>เพิ่มทะเบียนความเสี่ยงใหม่</span>
      </v-tooltip>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">เพิ่มทะเบียนความเสี่ยง</span>
        <v-spacer></v-spacer>
        <v-btn @click="handleSaveButtonClick" icon>
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
        <v-dialog v-model="close_dialog" :max-width="700">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-on="on" v-bind="attrs" @click="clear = false" icon>
              <v-icon>mdi-window-close</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>ละทิ้งข้อมูล</v-card-title>
            <v-card-text>
              คุณต้องการละทิ้งข้อมูลการเพิ่มทะเบียนความเสี่ยงนี้ใช่หรือไม่
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
            <v-stepper-step :complete="currentStep > 1" :step="1" editable></v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="currentStep > 2" :step="2" editable></v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="currentStep > 3" :step="3" editable></v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="currentStep > 4" :step="4" editable></v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="currentStep > 5" :step="5" editable></v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="currentStep > 6" :step="6" editable></v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="currentStep > 7" :step="7" editable></v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="currentStep > 8" :step="8" editable></v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="currentStep > 9" :step="9" editable></v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="currentStep > 10" :step="10" editable></v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="currentStep > 11" :step="11" editable></v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="currentStep > 12" :step="12" editable></v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="currentStep > 13" :step="13" editable></v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1" class="pa-3">
              <AddNewWorkEvalWorkEvalInfo ref="workEvalInfoStep" />
              <StepControlButton
                :currentStep="1"
                :maxStep="steps"
                v-on:previous-step="previousStep"
                v-on:next-step="nextStep"
                v-on:add-work="addDialog_save"
              />
            </v-stepper-content>
            <v-stepper-content step="2" class="pa-3">
              <AddNewWorkEvalForm1
                ref
                title="ความเสี่ยงในพื้นที่ / พื้นที่ภายใน"
                areaScope="inner"
                formScope="area_inner"
              />
              <StepControlButton
                :currentStep="2"
                :maxStep="steps"
                v-on:previous-step="previousStep"
                v-on:next-step="nextStep"
                v-on:add-work="addDialog_save"
              />
            </v-stepper-content>
            <v-stepper-content step="3" class="pa-3">
              <AddNewWorkEvalForm1
                ref
                title="ความเสี่ยงในพื้นที่ / พื้นที่ภายนอก"
                areaScope="outer"
                formScope="area_outer"
              />
              <StepControlButton
                :currentStep="3"
                :maxStep="steps"
                v-on:previous-step="previousStep"
                v-on:next-step="nextStep"
                v-on:add-work="addDialog_save"
              />
            </v-stepper-content>
            <v-stepper-content step="4" class="pa-3">
              <AddNewWorkEvalForm1
                ref
                title="ความเสี่ยงในกิจกรรม / พื้นที่ภายใน"
                areaScope="inner"
                formScope="activity_inner"
                activitySlot="enable"
              />
              <StepControlButton
                :currentStep="4"
                :maxStep="steps"
                v-on:previous-step="previousStep"
                v-on:next-step="nextStep"
                v-on:add-work="addDialog_save"
              />
            </v-stepper-content>
            <v-stepper-content step="5" class="pa-3">
              <AddNewWorkEvalForm1
                ref
                title="ความเสี่ยงในกิจกรรม / พื้นที่ภายนอก"
                areaScope="outer"
                formScope="activity_outer"
                activitySlot="enable"
              />
              <StepControlButton
                :currentStep="5"
                :maxStep="steps"
                v-on:previous-step="previousStep"
                v-on:next-step="nextStep"
                v-on:add-work="addDialog_save"
              />
            </v-stepper-content>
            <v-stepper-content step="6" class="pa-3">
              <AddNewWorkEvalForm2
                ref
                title="ประเมินความเสี่ยงด้านสิ่งแวดล้อมในพื้นที่ / พื้นที่ภายใน"
                areaScope="inner"
                formScope="env_area_inner"
              />
              <StepControlButton
                :currentStep="6"
                :maxStep="steps"
                v-on:previous-step="previousStep"
                v-on:next-step="nextStep"
                v-on:add-work="addDialog_save"
              />
            </v-stepper-content>
            <v-stepper-content step="7" class="pa-3">
              <AddNewWorkEvalForm2
                ref
                title="ประเมินความเสี่ยงด้านความปลอดภัยในพื้นที่ / พื้นที่ภายใน"
                areaScope="inner"
                formScope="sec_area_inner"
              />
              <StepControlButton
                :currentStep="7"
                :maxStep="steps"
                v-on:previous-step="previousStep"
                v-on:next-step="nextStep"
                v-on:add-work="addDialog_save"
              />
            </v-stepper-content>
            <v-stepper-content step="8" class="pa-3">
              <AddNewWorkEvalForm2
                ref
                title="ประเมินความเสี่ยงด้านสิ่งแวดล้อมในพื้นที่ / พื้นที่ภายนอก"
                areaScope="outer"
                formScope="env_area_outer"
              />
              <StepControlButton
                :currentStep="8"
                :maxStep="steps"
                v-on:previous-step="previousStep"
                v-on:next-step="nextStep"
                v-on:add-work="addDialog_save"
              />
            </v-stepper-content>
            <v-stepper-content step="9" class="pa-3">
              <AddNewWorkEvalForm2
                ref
                title="ประเมินความเสี่ยงด้านความปลอดภัยในพื้นที่ / พื้นที่ภายนอก"
                areaScope="outer"
                formScope="sec_area_outer"
              />
              <StepControlButton
                :currentStep="9"
                :maxStep="steps"
                v-on:previous-step="previousStep"
                v-on:next-step="nextStep"
                v-on:add-work="addDialog_save"
              />
            </v-stepper-content>
            <v-stepper-content step="10" class="pa-3">
              <AddNewWorkEvalForm2
                ref
                title="ประเมินความเสี่ยงด้านสิ่งแวดล้อมในกิจกรรม / พื้นที่ภายใน"
                areaScope="inner"
                formScope="env_activity_inner"
                activitySlot="enable"
              />
              <StepControlButton
                :currentStep="10"
                :maxStep="steps"
                v-on:previous-step="previousStep"
                v-on:next-step="nextStep"
                v-on:add-work="addDialog_save"
              />
            </v-stepper-content>
            <v-stepper-content step="11" class="pa-3">
              <AddNewWorkEvalForm2
                ref
                title="ประเมินความเสี่ยงด้านความปลอดภัยในกิจกรรม / พื้นที่ภายใน"
                areaScope="inner"
                formScope="sec_activity_inner"
                activitySlot="enable"
              />
              <StepControlButton
                :currentStep="11"
                :maxStep="steps"
                v-on:previous-step="previousStep"
                v-on:next-step="nextStep"
                v-on:add-work="addDialog_save"
              />
            </v-stepper-content>
            <v-stepper-content step="12" class="pa-3">
              <AddNewWorkEvalForm2
                ref
                title="ประเมินความเสี่ยงด้านสิ่งแวดล้อมในกิจกรรม / พื้นที่ภายนอก"
                areaScope="outer"
                formScope="env_activity_outer"
                activitySlot="enable"
              />
              <StepControlButton
                :currentStep="12"
                :maxStep="steps"
                v-on:previous-step="previousStep"
                v-on:next-step="nextStep"
                v-on:add-work="addDialog_save"
              />
            </v-stepper-content>
            <v-stepper-content step="13" class="pa-3">
              <AddNewWorkEvalForm2
                ref
                title="ประเมินความเสี่ยงด้านความปลอดภัยในกิจกรรม / พื้นที่ภายนอก"
                areaScope="outer"
                formScope="sec_activity_outer"
                activitySlot="enable"
              />
              <StepControlButton
                :currentStep="13"
                :maxStep="steps"
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
import StepControlButton from "../StepControlButton";
import AddNewWorkEvalWorkEvalInfo from "./AddNewWorkEvalWorkEvalInfo";
import AddNewWorkEvalForm1 from "./AddNewWorkEvalForm1";
import AddNewWorkEvalForm2 from "./AddNewWorkEvalForm2";

export default {
  name: "AddNewWorkEvalDialog",
  components: {
    StepControlButton,
    AddNewWorkEvalWorkEvalInfo,
    AddNewWorkEvalForm1,
    AddNewWorkEvalForm2,
  },
  props: [],
  data() {
    return {
      currentStep: 1,
      steps: 13,
      add_dialog: false,
      close_dialog: false,
      clear: false,
    };
  },
  computed: {
    maxWidth() {
      if (this.currentStep == 1) return "1000px";
      else return "1200px";
      // else if (this.currentStep == 2) return "800px";
      // else if (this.currentStep == 3) return "1100px";
      // else if (this.currentStep == 4) return "1100px";
      // else return "1100px";
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
      // this.$refs.workInfoStep.clearForm();
      // this.$refs.areaStep.clearForm();
      // this.$refs.innerActivityStep.clearForm();
      // this.$refs.outerActivityStep.clearForm();
      this.currentStep = 1;
    },
    closeDialog_cancel() {
      this.close_dialog = false;
    },
    handleSaveButtonClick() {
      alert("Save Button Click");
    },
  },
};
</script>

<style></style>
