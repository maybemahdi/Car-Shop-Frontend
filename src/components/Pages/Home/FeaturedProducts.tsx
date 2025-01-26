"use client";

import { Link } from "react-router-dom";
import Button from "../../shared/Button/Button";
import { featuredProducts } from "../../../data/carData";
import SectionHead from "../../shared/SectionHead/SectionHead";
import ProductCard from "../../shared/ProductCard/ProductCard";

export const FeaturedProducts = () => {
  return (
    <section className="my-8 md:my-12 bg-gray-100">
      <div className="w-[90%] md:w-[88%] mx-auto">
        <SectionHead
          heading="Featured Cars"
          description="Check out our latest featured cars"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
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
