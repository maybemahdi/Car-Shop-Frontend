/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import SectionHead from "../../shared/SectionHead/SectionHead";
import ProductCard from "../../shared/ProductCard/ProductCard";
import { featuredProducts } from "../../../data/carData";
import { Button, GetProps, Input, Select } from "antd";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

const models = ["Corolla", "Civic", "Model 3", "F-150", "X5"];
const brands = ["Toyota", "Honda", "Tesla", "Ford", "BMW"];
const categories = ["Sedan", "Electric", "Pickup Truck", "SUV"];
const availabilities = ["In Stock", "Out of Stock"];

const ShopPage = () => {
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [availability, setAvailability] = useState("");
  const [priceRange, setPriceRange] = useState<any>([0, 2000000]);

  console.log(model, brand, category, availability)

  const handleModelChange = (value: string) => {
    setModel(value);
  };
  const handleBrandChange = (value: string) => {
    setBrand(value);
  };
  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };
  const handleAvailabilityChange = (value: string) => {
    setAvailability(value);
  };
  const handleSliderChange = (value: any) => {
    setPriceRange(value);
  };
  const handleResetFilter = () => {
    setModel("");
    setBrand("");
    setCategory("");
    setAvailability("");
    setPriceRange([0, 2000000]);
    window.location.reload();
  };
  const onSearch: SearchProps["onSearch"] = (value) => {
    console.log(value);
  };

  return (
    <div className="mt-32 md:mt-40 w-[90%] md:w-[88%] mx-auto">
      <SectionHead
        heading="Find your favorite car!"
        description="Get your most favorite car right here!"
      />
      <section className="my-8 md:my-12 bg-gray-100">
        <div className="my-3 flex gap-4 flex-wrap justify-between items-center">
          <Search
            className="lg:basis-2/6 hover:outline-0"
            placeholder="Search by brand, car name or category"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
          <div className="flex flex-wrap items-center gap-4">
            <Select
              placeholder="Filter by model"
              style={{ width: 160, height: 40 }}
              onChange={handleModelChange}
              options={models.map((model) => ({
                label: model,
                value: model,
              }))}
            />
            <Select
              placeholder="Filter by brand"
              style={{ width: 160, height: 40 }}
              onChange={handleBrandChange}
              options={brands.map((brand) => ({
                label: brand,
                value: brand,
              }))}
            />
            <Select
              placeholder="Filter by category"
              style={{ width: 160, height: 40 }}
              onChange={handleCategoryChange}
              options={categories.map((category) => ({
                label: category,
                value: category,
              }))}
            />
            <Select
              placeholder="Filter by availability"
              style={{ width: 160, height: 40 }}
              onChange={handleAvailabilityChange}
              options={availabilities.map((option) => ({
                label: option,
                value: option,
              }))}
            />
            <Button onClick={handleResetFilter} type="primary" className="h-10">
              Clear Filter
            </Button>
          </div>
        </div>

        {/* price range  */}
        <div className="p-6 my-3 bg-white shadow-md rounded-md z-30">
          <Slider
            range
            min={0}
            max={2000000}
            value={priceRange}
            onChange={handleSliderChange}
            trackStyle={[{ backgroundColor: "#E53E29", height: 8 }]}
            handleStyle={[
              {
                borderColor: "#E53E29",
                height: 24,
                width: 24,
                marginTop: -8,
              },
              {
                borderColor: "#E53E29",
                height: 24,
                width: 24,
                marginTop: -8,
              },
            ]}
            railStyle={{ backgroundColor: "#e5e7eb", height: 8 }}
          />

          <p className="mt-3 text-gray-600">
            Price Range: <span className="font-semibold">${priceRange[0]}</span>{" "}
            - <span className="font-semibold">${priceRange[1]}</span>
          </p>
        </div>

        {/* product cards  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ShopPage;
