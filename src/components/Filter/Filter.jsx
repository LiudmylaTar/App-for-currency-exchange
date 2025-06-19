import { useDispatch, useSelector } from 'react-redux';
import styles from './Filter.module.css';
import { changeCurrencyFilter } from '../../redux/filtersSlice';
import { useDebouncedCallback } from 'use-debounce';
import { selectCurrencyFilter } from '../../redux/selector';

const Filter = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(selectCurrencyFilter);

  const debounced = useDebouncedCallback(
    value => dispatch(changeCurrencyFilter(value)),
    300,
  );

  const handleChange = e => {
    debounced(e.target.value);
  };
  return (
    <input
      placeholder="What currency are you looking for?🧐"
      className={styles.input}
      value={filterValue}
      onChange={handleChange}
    />
  );
};

export default Filter;
