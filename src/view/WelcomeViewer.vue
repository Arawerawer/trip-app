<script setup lang="ts">
import IconBottom from "@/components/IconBottom.vue";
import IconTop from "@/components/IconTop.vue";
import TripTitle from "@/components/TripTitle.vue";
import TripSubtitle from "@/components/TripSubtitle.vue";
import DateSelect from "@/components/DateSelect.vue";
import DateEntry from "@/components/DateEntry.vue";
import WelcomeText from "@/components/WelcomeText.vue";
</script>

<template>
  <div
    class="h-screen w-full bg-linear-to-br from-blue-500 via-blue-600 to-purple-600 flex justify-center items-center gap-2.5 px-3.5"
  >
    <div
      class="flex flex-col justify-between bg-white rounded-3xl shadow-2xl gap-6 p-8 md:w-116.5 md:h-141.5 lg:h-164.5 2xl:w-142 2xl:h-198"
    >
      <IconTop />
      <WelcomeText />
      <TripTitle />
      <TripSubtitle />
      <DateSelect />
      <DateEntry />
      <IconBottom />
    </div>
  </div>
</template>

<style scoped></style>
