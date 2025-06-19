import { RiExchangeDollarFill } from 'react-icons/ri';
import styles from './ExchangeForm.module.css';
import { useDispatch } from 'react-redux';
import { fetchExchangeCurrency } from '../../redux/operation';

const ExchangeForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = event => {
    event.preventDefault();
    const inputValue = event.target.elements.currency.value;
    const [amount, from, , to] = inputValue.split(' ');
    dispatch(fetchExchangeCurrency({ amount, from, to }));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        pattern="^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$"
        name="currency"
        title="Request format 15 USD in UAH"
        className={styles.input}
      />
    </form>
  );
};

export default ExchangeForm;
