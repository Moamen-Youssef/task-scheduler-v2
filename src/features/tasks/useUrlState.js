import { useSearchParams } from 'react-router-dom';
import { formatDateShort } from '../../utils/helpers';

export function useUrlState() {
  const [searchParams, setSearchParams] = useSearchParams();

  //url keys
  const taskUrlKeys = Array.from(searchParams.keys());

  //got all selected filters in key value object => group them in one array (array of filters)
  const filtersArr = taskUrlKeys.map(
    (key) =>
      key !== 'sortBy' && {
        [key]: searchParams.get(key),
      }
  );

  //check if the filter already selected
  const isParamExisted = ({ paramKey, paramVal }) =>
    filtersArr.some(
      (op) =>
        Object.keys(op)[0] === paramKey && paramVal === op[Object.keys(op)[0]]
    );

  const deleteParam = (paramKey) => searchParams.delete(paramKey);
  const getParam = (paramKey) => searchParams.get(paramKey);
  const setParam = ({ paramKey, paramVal }) =>
    searchParams.set(paramKey, paramVal);
  const setUrlParams = () => setSearchParams(searchParams);

  const isAllFiltersApplied = (comparedObj) =>
    filtersArr.every((filter) => {
      const filterKey = Object.keys(filter)[0];
      const filterValue = filter[filterKey];

      return filterKey !== 'dueDate'
        ? comparedObj[filterKey] === filterValue
        : formatDateShort(comparedObj[filterKey]) ===
            formatDateShort(filterValue);
    });



  const resetFilters = () => taskUrlKeys.forEach((key) => deleteParam(key));

  return {
    taskUrlKeys,
    filtersArr,
    resetFilters,
    isAllFiltersApplied,
    isParamExisted,
    deleteParam,
    setParam,
    setUrlParams,
    getParam,
  };
}
