<script setup lang="ts">
import CalendarBlack from "@/assets/icons/calendar-black.svg";
import Calendar from "@/components/ui/Calendar.vue";
import { ref, computed } from "vue";
import { formatDate } from "@/utils/dateFormatter";
import { useTripInputStore } from "@/store/tripInput";

const tripInputStore = useTripInputStore();
const isCalendarOpen = ref(false);

const toggleCalendar = () => {
  isCalendarOpen.value = !isCalendarOpen.value;
};

const handleDateChange = (selectedDate: Date | null) => {
  tripInputStore.startDate = selectedDate;
  isCalendarOpen.value = false;
};

// 確保 startDate 永遠是 Date 物件
const dateValue = computed(() => {
  const date = tripInputStore.startDate;
  return typeof date === 'string' ? new Date(date) : date;
});

const displayText = computed(() => {
  return formatDate(dateValue.value);
});
</script>

<template>
  <div class="w-full relative">
    <button
      class="w-full p-2.5 bg-white rounded-lg outline-1 outline-offset-[-1.05px] outline-black/10 flex justify-center items-center gap-2.5 hover:bg-gray-200 cursor-pointer"
      @click="toggleCalendar"
    >
      <div class="w-4 h-4">
        <img :src="CalendarBlack" alt="calendar" />
      </div>

      <div
        class="text-center text-neutral-950 text-sm font-medium font-['Inter'] leading-5"
      >
        {{ displayText }}
      </div>
    </button>

    <div
      v-if="isCalendarOpen"
      class="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50"
    >
      <Calendar :value="dateValue" :onChange="handleDateChange" />
    </div>
  </div>
</template>

<style scoped></style>
