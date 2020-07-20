<template>
  <div>
    <v-btn text @click="$emit('previous-step')" v-if="step > 1">ย้อนกลับ</v-btn>
    <v-btn color="primary" @click="$emit('next-step')" v-if="step < 4">
      ต่อไป
      <v-icon right>mdi-arrow-right</v-icon>
    </v-btn>
    <v-btn color="success" @click="$emit('add-work')" v-if="step == 4">
      <v-icon left>mdi-check</v-icon>เพิ่ม
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "StepButton",
  props: ["step"]
};
</script>

<style>
</style>