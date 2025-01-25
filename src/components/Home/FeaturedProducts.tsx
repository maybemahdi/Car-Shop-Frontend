'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../shared/Button/Button';
import { featuredProducts, ICar } from '../../data/carData';
import SectionHead from '../shared/SectionHead/SectionHead';
import { useInView } from 'react-intersection-observer';

const ProductCard = ({ product }: { product: ICar }) => (
  <motion.div
    className="bg-white rounded-lg shadow-md overflow-hidden"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <div className="relative h-48">
      <img src={product.image || '/placeholder.svg'} alt={product.name} className='w-full h-full object-cover' />
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600">${product.price.toLocaleString()}</p>
    </div>
  </motion.div>
);

export const FeaturedProducts = () => {
  const [, setHoveredIndex] = useState<number | null>(null);

  // Hook to detect if the section is in view
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger animation once when the section is in view
    threshold: 0.5, // Trigger when 50% of the section is visible
  });

  return (
    <section className="my-8 md:my-16 bg-gray-100" ref={ref}>
      <div className="w-[90%] md:w-[88%] mx-auto">
        <SectionHead
          heading="Featured Cars"
          description="Check out our latest featured cars"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: inView ? 1 : 0, // Fade in when in view
                y: inView ? 0 : 20, // Slide up when in view
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-5 flex justify-end">
          <Link to="/shop">
            <Button text="View All Cars" />
          </Link>
        </div>
      </div>
    </section>
  );
};
