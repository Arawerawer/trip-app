<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import { ref, watch } from "vue";
import "@/assets/styles/transition-to-trip.css";
import "@/assets/styles/transition-to-welcome.css";

const route = useRoute();
const transitionName = ref("");

// 頁面轉場映射表
const transitionMap: { [key: string]: string } = {
  "/ -> /trip": "page", // Welcome 到 Trip
  "/trip -> /": "back", // Trip 返回 Welcome
  // 未來新增頁面轉場在這裡加上即可
};

watch(
  () => route.path,
  (toPath, fromPath) => {
    const key = `${fromPath} -> ${toPath}`;
    transitionName.value = transitionMap[key] || "";
  }
);
</script>

<template>
  <div style="perspective: 1000px; overflow: hidden">
    <RouterView v-slot="{ Component: PageView }">
      <Transition :name="transitionName">
        <component :is="PageView" />
      </Transition>
    </RouterView>
  </div>
</template>
