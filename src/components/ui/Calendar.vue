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
  --dp-primary-color: black;
  --dp-hover-color: #f0f0f0;
  .dp__today {
    /* 設定背景顏色（實心） */
    background-color: var(--dp-primary-color);

    /* 設定文字顏色（通常改為白色比較清晰） */
    color: #ffffff;

    /* 如果你想讓它看起來更像一個實心圓，可以調整圓角 */
    border-radius: 50%;
  }
}
</style>
