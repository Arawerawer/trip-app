<script setup lang="ts">
import AddDayButton from "@/components/AddDayButton.vue";
import DateTile from "@/components/DateTile.vue";
import Navbar from "@/components/Navbar.vue";
import TripCard from "@/components/TripCard.vue";
import { useTripInputStore } from "@/store/tripInput";

const tripInputStore = useTripInputStore();
</script>

<template>
  <div class="w-full min-h-dvh bg-linear-to-b from-blue-50 to-white">
    <Navbar />
    <div
      class="max-w-4xl px-4 mx-auto pt-28 pb-4 flex flex-col items-center gap-4"
    >
      <DateTile />

      <AddDayButton
        v-if="tripInputStore.shouldShowDay1Button"
        :day-number="1"
        @click="tripInputStore.restoreDay1()"
      />

      <template v-for="dayId in tripInputStore.days" :key="dayId">
        <TripCard :day-id="dayId" />

        <!-- 如果有缺口就顯示按鈕 -->
        <AddDayButton
          v-if="tripInputStore.hasGapAfterDay(dayId)"
          :day-number="dayId + 1"
          @click="tripInputStore.fillGapAfterDay(dayId)"
        />
      </template>

      <!-- 底下的 AddDayButton 永遠顯示下一個連續的 Day -->
      <AddDayButton
        :day-number="tripInputStore.nextSequentialDay"
        @click="tripInputStore.addNextSequentialDay()"
      />
    </div>
  </div>
</template>

<style scoped></style>
