<script setup lang="ts">
import DateDisplayButton from "@/components/ui/DateDisplayButton.vue";
</script>

<template>
  <div
    class="w-full p-4 bg-white rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)] flex flex-col justify-center items-center gap-2"
  >
    <div
      class="text-center text-gray-600 text-sm font-medium font-['Inter'] leading-5"
    >
      旅行開始日期
    </div>

    <DateDisplayButton />
  </div>
</template>

<style scoped></style>
