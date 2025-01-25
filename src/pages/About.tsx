import { ScrollRestoration } from "react-router-dom";
import AboutHero from "../components/Pages/About/AboutHero";
import ServiceSection from "../components/Pages/About/ServiceSection";


const About = () => {
    return (
      <div>
        <AboutHero />
        <ServiceSection />
        <ScrollRestoration />
      </div>
    );
};

export default About;