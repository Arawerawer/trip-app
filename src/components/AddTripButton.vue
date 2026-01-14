<script setup lang="ts">
import PlusBlack from "@/assets/icons/plus-black.svg";
</script>

<template>
  <button
    class="w-full py-2 bg-white rounded-lg outline-1 outline-offset-[-1.05px] outline-black/10 flex justify-center items-center gap-4 hover:bg-gray-100 cursor-pointer"
  >
    <div class="w-4 h-4">
      <img :src="PlusBlack" alt="add" />
    </div>

    <div
      class="text-center text-neutral-950 text-sm font-medium font-['Inter'] leading-5"
    >
      新增行程
    </div>
  </button>
</template>

<style scoped></style>
