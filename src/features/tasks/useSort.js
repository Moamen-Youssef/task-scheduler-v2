export function useSort() {
  const isSortingApplied = (urlKeys) => urlKeys.some((key) => key === 'sortBy');

  const applyAscendingSort = (arrToSort) =>
    arrToSort.slice().sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  const applyDescendingSort = (arrToSort) =>
    arrToSort.slice().sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
  
  return { isSortingApplied, applyAscendingSort, applyDescendingSort };
}
