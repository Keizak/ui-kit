export const getTitleCourseFromId = (
  id: number,
  courses: { title: string; id: number }[]
): string | null => {
  const currentCourse = courses.find((el) => el.id === id);

  return currentCourse ? currentCourse.title : null;
};
