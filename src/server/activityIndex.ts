import rawData from "../data/activities.json";

export function getAllActivities() {
  return (rawData.categories ?? []).flatMap(category =>
    (category.activities ?? []).map(activity => ({
      id: activity.id,
      name: activity.name,
      categoryId: category.id,
    }))
  );
}