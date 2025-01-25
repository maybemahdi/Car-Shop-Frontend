import { useInView } from "react-intersection-observer";
import { IService, services } from "../../../data/services";
import { motion } from "framer-motion";

const ServiceSection = () => {
  // Hook to detect if the section is in view
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger animation once when the section is in view
    threshold: 0.5, // Trigger when 50% of the section is visible
  });
  return (
    <div ref={ref} className="py-12 md:py-16">
      <div className="w-[90%] md:w-[88%] mx-auto">
        <div className="flex flex-col-reverse md:flex-row gap-12 items-center">
          <div className="basis-1/2 relative">
            <motion.img
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: inView ? 1 : 0, // Fade in when in view
                y: inView ? 0 : 20, // Slide up when in view
              }}
              transition={{ duration: 0.5, delay: 0.1 }}
              src="https://images.unsplash.com/photo-1613824585538-5315d1cef429?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Luxury Car Service"
              className="w-full h-[600px] object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black opacity-40 rounded-lg" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: inView ? 1 : 0, // Fade in when in view
              y: inView ? 0 : 20, // Slide up when in view
            }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8 basis-1/2"
          >
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                Our Services
              </h2>
              <p className="text-gray-800 text-lg">
                Experience exceptional automotive care with our comprehensive
                range of premium services.
              </p>
            </div>

            <ul className="space-y-6">
              {services?.map((service: IService, idx) => (
                <li key={idx} className="flex items-start space-x-4 pl-1">
                  <div className="flex-shrink-0 w-2 h-2 bg-primary mt-3 rounded-full"></div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
