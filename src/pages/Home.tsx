import Banner from "../components/Home/Banner";
import { FeaturedProducts } from "../components/Home/FeaturedProducts";
import { TestimonialsSection } from "../components/Home/TestimonialsSection";


const Home = () => {
    return (
        <div>
            <Banner />
            <FeaturedProducts />
            <TestimonialsSection />
        </div>
    );
};

export default Home;