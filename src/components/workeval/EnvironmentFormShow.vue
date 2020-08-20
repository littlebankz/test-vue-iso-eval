<template>
  <v-card>
    <v-card-title>สิ่งแวดล้อม</v-card-title>
    <v-card-text>
      <v-container>
        <v-row dense class="pb-0" align="center" justify="start">
          <v-col class="text-left">ด้านสิ่งแวดล้อม</v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-checkbox
              :input-value="item.risk_environment.resource"
              hide-details
              dense
              disabled
              class="shrink mt-0 mx-2"
              label="การใช้ทรัพยากร (R)"
            ></v-checkbox>
            <v-checkbox
              :input-value="item.risk_environment.pollution"
              hide-details
              dense
              disabled
              class="shrink mt-0 mx-2"
              label="การเกิดมลพิษ (P)"
            ></v-checkbox>
          </v-col>
          <v-col cols="4">ลักษณะปัญหา : {{item.risk_environment.aspect}}</v-col>
          <v-col cols="4">ผลกระทบ : {{item.risk_environment.impact}}</v-col>
        </v-row>
        <v-row dense class="pb-0" align="center" justify="start">
          <v-col class="text-left">สภาวะการเกิดความเสี่ยง</v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-checkbox
              :input-value="item.risk_environment.status.normal"
              hide-details
              dense
              disabled
              class="shrink mt-0 mx-2"
              label="สภาวะปกติ (N)"
            ></v-checkbox>
            <v-checkbox
              :input-value="item.risk_environment.status.abnormal"
              hide-details
              dense
              disabled
              class="shrink mt-0 mx-2"
              label="ผิดปกติ (A)"
            ></v-checkbox>
            <v-checkbox
              :input-value="item.risk_environment.status.emergency"
              hide-details
              dense
              disabled
              class="shrink mt-0 mx-2"
              label="ฉุกเฉิน (E)"
            ></v-checkbox>
          </v-col>
        </v-row>
        <v-row dense class="pb-0" align="center" justify="start">
          <v-col class="text-left">กฎหมาย</v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-checkbox
              :input-value="item.risk_environment.status.law"
              hide-details
              dense
              disabled
              class="shrink mt-0 mx-2"
              label="มีกฎหมาย (L)"
            ></v-checkbox>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["item"],
};
</script>

<style>
</style>