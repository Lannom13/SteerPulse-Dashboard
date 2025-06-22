export function generateCategoryInsights(categoryData) {
  const { category, planned, actual } = categoryData;
  const percent = (actual / planned) * 100;
  const difference = actual - planned;

  const insights = [];

  if (percent > 110) {
    insights.push(`🚨 You're 10%+ over budget on "${category}". Consider cutting back.`);
  } else if (percent > 100) {
    insights.push(`⚠️ Slightly over budget on "${category}". A few small changes could help.`);
  } else if (percent < 60) {
    insights.push(`👍 You're spending way under budget on "${category}". Could you shift some to other priorities?`);
  } else {
    insights.push(`✅ "${category}" is on track — great job managing this area.`);
  }

  if (difference > 0) {
    insights.push(`You've overspent by $${difference.toFixed(2)} this month.`);
  } else if (difference < 0) {
    insights.push(`You’ve saved $${Math.abs(difference).toFixed(2)} in "${category}".`);
  }

  return insights;
}
