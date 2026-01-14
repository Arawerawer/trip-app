export const formatDate = (d: Date | null) => {
  const dateToFormat = d || new Date(); // 如果沒有選擇日期，使用當天日期

  const year = dateToFormat.getFullYear(); // 取得年份 (如: 2026)
  const month = String(dateToFormat.getMonth() + 1).padStart(2, "0"); // 取得月份 (0-11需+1)，並補零至兩位數
  const day = String(dateToFormat.getDate()).padStart(2, "0"); // 取得日期，並補零至兩位數
  const weekdays = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  const weekday = weekdays[dateToFormat.getDay()]; // d.getDay() 回傳 0-6，對應陣列索引

  return `${year}年${month}月${day}日 (${weekday})`;
};
