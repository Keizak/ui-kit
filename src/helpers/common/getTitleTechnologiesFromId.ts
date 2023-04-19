export const getTitleTechnologyFromId = (
  id: number,
  technologies: { title: string; id: number }[]
): string | null => {
  const currentCourse = technologies.find((el) => el.id === id);

  return currentCourse ? currentCourse.title : null;
};
