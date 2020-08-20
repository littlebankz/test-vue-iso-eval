<template>
  <div class="pa-5">
    <v-btn text @click="$emit('previous-step')" v-if="currentStep > 1">ย้อนกลับ</v-btn>
    <v-btn color="primary" @click="$emit('next-step')" v-if="currentStep < maxStep">
      ต่อไป
      <v-icon right>mdi-arrow-right</v-icon>
    </v-btn>
    <v-btn color="success" @click="$emit('add-work')" v-if="currentStep == maxStep">
      <v-icon left>mdi-check</v-icon>เพิ่ม
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "StepControlButton",
  props: ["currentStep", "maxStep"],
  methods: {},
};
</script>

<style></style>
