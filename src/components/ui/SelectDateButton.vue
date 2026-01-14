<script setup lang="ts">
import { ref, computed } from "vue";
import CalendarIcon from "@/assets/icons/calendar-black.svg";
import Calendar from "@/components/ui/Calendar.vue";
import { formatDate } from "@/utils/dateFormatter";

const props = defineProps<{
  modelValue: Date | string | null;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: Date | null];
}>();

const isCalendarOpen = ref(false);

const toggleCalendar = () => {
  isCalendarOpen.value = !isCalendarOpen.value;
};

const handleDateChange = (selectedDate: Date | null) => {
  emit("update:modelValue", selectedDate);
  isCalendarOpen.value = false;
};

const dateValue = computed(() => {
  const date = props.modelValue;
  return typeof date === "string" ? new Date(date) : date;
});

const displayText = computed(() => {
  return formatDate(dateValue.value);
});
</script>

<template>
  <div class="w-full relative">
    <button
      type="button"
      @click="toggleCalendar"
      class="w-full bg-white rounded-lg flex justify-center items-center outline-1 outline-offset-[-1.05px] outline-black/10 hover:bg-gray-200 gap-1 px-3 py-4 cursor-pointer"
    >
      <div class="w-5 h-5">
        <img :src="CalendarIcon" alt="calendar" />
      </div>

      <div class="w-48 h-6">
        <div
          class="text-gray-900 text-base font-medium font-['Inter'] leading-6"
        >
          {{ displayText }}
        </div>
      </div>
    </button>

    <div
      v-if="isCalendarOpen"
      class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50"
    >
      <Calendar :value="dateValue" :onChange="handleDateChange" />
    </div>
  </div>
</template>

<style scoped></style>
