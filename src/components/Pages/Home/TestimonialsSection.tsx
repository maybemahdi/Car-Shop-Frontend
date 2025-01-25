import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/swiper-bundle.css';

import { ITestimonial, testimonials } from '../../../data/testimonials';
import SectionHead from '../../shared/SectionHead/SectionHead';

const TestimonialCard = ({ testimonial }: { testimonial: ITestimonial }) => (
  <motion.div
    className="bg-white rounded-lg shadow-lg p-6"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center mb-4">
      <img
        src={testimonial.avatar || '/placeholder.svg'}
        alt={testimonial.name}
        className="rounded-full mr-4"
      />
      <div>
        <h3 className="font-semibold text-lg">{testimonial.name}</h3>
        <p className="text-gray-600">{testimonial.role}</p>
      </div>
    </div>
    <p className="text-gray-700 italic">&ldquo;{testimonial.comment}&rdquo;</p>
  </motion.div>
);

export const TestimonialsSection = () => {
  return (
    <section className="mb-8 md:mb-16">
      <div className="w-[90%] md:w-[88%] mx-auto">
        <SectionHead
          heading="What Our Customers Say"
          description="Hear from our satisfied customers about their experiences with our services and products."
        />
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={35}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination', // Ensure pagination is targeted correctly
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
