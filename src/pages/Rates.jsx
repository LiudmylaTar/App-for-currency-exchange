import { Wave } from 'react-animated-text';
import { useDispatch, useSelector } from 'react-redux';
import Section from '../components/Section/Section';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import { selectBaseCurrency, selectFilteredRates } from '../redux/selector';
import RatesList from '../components/RatesList/RatesList';
import { useEffect } from 'react';
import { fetchRates } from '../redux/operation';
import Filter from '../components/Filter/Filter';

const Rates = () => {
  const dispatch = useDispatch();
  const baseCurrency = useSelector(selectBaseCurrency);
  const isError = useSelector(state => state.currency.isError);
  const filteredRates = useSelector(selectFilteredRates);

  useEffect(() => {
    if (baseCurrency) {
      dispatch(fetchRates(baseCurrency))
        .unwrap()
        .then(() => console.log('✅ fetchRates dispatched'))
        .catch(err => console.error('❌ fetchRates error:', err));
    }
  }, [baseCurrency, dispatch]);

  return (
    <Section>
      <Container>
        <Heading
          info
          bottom
          title={
            <Wave
              text={`$ $ $ Current exchange rate for 1 ${baseCurrency} $ $ $`}
              effect="fadeOut"
              effectChange={4.0}
            />
          }
        />
        <Filter />
        {filteredRates.length > 0 && <RatesList rates={filteredRates} />}
        {isError && (
          <Heading
            error
            title="Something went wrong...😐 We cannot show current rates!"
          />
        )}
      </Container>
    </Section>
  );
};

export default Rates;
