<script setup lang="ts">
import SelectDateButton from "@/components/ui/SelectDateButton.vue";
import { useTripInputStore } from "@/store/tripInput";

const tripInputStore = useTripInputStore();
</script>

<template>
  <div class="w-full flex flex-col justify-start items-start gap-3">
    <div class="w-full flex justify-center items-center">
      <div
        class="text-center text-gray-700 text-sm font-medium font-['Inter'] leading-5"
      >
        選擇旅行開始日期
      </div>
    </div>

    <SelectDateButton v-model="tripInputStore.startDate" />
  </div>
</template>

<style scoped></style>
