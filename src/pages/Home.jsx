import Section from '../components/Section/Section';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import ExchangeForm from '../components/ExchangeForm/ExchangeForm';
import { useSelector } from 'react-redux';
import { selectExechangeInfo, selectIsLoading } from '../redux/selector';
import ExchangeInfo from '../components/ExchangeInfo/ExchangeInfo';
import Loader from '../components/Loader/Loader';

const Home = () => {
  const isError = useSelector(state => state.currency.isError);
  const exchangeInfo = useSelector(selectExechangeInfo);
  const isLoading = useSelector(selectIsLoading);

  return (
    <Section>
      <Container>
        <ExchangeForm />
        {exchangeInfo && !isLoading && <ExchangeInfo {...exchangeInfo} />}
        {isLoading && <Loader />}

        {isError && (
          <Heading
            error
            title="Something went wrong...😐 Check the data validity and try again!"
          />
        )}
      </Container>
    </Section>
  );
};

export default Home;
