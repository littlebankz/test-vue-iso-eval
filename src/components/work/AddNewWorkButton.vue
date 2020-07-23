<template>
  <v-dialog v-model="dialog" :max-width="maxWidth">
    <template v-slot:activator="{ on: dialog }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn v-on="{ ...tooltip, ...dialog }" color="primary">
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
        <v-btn @click="close" icon>
          <v-icon>mdi-window-close</v-icon>
        </v-btn>
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
                v-on:add-work="save"
              />
            </v-stepper-content>
            <v-stepper-content step="2" class="pa-3">
              <AddNewWorkArea ref="areaStep" />
              <StepControlButton
                :step="2"
                v-on:previous-step="previousStep"
                v-on:next-step="nextStep"
                v-on:add-work="save"
              />
            </v-stepper-content>
            <v-stepper-content step="3" class="pa-3">
              <AddNewWorkActivity ref="innerActivityStep" :areaScope="'inner'" />
              <StepControlButton
                :step="3"
                v-on:previous-step="previousStep"
                v-on:next-step="nextStep"
                v-on:add-work="save"
              />
            </v-stepper-content>
            <v-stepper-content step="4" class="pa-3">
              <AddNewWorkActivity ref="outerActivityStep" :areaScope="'outer'" />
              <StepControlButton
                :step="4"
                v-on:previous-step="previousStep"
                v-on:next-step="nextStep"
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
    AddNewWorkActivity
  },
  data() {
    return {
      currentStep: 1,
      steps: 4,
      dialog: false
    };
  },
  computed: {
    maxWidth() {
      if (this.currentStep == 1) return '800px'
      else if (this.currentStep == 2) return '800px'
      else if (this.currentStep == 3) return '1100px'
      else if (this.currentStep == 4) return '1100px'
      else return '1100px'
    }
  },
  methods: {
    nextStep() {
      this.currentStep++;
    },
    previousStep() {
      this.currentStep--;
    },
    close() {
      this.dialog = false;
    },
    save() {
      this.$emit("add-work");
      this.close();
      this.currentStep = 1;
    }
  }
};
</script>

<style>
</style>