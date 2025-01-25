import { ScrollRestoration } from 'react-router-dom';
import Banner from '../components/Pages/Home/Banner';
import { FeaturedProducts } from '../components/Pages/Home/FeaturedProducts';
import { TestimonialsSection } from '../components/Pages/Home/TestimonialsSection';

const Home = () => {
  return (
    <div>
      <Banner />
      <FeaturedProducts />
      <TestimonialsSection />
      <ScrollRestoration />
    </div>
  );
};

export default Home;
