import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { useTripInputStore } from "@/store/tripInput";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Welcome",
    component: () => import("@/view/WelcomeViewer.vue"),
  },
  {
    path: "/trip",
    name: "Trip",
    component: () => import("@/view/TripViewer.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守衛：根據是否有資料決定導向
router.beforeEach((to, _from, next) => {
  const tripInputStore = useTripInputStore();
  const hasLocalStorage = localStorage.getItem("tripInput") !== null;

  // 檢查是否為初始狀態（沒有實際行程資料）
  const isInitialState =
    tripInputStore.savedTrips.length === 0 &&
    tripInputStore.days.length === 1 &&
    tripInputStore.days[0] === 1;

  // 如果導航到首頁
  if (to.path === "/") {
    // 如果有實際資料，重定向到 /trip
    if (!isInitialState) {
      next("/trip");
      return;
    }
  }

  // 如果導航到 /trip
  if (to.path === "/trip") {
    // 如果沒有 localStorage（被手動刪除），重定向到首頁
    if (!hasLocalStorage) {
      next("/");
      return;
    }
  }

  next();
});

export default router;
