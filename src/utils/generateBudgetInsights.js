export function generateBudgetInsights(data) {
  const insights = [];

  data.forEach(item => {
    const { category, planned, actual } = item;
    const diff = actual - planned;
    const percentUsed = (actual / planned) * 100;

    if (percentUsed > 110) {
      insights.push(`⚠️ You spent ${percentUsed.toFixed(0)}% of your "${category}" budget. Consider cutting back next month.`);
    } else if (percentUsed < 60) {
      insights.push(`🧠 You’ve used only ${percentUsed.toFixed(0)}% of your "${category}" budget. Could you reallocate some of it?`);
    } else if (diff > 0 && percentUsed <= 110) {
      insights.push(`✅ "${category}" came in slightly over but still within reasonable range.`);
    }
  });

  return insights.length > 0
    ? insights
    : ['🎯 Your budget execution is excellent! No major concerns this month.'];
}
