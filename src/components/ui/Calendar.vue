<script setup lang="ts">
import { VueDatePicker } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { zhTW } from "date-fns/locale";

interface CalendarProps {
  value: Date | null; //現在選中的日期
  onChange?: (date: Date | null) => void; //當日期改變時的回調函數
  minDate?: Date; //最小限制日期（問號代表「不一定要傳」）
}

const props = withDefaults(defineProps<CalendarProps>(), {
  minDate: () => new Date(), //如果 props.minDate 是空的，就直接用後面的 new Date()
});
</script>

<template>
  <VueDatePicker
    :model-value="value"
    @update:model-value="onChange"
    :min-date="minDate"
    :locale="zhTW"
    inline
    auto-apply
    :hide-offset-dates="true"
    :hide-navigation="['time']"
  />
</template>

<style scoped>
:deep(.dp__theme_light) {
  --dp-font-size: 1rem;
  --dp-border-radius: 20px;
  --dp-primary-color: rgb(18, 174, 226);
  --dp-hover-color: #f0f0f0;
}

:deep(.dp__today) {
  border: none;
}

:deep(.dp__active_date) {
  border-radius: 50%;
}

:deep(.dp__cell_inner:hover) {
  /*  自訂 border */
  border-radius: 50%;
}
</style>
