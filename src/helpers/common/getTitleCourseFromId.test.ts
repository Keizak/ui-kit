import { getTitleCourseFromId } from './getTitleCourseFromId';

describe('getTitleCourseFromId_function', () => {
  test('test_courseIdExists', () => {
    const courses = [
      { title: 'Math', id: 1 },
      { title: 'Science', id: 2 },
    ];

    expect(getTitleCourseFromId(1, courses)).toBe('Math');
  });
  test('test_courseIdDoesNotExist', () => {
    const courses = [
      { title: 'Math', id: 1 },
      { title: 'Science', id: 2 },
    ];

    expect(getTitleCourseFromId(3, courses)).toBeNull();
  });
  test('test_emptyArray', () => {
    const courses = [] as any;

    expect(getTitleCourseFromId(1, courses)).toBeNull();
  });
  test('test_negativeCourseId', () => {
    const courses = [
      { title: 'Math', id: 1 },
      { title: 'Science', id: 2 },
    ];

    expect(getTitleCourseFromId(-1, courses)).toBeNull();
  });
  test('test_originalArrayNotModified', () => {
    const courses = [
      { title: 'Math', id: 1 },
      { title: 'Science', id: 2 },
    ];

    getTitleCourseFromId(1, courses);
    expect(courses).toEqual([
      { title: 'Math', id: 1 },
      { title: 'Science', id: 2 },
    ]);
  });
  test('test_zeroCourseId', () => {
    const courses = [
      { title: 'Math', id: 1 },
      { title: 'Science', id: 2 },
    ];

    expect(getTitleCourseFromId(0, courses)).toBeNull();
  });
});
